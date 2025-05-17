
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

const CausesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock causes data (would come from API)
  const causes = [
    {
      id: '1',
      title: 'Clean Water Initiative',
      description: 'Providing clean drinking water to communities in need.',
      imageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2d5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      raised: 12500,
      goal: 25000,
      category: 'Environment',
      status: 'open'
    },
    {
      id: '2',
      title: "Children's Education Fund",
      description: 'Supporting education for underprivileged children worldwide.',
      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      raised: 8700,
      goal: 15000,
      category: 'Education',
      status: 'sponsored'
    },
    {
      id: '3',
      title: 'Women Entrepreneurs',
      description: 'Empowering women with resources to start their own businesses.',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      raised: 6300,
      goal: 10000,
      category: 'Economic Development',
      status: 'waitlist'
    },
    {
      id: '4',
      title: 'Wildlife Conservation',
      description: 'Protecting endangered species and their habitats.',
      imageUrl: 'https://images.unsplash.com/photo-1535338454770-8be5700b8b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      raised: 18000,
      goal: 30000,
      category: 'Environment',
      status: 'open'
    },
    {
      id: '5',
      title: 'Mental Health Support',
      description: 'Providing resources for mental health services in underserved areas.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      raised: 5000,
      goal: 12000,
      category: 'Healthcare',
      status: 'waitlist'
    },
    {
      id: '6',
      title: 'Disaster Relief Fund',
      description: 'Supporting communities recovering from natural disasters.',
      imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      raised: 22000,
      goal: 25000,
      category: 'Humanitarian',
      status: 'sponsored'
    }
  ];

  // Available categories and statuses
  const categories = ['Environment', 'Education', 'Economic Development', 'Healthcare', 'Humanitarian'];
  const statuses = [
    { value: 'open', label: 'Open for Sponsorship' },
    { value: 'sponsored', label: 'Fully Sponsored' },
    { value: 'waitlist', label: 'Waitlist Available' }
  ];

  // Filter causes based on search and filters
  const filteredCauses = causes.filter(cause => {
    const matchesSearch = cause.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cause.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || cause.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || cause.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAction = (causeId: string, status: string) => {
    // This would connect to real API in production
    if (status === 'sponsored') {
      toast({
        title: "Tote Claimed",
        description: "You've successfully claimed a tote for this cause!",
      });
    } else if (status === 'waitlist') {
      toast({
        title: "Added to Waitlist",
        description: "You've been added to the waitlist for this cause!",
      });
    } else {
      navigate(`/sponsor/new?causeId=${causeId}`);
    }
  };

  const getActionButton = (status: string, causeId: string) => {
    switch(status) {
      case 'open':
        return (
          <Button onClick={() => handleAction(causeId, status)} className="w-full">
            Sponsor This Cause
          </Button>
        );
      case 'sponsored':
        return (
          <Button onClick={() => handleAction(causeId, status)} variant="secondary" className="w-full">
            Claim Tote
          </Button>
        );
      case 'waitlist':
        return (
          <Button onClick={() => handleAction(causeId, status)} variant="outline" className="w-full">
            Join Waitlist
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-primary-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Browse Causes</h1>
          <p className="text-lg text-gray-700 mb-6">
            Find and support causes aligned with your organization's values
          </p>
          
          {/* Filters section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <Input
                  id="search"
                  placeholder="Search causes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {filteredCauses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCauses.map((cause) => (
              <Card key={cause.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={cause.imageUrl} 
                  alt={cause.title} 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{cause.title}</h3>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {cause.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{cause.description}</p>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        ${cause.raised.toLocaleString()} raised
                      </span>
                      <span className="text-sm text-gray-500">
                        ${cause.goal.toLocaleString()} goal
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => navigate(`/cause/${cause.id}`)} 
                      variant="outline" 
                      className="w-full"
                    >
                      See Details
                    </Button>
                    {getActionButton(cause.status, cause.id)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matching causes found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
            <Button onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CausesPage;
