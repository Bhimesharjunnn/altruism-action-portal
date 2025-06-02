
import React, { useState } from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DistributionInfoStepProps {
  formData: {
    distributionType?: 'online' | 'physical';
    campaignStartDate?: Date;
    campaignEndDate?: Date;
    selectedCities?: string[];
    distributionPoints?: {
      [city: string]: {
        malls: string[];
        parks: string[];
        theatres: string[];
        metroStations: string[];
        schools: string[];
      };
    };
  };
  updateFormData: (data: Partial<any>) => void;
}

// Mock data for Indian cities and distribution points
const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad'
];

const distributionCategories = {
  malls: {
    name: 'Malls',
    defaultTotes: 400,
    options: [
      'Phoenix MarketCity', 'Select CityWalk', 'DLF Mall', 'Inorbit Mall', 'Forum Mall',
      'Express Avenue', 'Palladium Mall', 'Ambience Mall', 'Nexus Mall', 'VR Mall'
    ]
  },
  parks: {
    name: 'Parks',
    defaultTotes: 600,
    options: [
      'Central Park', 'Lodi Gardens', 'Cubbon Park', 'Sanjay Gandhi National Park', 'Hussain Sagar',
      'Marina Beach Park', 'Victoria Memorial Park', 'Law Garden', 'Rock Garden', 'Buddha Jayanti Park'
    ]
  },
  theatres: {
    name: 'Theatres',
    defaultTotes: 400,
    options: [
      'PVR Cinemas', 'INOX', 'Cinepolis', 'Carnival Cinemas', 'Big Cinemas',
      'Fun Republic', 'MovieTime', 'Miraj Cinemas', 'Mukta A2', 'Wave Cinemas'
    ]
  },
  metroStations: {
    name: 'Metro Stations',
    defaultTotes: 800,
    options: [
      'Rajiv Chowk Metro Station', 'Connaught Place Metro', 'MG Road Metro', 'Andheri Metro',
      'Bandra-Kurla Complex Metro', 'Mysore Road Metro', 'High Court Metro', 'Airport Metro',
      'City Centre Metro', 'Electronic City Metro'
    ]
  },
  schools: {
    name: 'Schools',
    defaultTotes: 400,
    options: [
      'Delhi Public School', 'Kendriya Vidyalaya', 'DAV School', 'Ryan International',
      'Bharatiya Vidya Bhavan', 'St. Xavier\'s School', 'Modern School', 'Sardar Patel Vidyalaya',
      'La Martiniere School', 'Bishop Cotton School'
    ]
  }
};

const DistributionInfoStep: React.FC<DistributionInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleDistributionTypeChange = (type: 'online' | 'physical') => {
    updateFormData({
      distributionType: type,
      // Reset other fields when switching types
      campaignStartDate: undefined,
      campaignEndDate: undefined,
      selectedCities: [],
      distributionPoints: {}
    });
  };

  const handleCitySelection = (city: string) => {
    const currentCities = formData.selectedCities || [];
    const updatedCities = currentCities.includes(city)
      ? currentCities.filter(c => c !== city)
      : [...currentCities, city];
    
    updateFormData({ selectedCities: updatedCities });
    
    // If city is deselected, remove its distribution points
    if (!updatedCities.includes(city)) {
      const updatedDistributionPoints = { ...formData.distributionPoints };
      delete updatedDistributionPoints[city];
      updateFormData({ distributionPoints: updatedDistributionPoints });
    }
  };

  const handleDistributionPointSelection = (city: string, category: string, point: string) => {
    const currentPoints = formData.distributionPoints || {};
    const cityPoints = currentPoints[city] || {
      malls: [], parks: [], theatres: [], metroStations: [], schools: []
    };
    
    const categoryPoints = cityPoints[category as keyof typeof cityPoints] || [];
    const updatedCategoryPoints = categoryPoints.includes(point)
      ? categoryPoints.filter(p => p !== point)
      : [...categoryPoints, point];
    
    const updatedCityPoints = {
      ...cityPoints,
      [category]: updatedCategoryPoints
    };
    
    updateFormData({
      distributionPoints: {
        ...currentPoints,
        [city]: updatedCityPoints
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Distribution Information</h2>
      <p className="text-gray-600 mb-6">
        Choose how you want to distribute your totes to reach your target audience
      </p>
      
      <div className="space-y-6">
        {/* Distribution Type Selection */}
        <div className="space-y-3">
          <Label>Distribution Type</Label>
          <RadioGroup
            value={formData.distributionType || ''}
            onValueChange={handleDistributionTypeChange}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="cursor-pointer">Online Campaign</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="physical" id="physical" />
              <Label htmlFor="physical" className="cursor-pointer">Physical Distribution</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Online Distribution Fields */}
        {formData.distributionType === 'online' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campaign Start Date */}
              <div className="space-y-2">
                <Label>Campaign Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left",
                        !formData.campaignStartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.campaignStartDate ? (
                        format(formData.campaignStartDate, "PPP")
                      ) : (
                        <span>Pick start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.campaignStartDate}
                      onSelect={(date) => updateFormData({ campaignStartDate: date })}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Campaign End Date */}
              <div className="space-y-2">
                <Label>Campaign End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left",
                        !formData.campaignEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.campaignEndDate ? (
                        format(formData.campaignEndDate, "PPP")
                      ) : (
                        <span>Pick end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.campaignEndDate}
                      onSelect={(date) => updateFormData({ campaignEndDate: date })}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* Physical Distribution Fields */}
        {formData.distributionType === 'physical' && (
          <div className="space-y-6">
            {/* City Selection */}
            <div className="space-y-3">
              <Label>Select Cities</Label>
              <p className="text-sm text-muted-foreground">
                Choose the cities where you want to distribute totes
              </p>
              <div className="max-h-48 overflow-y-auto border rounded-md p-4 space-y-2">
                {indianCities.map((city) => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`city-${city}`}
                      checked={(formData.selectedCities || []).includes(city)}
                      onCheckedChange={() => handleCitySelection(city)}
                    />
                    <Label
                      htmlFor={`city-${city}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {city}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Points for Selected Cities */}
            {formData.selectedCities && formData.selectedCities.length > 0 && (
              <div className="space-y-4">
                <Label>Distribution Points</Label>
                <p className="text-sm text-muted-foreground">
                  Select specific locations in each city where totes will be distributed
                </p>
                
                {formData.selectedCities.map((city) => (
                  <Card key={city}>
                    <CardHeader>
                      <CardTitle className="text-lg">{city}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(distributionCategories).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="font-medium">{category.name}</Label>
                            <span className="text-xs text-muted-foreground">
                              Default: {category.defaultTotes} totes each
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {category.options.map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`${city}-${categoryKey}-${option}`}
                                  checked={
                                    formData.distributionPoints?.[city]?.[categoryKey as keyof typeof distributionCategories]?.includes(option) || false
                                  }
                                  onCheckedChange={() => handleDistributionPointSelection(city, categoryKey, option)}
                                />
                                <Label
                                  htmlFor={`${city}-${categoryKey}-${option}`}
                                  className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionInfoStep;
