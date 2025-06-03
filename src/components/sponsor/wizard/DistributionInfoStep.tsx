
import React, { useState } from 'react';
import { format } from "date-fns";
import { CalendarIcon, Plus, Minus, MapPin, Building, Trees, Train, GraduationCap } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DistributionInfoStepProps {
  formData: {
    distributionType?: 'online' | 'physical';
    campaignStartDate?: Date;
    campaignEndDate?: Date;
    selectedCities?: string[];
    distributionPoints?: {
      [city: string]: {
        malls: { name: string; totes: number; selected: boolean }[];
        parks: { name: string; totes: number; selected: boolean }[];
        theatres: { name: string; totes: number; selected: boolean }[];
        metroStations: { name: string; totes: number; selected: boolean }[];
        schools: { name: string; totes: number; selected: boolean }[];
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
    icon: Building,
    color: 'text-blue-600',
    options: [
      'Phoenix MarketCity', 'Select CityWalk', 'DLF Mall', 'Inorbit Mall', 'Forum Mall',
      'Express Avenue', 'Palladium Mall', 'Ambience Mall', 'Nexus Mall', 'VR Mall'
    ]
  },
  parks: {
    name: 'Parks',
    defaultTotes: 600,
    icon: Trees,
    color: 'text-green-600',
    options: [
      'Central Park', 'Lodi Gardens', 'Cubbon Park', 'Sanjay Gandhi National Park', 'Hussain Sagar',
      'Marina Beach Park', 'Victoria Memorial Park', 'Law Garden', 'Rock Garden', 'Buddha Jayanti Park'
    ]
  },
  theatres: {
    name: 'Theatres',
    defaultTotes: 400,
    icon: MapPin,
    color: 'text-purple-600',
    options: [
      'PVR Cinemas', 'INOX', 'Cinepolis', 'Carnival Cinemas', 'Big Cinemas',
      'Fun Republic', 'MovieTime', 'Miraj Cinemas', 'Mukta A2', 'Wave Cinemas'
    ]
  },
  metroStations: {
    name: 'Metro Stations',
    defaultTotes: 800,
    icon: Train,
    color: 'text-orange-600',
    options: [
      'Rajiv Chowk Metro Station', 'Connaught Place Metro', 'MG Road Metro', 'Andheri Metro',
      'Bandra-Kurla Complex Metro', 'Mysore Road Metro', 'High Court Metro', 'Airport Metro',
      'City Centre Metro', 'Electronic City Metro'
    ]
  },
  schools: {
    name: 'Schools',
    defaultTotes: 400,
    icon: GraduationCap,
    color: 'text-red-600',
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
  const handleDistributionTypeChange = (type: 'online' | 'physical') => {
    updateFormData({
      distributionType: type,
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
    } else {
      // Initialize distribution points for new city
      const updatedDistributionPoints = {
        ...formData.distributionPoints,
        [city]: {
          malls: distributionCategories.malls.options.map(name => ({ name, totes: distributionCategories.malls.defaultTotes, selected: false })),
          parks: distributionCategories.parks.options.map(name => ({ name, totes: distributionCategories.parks.defaultTotes, selected: false })),
          theatres: distributionCategories.theatres.options.map(name => ({ name, totes: distributionCategories.theatres.defaultTotes, selected: false })),
          metroStations: distributionCategories.metroStations.options.map(name => ({ name, totes: distributionCategories.metroStations.defaultTotes, selected: false })),
          schools: distributionCategories.schools.options.map(name => ({ name, totes: distributionCategories.schools.defaultTotes, selected: false }))
        }
      };
      updateFormData({ distributionPoints: updatedDistributionPoints });
    }
  };

  const handleLocationToggle = (city: string, category: string, locationIndex: number) => {
    const currentPoints = formData.distributionPoints || {};
    const cityPoints = currentPoints[city];
    if (!cityPoints) return;

    const updatedCategoryPoints = [...cityPoints[category as keyof typeof cityPoints]];
    updatedCategoryPoints[locationIndex] = {
      ...updatedCategoryPoints[locationIndex],
      selected: !updatedCategoryPoints[locationIndex].selected
    };

    updateFormData({
      distributionPoints: {
        ...currentPoints,
        [city]: {
          ...cityPoints,
          [category]: updatedCategoryPoints
        }
      }
    });
  };

  const handleToteChange = (city: string, category: string, locationIndex: number, newTotes: number) => {
    const currentPoints = formData.distributionPoints || {};
    const cityPoints = currentPoints[city];
    if (!cityPoints) return;

    const minTotes = distributionCategories[category as keyof typeof distributionCategories].defaultTotes;
    const finalTotes = Math.max(newTotes, minTotes);

    const updatedCategoryPoints = [...cityPoints[category as keyof typeof cityPoints]];
    updatedCategoryPoints[locationIndex] = {
      ...updatedCategoryPoints[locationIndex],
      totes: finalTotes
    };

    updateFormData({
      distributionPoints: {
        ...currentPoints,
        [city]: {
          ...cityPoints,
          [category]: updatedCategoryPoints
        }
      }
    });
  };

  const getTotalSelectedLocations = (city: string) => {
    const cityPoints = formData.distributionPoints?.[city];
    if (!cityPoints) return 0;
    
    return Object.values(cityPoints).reduce((total, locations) => {
      return total + locations.filter(loc => loc.selected).length;
    }, 0);
  };

  const getTotalTotes = (city: string) => {
    const cityPoints = formData.distributionPoints?.[city];
    if (!cityPoints) return 0;
    
    return Object.values(cityPoints).reduce((total, locations) => {
      return total + locations.filter(loc => loc.selected).reduce((sum, loc) => sum + loc.totes, 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Distribution Information</h2>
        <p className="text-gray-600 mb-6">
          Choose how you want to distribute your totes to reach your target audience
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Distribution Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.distributionType || ''}
              onValueChange={handleDistributionTypeChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="cursor-pointer font-medium">
                  Online Campaign
                  <p className="text-sm text-gray-500 font-normal">Digital distribution with date range</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="physical" id="physical" />
                <Label htmlFor="physical" className="cursor-pointer font-medium">
                  Physical Distribution
                  <p className="text-sm text-gray-500 font-normal">Real-world locations in Indian cities</p>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Online Distribution Fields */}
        {formData.distributionType === 'online' && (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>
        )}

        {/* Physical Distribution Fields */}
        {formData.distributionType === 'physical' && (
          <div className="space-y-6">
            {/* City Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Cities</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose the cities where you want to distribute totes
                </p>
              </CardHeader>
              <CardContent>
                <div className="max-h-48 overflow-y-auto border rounded-md p-4 space-y-2">
                  {indianCities.map((city) => (
                    <div key={city} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`city-${city}`}
                          checked={(formData.selectedCities || []).includes(city)}
                          onCheckedChange={() => handleCitySelection(city)}
                        />
                        <Label
                          htmlFor={`city-${city}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {city}
                        </Label>
                      </div>
                      {(formData.selectedCities || []).includes(city) && (
                        <div className="text-xs text-gray-500">
                          {getTotalSelectedLocations(city)} locations • {getTotalTotes(city)} totes
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distribution Points for Selected Cities */}
            {formData.selectedCities && formData.selectedCities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Distribution Points & Tote Allocation</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select specific locations and customize tote quantities for each city
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {formData.selectedCities.map((city) => (
                      <AccordionItem key={city} value={city}>
                        <AccordionTrigger className="text-lg font-semibold">
                          <div className="flex items-center justify-between w-full mr-4">
                            <span>{city}</span>
                            <div className="text-sm text-gray-500">
                              {getTotalSelectedLocations(city)} locations • {getTotalTotes(city)} totes
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          {Object.entries(distributionCategories).map(([categoryKey, category]) => {
                            const Icon = category.icon;
                            const cityPoints = formData.distributionPoints?.[city];
                            const categoryPoints = cityPoints?.[categoryKey as keyof typeof cityPoints] || [];
                            const selectedCount = categoryPoints.filter(point => point.selected).length;
                            
                            return (
                              <div key={categoryKey} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <Icon className={`h-5 w-5 ${category.color}`} />
                                    <Label className="font-medium text-base">{category.name}</Label>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {selectedCount} selected • Min: {category.defaultTotes} totes each
                                  </div>
                                </div>
                                <div className="grid gap-3">
                                  {categoryPoints.map((point, index) => (
                                    <div key={index} className={`flex items-center justify-between p-3 border rounded ${point.selected ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                                      <div className="flex items-center space-x-3">
                                        <Checkbox 
                                          id={`${city}-${categoryKey}-${index}`}
                                          checked={point.selected}
                                          onCheckedChange={() => handleLocationToggle(city, categoryKey, index)}
                                        />
                                        <Label
                                          htmlFor={`${city}-${categoryKey}-${index}`}
                                          className="text-sm font-medium cursor-pointer"
                                        >
                                          {point.name}
                                        </Label>
                                      </div>
                                      {point.selected && (
                                        <div className="flex items-center space-x-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToteChange(city, categoryKey, index, point.totes - 50)}
                                            disabled={point.totes <= category.defaultTotes}
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Input
                                            type="number"
                                            value={point.totes}
                                            onChange={(e) => handleToteChange(city, categoryKey, index, parseInt(e.target.value) || category.defaultTotes)}
                                            className="w-20 text-center"
                                            min={category.defaultTotes}
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToteChange(city, categoryKey, index, point.totes + 50)}
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                          <span className="text-sm text-gray-600 ml-2">totes</span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionInfoStep;
