
import React, { useState, useMemo } from 'react';
import { format } from "date-fns";
import { CalendarIcon, Plus, Minus, MapPin, Building, Trees, Train, GraduationCap, Search, Info, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Toggle } from "@/components/ui/toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface EnhancedDistributionInfoStepProps {
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
    name: 'Shopping Malls',
    defaultTotes: 400,
    icon: Building,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    options: [
      'Phoenix MarketCity', 'Select CityWalk', 'DLF Mall', 'Inorbit Mall', 'Forum Mall',
      'Express Avenue', 'Palladium Mall', 'Ambience Mall', 'Nexus Mall', 'VR Mall'
    ]
  },
  parks: {
    name: 'Public Parks',
    defaultTotes: 600,
    icon: Trees,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    options: [
      'Central Park', 'Lodi Gardens', 'Cubbon Park', 'Sanjay Gandhi National Park', 'Hussain Sagar',
      'Marina Beach Park', 'Victoria Memorial Park', 'Law Garden', 'Rock Garden', 'Buddha Jayanti Park'
    ]
  },
  theatres: {
    name: 'Cinema Theatres',
    defaultTotes: 400,
    icon: MapPin,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
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
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    options: [
      'Rajiv Chowk Metro Station', 'Connaught Place Metro', 'MG Road Metro', 'Andheri Metro',
      'Bandra-Kurla Complex Metro', 'Mysore Road Metro', 'High Court Metro', 'Airport Metro',
      'City Centre Metro', 'Electronic City Metro'
    ]
  },
  schools: {
    name: 'Educational Institutions',
    defaultTotes: 400,
    icon: GraduationCap,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    options: [
      'Delhi Public School', 'Kendriya Vidyalaya', 'DAV School', 'Ryan International',
      'Bharatiya Vidya Bhavan', 'St. Xavier\'s School', 'Modern School', 'Sardar Patel Vidyalaya',
      'La Martiniere School', 'Bishop Cotton School'
    ]
  }
};

