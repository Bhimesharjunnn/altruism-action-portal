
import React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DistributionInfoStepProps {
  formData: {
    distributionType?: 'online' | 'physical';
    campaignStartDate?: Date;
    campaignEndDate?: Date;
    selectedCities?: string[];
    distributionPoints?: string[];
  };
  updateFormData: (data: Partial<any>) => void;
}

const DistributionInfoStep: React.FC<DistributionInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Distribution Information</h2>
        <p className="text-gray-600">Tell us when and where you want to distribute your totes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Campaign Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.campaignStartDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.campaignStartDate ? (
                  format(formData.campaignStartDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.campaignStartDate}
                onSelect={(date) => updateFormData({ campaignStartDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Campaign End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.campaignEndDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.campaignEndDate ? (
                  format(formData.campaignEndDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.campaignEndDate}
                onSelect={(date) => updateFormData({ campaignEndDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="distributionPoints">Distribution Points (comma-separated)</Label>
        <Input
          id="distributionPoints"
          placeholder="e.g., Mall entrance, Park pavilion, School cafeteria"
          value={formData.distributionPoints?.join(', ') || ''}
          onChange={(e) => updateFormData({ 
            distributionPoints: e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0)
          })}
        />
        <p className="text-sm text-gray-500">
          Enter the specific locations where you want to distribute your totes
        </p>
      </div>
    </div>
  );
};

export default DistributionInfoStep;
