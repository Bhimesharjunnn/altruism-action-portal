
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Search, CheckCircle, XCircle, Eye, ArrowUpDown } from 'lucide-react';

// Mock claims data
const mockClaims = [
  {
    _id: '1',
    claimerName: 'Sarah Johnson',
    claimerEmail: 'sarah@email.com',
    campaignTitle: 'Clean Water Initiative',
    claimDate: new Date('2025-03-20'),
    status: 'pending',
    address: '123 Main St, Anytown, USA',
    verificationCode: 'CW001',
    phone: '+1234567890'
  },
  {
    _id: '2',
    claimerName: 'Michael Chen',
    claimerEmail: 'michael@email.com',
    campaignTitle: 'Education for All',
    claimDate: new Date('2025-03-19'),
    status: 'verified',
    address: '456 Oak Ave, Another City, USA',
    verificationCode: 'ED002',
    phone: '+1987654321'
  },
  {
    _id: '3',
    claimerName: 'Emily Rodriguez',
    claimerEmail: 'emily@email.com',
    campaignTitle: 'Food Security Project',
    claimDate: new Date('2025-03-18'),
    status: 'shipped',
    address: '789 Pine Rd, Different Town, USA',
    verificationCode: 'FS003',
    phone: '+1122334455'
  }
];

const ClaimsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name'>('date');
  const [claims, setClaims] = useState(mockClaims);

  const handleApprove = (claimId: string) => {
    setClaims(prev => prev.map(claim => 
      claim._id === claimId ? { ...claim, status: 'verified' } : claim
    ));
    toast({
      title: 'Claim Approved',
      description: 'The claim has been verified and approved for shipping.'
    });
  };

  const handleReject = (claimId: string) => {
    setClaims(prev => prev.map(claim => 
      claim._id === claimId ? { ...claim, status: 'rejected' } : claim
    ));
    toast({
      title: 'Claim Rejected',
      description: 'The claim has been rejected.',
      variant: 'destructive'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const filteredClaims = claims.filter(claim =>
    claim.claimerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.claimerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Claims Management" subtitle="Review and manage all tote bag claims">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search claims..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowUpDown className="h-4 w-4" />
            Sort by {sortBy}
          </Button>
          <Button variant="outline">Export Claims</Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClaims.map((claim) => (
          <Card key={claim._id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{claim.claimerName}</h3>
                    <Badge 
                      variant="outline" 
                      className={getStatusBadge(claim.status)}
                    >
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">Campaign: {claim.campaignTitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{claim.claimerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{claim.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Verification Code</p>
                      <p className="font-medium">{claim.verificationCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Claim Date</p>
                      <p className="font-medium">{claim.claimDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="font-medium">{claim.address}</p>
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  {claim.status === 'pending' && (
                    <>
                      <Button 
                        onClick={() => handleApprove(claim._id)}
                        className="flex-1 flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(claim._id)}
                        variant="outline"
                        className="flex-1 flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No claims found</h3>
            <p className="text-gray-500">Try changing your search criteria</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClaimsManagement;