const EnhancedDistributionInfoStep: React.FC<EnhancedDistributionInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [expandedCities, setExpandedCities] = useState<string[]>([]);

  const filteredCities = useMemo(() => {
    return indianCities.filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalStats = useMemo(() => {
    const stats = {
      totalTotes: 0,
      totalLocations: 0,
      citiesCount: formData.selectedCities?.length || 0,
      byCategory: {} as Record<string, number>
    };

    if (formData.distributionPoints) {
      Object.entries(formData.distributionPoints).forEach(([city, cityPoints]) => {
        Object.entries(cityPoints).forEach(([category, points]) => {
          const selectedPointsInCategory = points.filter(p => p.selected);
          stats.totalLocations += selectedPointsInCategory.length;
          stats.totalTotes += selectedPointsInCategory.reduce((sum, p) => sum + p.totes, 0);
          stats.byCategory[category] = (stats.byCategory[category] || 0) + selectedPointsInCategory.length;
        });
      });
    }

    return stats;
  }, [formData.distributionPoints]);

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
    
    if (!updatedCities.includes(city)) {
      const updatedDistributionPoints = { ...formData.distributionPoints };
      delete updatedDistributionPoints[city];
      updateFormData({ distributionPoints: updatedDistributionPoints });
      setExpandedCities(prev => prev.filter(c => c !== city));
    } else {
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

  const toggleCityExpansion = (city: string) => {
    setExpandedCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Distribution Information</h2>
              <p className="text-gray-600">Step 4 of 5 — Choose how to distribute your totes</p>
            </div>
            {formData.distributionType === 'physical' && (
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{totalStats.totalTotes.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Totes</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Distribution Mode Selector */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Distribution Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Toggle
                          pressed={formData.distributionType === 'online'}
                          onPressedChange={() => handleDistributionTypeChange('online')}
                          className="flex-1 h-16 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
                        >
                          <div className="text-center">
                            <div className="font-medium">Online Campaign</div>
                            <div className="text-xs opacity-80">Digital distribution</div>
                          </div>
                        </Toggle>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Run your campaign online with scheduled dates</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Toggle
                          pressed={formData.distributionType === 'physical'}
                          onPressedChange={() => handleDistributionTypeChange('physical')}
                          className="flex-1 h-16 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
                        >
                          <div className="text-center">
                            <div className="font-medium">Physical Distribution</div>
                            <div className="text-xs opacity-80">Real-world locations</div>
                          </div>
                        </Toggle>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Distribute totes at physical locations across India</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {/* Online Distribution */}
            {formData.distributionType === 'online' && (
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader>
                  <CardTitle>Campaign Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left h-12",
                              !formData.campaignStartDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.campaignStartDate ? (
                              format(formData.campaignStartDate, "PPP")
                            ) : (
                              <span>Select start date</span>
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
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left h-12",
                              !formData.campaignEndDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.campaignEndDate ? (
                              format(formData.campaignEndDate, "PPP")
                            ) : (
                              <span>Select end date</span>
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
                </CardContent>
              </Card>
            )}

            {/* Physical Distribution */}
            {formData.distributionType === 'physical' && (
              <div className="space-y-6">
                {/* City Selection */}
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Select Cities
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Choose cities where you want to distribute totes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search cities..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>

                      {/* Selected Cities Tags */}
                      {formData.selectedCities && formData.selectedCities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.selectedCities.map((city) => (
                            <Badge
                              key={city}
                              variant="secondary"
                              className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                            >
                              {city}
                              <button
                                onClick={() => handleCitySelection(city)}
                                className="ml-2 hover:bg-blue-300 rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* City List */}
                      <div className="max-h-48 overflow-y-auto border rounded-lg">
                        {filteredCities.map((city) => (
                          <div
                            key={city}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={`city-${city}`}
                                checked={(formData.selectedCities || []).includes(city)}
                                onCheckedChange={() => handleCitySelection(city)}
                              />
                              <Label
                                htmlFor={`city-${city}`}
                                className="font-medium cursor-pointer"
                              >
                                {city}
                              </Label>
                            </div>
                            {(formData.selectedCities || []).includes(city) && (
                              <Check className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Distribution Points */}
                {formData.selectedCities && formData.selectedCities.length > 0 && (
                  <Card className="shadow-sm border-0 bg-white">
                    <CardHeader>
                      <CardTitle>Distribution Points</CardTitle>
                      <p className="text-sm text-gray-600">
                        Select specific locations and customize tote quantities
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {formData.selectedCities.map((city) => (
                          <div key={city} className="border rounded-lg overflow-hidden">
                            <Collapsible
                              open={expandedCities.includes(city)}
                              onOpenChange={() => toggleCityExpansion(city)}
                            >
                              <CollapsibleTrigger className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-medium text-left">
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-5 w-5 text-gray-600" />
                                  <span className="text-lg">{city}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {Object.entries(formData.distributionPoints?.[city] || {}).reduce((total, [, points]) => 
                                    total + points.filter(p => p.selected).length, 0)} locations selected
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-4 space-y-4">
                                {Object.entries(distributionCategories).map(([categoryKey, category]) => {
                                  const Icon = category.icon;
                                  const cityPoints = formData.distributionPoints?.[city];
                                  const categoryPoints = cityPoints?.[categoryKey as keyof typeof cityPoints] || [];
                                  
                                  return (
                                    <div key={categoryKey} className={cn("border rounded-lg p-4", category.borderColor, category.bgColor)}>
                                      <div className="flex items-center gap-3 mb-3">
                                        <Icon className={cn("h-5 w-5", category.color)} />
                                        <Label className="font-semibold text-lg">{category.name}</Label>
                                        <Badge variant="outline" className="ml-auto">
                                          Min: {category.defaultTotes} totes
                                        </Badge>
                                      </div>
                                      <div className="grid gap-3">
                                        {categoryPoints.map((point, index) => (
                                          <div
                                            key={index}
                                            className={cn(
                                              "flex items-center justify-between p-3 rounded-lg border transition-all",
                                              point.selected 
                                                ? "bg-white border-blue-300 shadow-sm" 
                                                : "bg-white/50 border-gray-200"
                                            )}
                                          >
                                            <div className="flex items-center space-x-3">
                                              <Checkbox
                                                id={`${city}-${categoryKey}-${index}`}
                                                checked={point.selected}
                                                onCheckedChange={() => handleLocationToggle(city, categoryKey, index)}
                                              />
                                              <Label
                                                htmlFor={`${city}-${categoryKey}-${index}`}
                                                className="font-medium cursor-pointer"
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
                                                  className="h-8 w-8 p-0"
                                                >
                                                  <Minus className="h-3 w-3" />
                                                </Button>
                                                <Input
                                                  type="number"
                                                  value={point.totes}
                                                  onChange={(e) => handleToteChange(city, categoryKey, index, parseInt(e.target.value) || category.defaultTotes)}
                                                  className="w-20 text-center h-8"
                                                  min={category.defaultTotes}
                                                />
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => handleToteChange(city, categoryKey, index, point.totes + 50)}
                                                  className="h-8 w-8 p-0"
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
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Live Totals Sidebar */}
          {formData.distributionType === 'physical' && (
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-gray-900">Campaign Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Total Totes */}
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-blue-600">{totalStats.totalTotes.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Totes</div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <div className="text-xl font-semibold text-gray-900">{totalStats.citiesCount}</div>
                        <div className="text-xs text-gray-600">Cities</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <div className="text-xl font-semibold text-gray-900">{totalStats.totalLocations}</div>
                        <div className="text-xs text-gray-600">Locations</div>
                      </div>
                    </div>

                    {/* Category Breakdown */}
                    {Object.keys(totalStats.byCategory).length > 0 && (
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-700">Breakdown by Category</div>
                        {Object.entries(totalStats.byCategory).map(([category, count]) => {
                          const categoryInfo = distributionCategories[category as keyof typeof distributionCategories];
                          const Icon = categoryInfo?.icon;
                          return (
                            <div key={category} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                              <div className="flex items-center gap-2">
                                {Icon && <Icon className={cn("h-4 w-4", categoryInfo.color)} />}
                                <span className="text-sm text-gray-700 capitalize">{category}</span>
                              </div>
                              <Badge variant="outline">{count}</Badge>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Validation Messages */}
                    {totalStats.totalTotes > 0 && totalStats.totalTotes < 200 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <Info className="h-4 w-4" />
                          <span className="text-sm font-medium">Minimum 200 totes recommended</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedDistributionInfoStep;
