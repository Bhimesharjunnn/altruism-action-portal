
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, PlusCircle, Search, ArrowUpDown, Download, Image as ImageIcon } from 'lucide-react';

// Mock causes data
const mockCauses = [
  {
    _id: '1',
    title: 'Clean Water Initiative',
    description: 'Providing clean water to underserved communities.',
    category: 'Environment',
    goal: 5000,
    raised: 4000,
    status: 'open',
    createdAt: new Date('2025-02-15'),
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    adminImageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    _id: '2',
    title: 'Children\'s Education Fund',
    description: 'Supporting education for underprivileged children.',
    category: 'Education',
    goal: 3000,
    raised: 3000,
    status: 'sponsored',
    createdAt: new Date('2025-01-25'),
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    adminImageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    _id: '3',
    title: 'Food Security Project',
    description: 'Addressing food insecurity in urban areas.',
    category: 'Food',
    goal: 4000,
    raised: 1500,
    status: 'open',
    createdAt: new Date('2025-03-05'),
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    adminImageUrl: null
  },
  {
    _id: '4',
    title: 'Wildlife Conservation',
    description: 'Protecting endangered species and their habitats.',
    category: 'Environment',
    goal: 6000,
    raised: 2500,
    status: 'waitlist',
    createdAt: new Date('2025-03-12'),
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    adminImageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    _id: '5',
    title: 'Mental Health Support',
    description: 'Providing resources for mental health services in underserved areas.',
    category: 'Healthcare',
    goal: 4500,
    raised: 0,
    status: 'waitlist',
    createdAt: new Date('2025-03-15'),
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    adminImageUrl: null
  }
];

const CausesManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'status' | 'raised'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [causes, setCauses] = useState(mockCauses);
  
  const handleSort = (field: 'date' | 'title' | 'status' | 'raised') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  const handleToggleStatus = (causeId: string) => {
    setCauses(prev => prev.map(cause => {
      if (cause._id === causeId) {
        return { ...cause, isOnline: !cause.isOnline };
      }
      return cause;
    }));
    
    const cause = causes.find(c => c._id === causeId);
    
    toast({
      title: 'Campaign Status Updated',
      description: `${cause?.title} is now ${cause?.isOnline ? 'offline' : 'online'}.`
    });
  };
  
  const handleForceCloseClaims = (causeId: string) => {
    toast({
      title: 'Claims Closed',
      description: `All claims for this cause have been closed as it reached the tote limit.`
    });
  };

  const handleSetAdminImage = (causeId: string) => {
    const cause = causes.find(c => c._id === causeId);
    
    // Only allow setting admin image for approved/sponsored causes
    if (cause?.status !== 'sponsored') {
      toast({
        title: 'Image Not Allowed',
        description: 'Admin images can only be set for approved causes.',
        variant: 'destructive'
      });
      return;
    }
    
    const imageUrl = prompt('Enter the admin image URL for this cause:');
    if (imageUrl) {
      setCauses(prev => prev.map(cause => {
        if (cause._id === causeId) {
          return { ...cause, adminImageUrl: imageUrl };
        }
        return cause;
      }));
      
      toast({
        title: 'Admin Image Updated',
        description: 'The admin image for this cause has been set successfully.'
      });
    }
  };
  
  const filteredAndSortedCauses = causes
    .filter(cause => 
      cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cause.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cause.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'asc' 
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortBy === 'title') {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      } else if (sortBy === 'raised') {
        return sortDirection === 'asc'
          ? a.raised - b.raised
          : b.raised - a.raised;
      }
      return 0;
    });

  return (
    <AdminLayout title="Causes Management" subtitle="Create, view, and manage all cause campaigns">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search causes..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => handleSort('title')} variant="outline" className="hidden md:flex items-center gap-1">
            <span>Title</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
          <Button onClick={() => handleSort('status')} variant="outline" className="hidden md:flex items-center gap-1">
            <span>Status</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
          <Button onClick={() => handleSort('raised')} variant="outline" className="hidden md:flex items-center gap-1">
            <span>Raised</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center gap-1" onClick={() => navigate('/admin/causes/new')}>
            <PlusCircle className="h-4 w-4" />
            <span>New Cause</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedCauses.map((cause) => (
          <Card key={cause._id} className={!cause.isOnline ? 'opacity-70' : ''}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{cause.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={
                        cause.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : cause.status === 'sponsored'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }
                    >
                      {cause.status.charAt(0).toUpperCase() + cause.status.slice(1)}
                    </Badge>
                    {!cause.isOnline && (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        Offline
                      </Badge>
                    )}
                    {cause.adminImageUrl && (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        Admin Image Set
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{cause.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{cause.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Goal</p>
                      <p className="font-medium">${cause.goal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Raised</p>
                      <p className="font-medium">${cause.raised.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">{cause.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col gap-2">
                  <Button 
                    onClick={() => navigate(`/admin/causes/${cause._id}`)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleSetAdminImage(cause._id)}
                    variant="outline" 
                    className="flex-1 flex items-center gap-1"
                    disabled={cause.status !== 'sponsored'}
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span>Set Image</span>
                  </Button>
                  <Button 
                    onClick={() => handleToggleStatus(cause._id)}
                    variant="outline" 
                    className="flex-1 flex items-center gap-1"
                  >
                    {cause.isOnline ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        <span>Set Offline</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Set Online</span>
                      </>
                    )}
                  </Button>
                  {cause.status === 'open' && (
                    <Button 
                      onClick={() => handleForceCloseClaims(cause._id)}
                      variant="outline" 
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Close Claims
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredAndSortedCauses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No causes found</h3>
            <p className="text-gray-500">Try changing your search criteria</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CausesManagement;
