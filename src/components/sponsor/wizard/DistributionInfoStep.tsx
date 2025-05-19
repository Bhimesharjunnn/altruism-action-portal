
import React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface DistributionInfoStepProps {
  formData: {
    distributionPoints: string[];
    distributionDate: Date | undefined;
    demographics: {
      ageGroups: string[];
      income: string;
      education: string;
      other: string;
    };
  };
  updateFormData: (data: Partial<any>) => void;
}

const DistributionInfoStep: React.FC<DistributionInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [newPoint, setNewPoint] = React.useState("");
  
  const handleAddDistributionPoint = () => {
    if (newPoint.trim()) {
      updateFormData({
        distributionPoints: [...(formData.distributionPoints || []), newPoint.trim()]
      });
      setNewPoint("");
    }
  };

  const handleRemovePoint = (index: number) => {
    const updatedPoints = [...formData.distributionPoints];
    updatedPoints.splice(index, 1);
    updateFormData({ distributionPoints: updatedPoints });
  };

  const handleAgeGroupChange = (ageGroup: string) => {
    const currentAgeGroups = formData.demographics?.ageGroups || [];
    const updatedAgeGroups = currentAgeGroups.includes(ageGroup)
      ? currentAgeGroups.filter(group => group !== ageGroup)
      : [...currentAgeGroups, ageGroup];
    
    updateFormData({
      demographics: {
        ...formData.demographics,
        ageGroups: updatedAgeGroups
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Distribution Information</h2>
      <p className="text-gray-600 mb-6">
        Help us understand how and when you plan to distribute the totes
      </p>
      
      <div className="space-y-6">
        {/* Distribution Points */}
        <div className="space-y-3">
          <Label>Distribution Points</Label>
          <p className="text-sm text-muted-foreground">
            Add locations where you plan to distribute the totes
          </p>
          
          <div className="flex gap-2">
            <Input 
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              placeholder="Add a distribution location"
              className="flex-1"
            />
            <Button 
              type="button"
              onClick={handleAddDistributionPoint}
              variant="outline"
            >
              Add
            </Button>
          </div>
          
          {formData.distributionPoints && formData.distributionPoints.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label>Added Locations:</Label>
              <ul className="space-y-2">
                {formData.distributionPoints.map((point, index) => (
                  <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <span>{point}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemovePoint(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Distribution Date */}
        <div className="space-y-3">
          <Label>Distribution Date</Label>
          <p className="text-sm text-muted-foreground">
            When do you plan to start distributing the totes?
          </p>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left",
                  !formData.distributionDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.distributionDate ? (
                  format(formData.distributionDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.distributionDate}
                onSelect={(date) => updateFormData({ distributionDate: date })}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Demographics */}
        <div className="space-y-3">
          <Label>Target Demographics</Label>
          <p className="text-sm text-muted-foreground">
            Who will be receiving these totes?
          </p>
          
          <div className="space-y-4">
            {/* Age Groups */}
            <div className="space-y-3">
              <Label className="text-sm">Age Groups (select all that apply):</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Children (0-12)", "Teens (13-19)", "Young Adults (20-35)", "Adults (36-64)", "Seniors (65+)"].map((ageGroup) => (
                  <div key={ageGroup} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`age-${ageGroup}`} 
                      checked={(formData.demographics?.ageGroups || []).includes(ageGroup)}
                      onCheckedChange={() => handleAgeGroupChange(ageGroup)}
                    />
                    <label
                      htmlFor={`age-${ageGroup}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {ageGroup}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Income Level */}
            <div className="space-y-2">
              <Label className="text-sm">Income Level:</Label>
              <Select
                value={formData.demographics?.income || ""}
                onValueChange={(value) => 
                  updateFormData({
                    demographics: { ...formData.demographics, income: value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select income level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-income">Low Income</SelectItem>
                  <SelectItem value="middle-income">Middle Income</SelectItem>
                  <SelectItem value="high-income">High Income</SelectItem>
                  <SelectItem value="mixed">Mixed Incomes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Education Level */}
            <div className="space-y-2">
              <Label className="text-sm">Education Level:</Label>
              <Select
                value={formData.demographics?.education || ""}
                onValueChange={(value) => 
                  updateFormData({
                    demographics: { ...formData.demographics, education: value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="mixed">Mixed Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Additional Information */}
            <div className="space-y-2">
              <Label className="text-sm">Additional Demographic Information (Optional):</Label>
              <Textarea 
                placeholder="Any other relevant information about the recipients"
                value={formData.demographics?.other || ""}
                onChange={(e) => 
                  updateFormData({
                    demographics: { ...formData.demographics, other: e.target.value }
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionInfoStep;
