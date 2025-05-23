
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, Download } from 'lucide-react';

// Mock pending logos data
const mockPendingLogos = [
  {
    _id: '1',
    campaignTitle: 'Clean Water Initiative',
    submittedBy: 'Water Foundation',
    logoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    submittedAt: new Date('2025-03-22'),
    status: 'pending',
    format: 'PNG',
    resolution: '1024x1024'
  },
  {
    _id: '2',
    campaignTitle: 'Education for All',
    submittedBy: 'EduCorp',
    logoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    submittedAt: new Date('2025-03-21'),
    status: 'under_review',
    format: 'SVG',
    resolution: 'Vector'
  }
];

const LogoReview = () => {
  const { toast } = useToast();
  const [logos, setLogos] = useState(mockPendingLogos);

  const handleApprove = (logoId: string) => {
    setLogos(prev => prev.filter(l => l._id !== logoId));
    toast({
      title: 'Logo Approved',
      description: 'The logo has been approved and is now live on the campaign.'
    });
  };

  const handleReject = (logoId: string) => {
    setLogos(prev => prev.filter(l => l._id !== logoId));
    toast({
      title: 'Logo Rejected',
      description: 'The logo has been rejected. The submitter will be notified to provide a new one.',
      variant: 'destructive'
    });
  };

  return (
    <AdminLayout title="Logo Review" subtitle="Review and approve submitted campaign logos">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos.map((logo) => (
          <Card key={logo._id}>
            <CardHeader>
              <CardTitle className="text-lg">{logo.campaignTitle}</CardTitle>
              <p className="text-sm text-gray-600">by {logo.submittedBy}</p>
              <Badge 
                variant="outline" 
                className={
                  logo.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 w-fit'
                    : 'bg-blue-100 text-blue-800 w-fit'
                }
              >
                {logo.status === 'pending' ? 'Pending Review' : 'Under Review'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <img 
                  src={logo.logoUrl} 
                  alt="Campaign Logo" 
                  className="w-full h-32 object-contain bg-gray-50 rounded border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Format</p>
                  <p className="font-medium">{logo.format}</p>
                </div>
                <div>
                  <p className="text-gray-500">Resolution</p>
                  <p className="font-medium">{logo.resolution}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Submitted</p>
                  <p className="font-medium">{logo.submittedAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleApprove(logo._id)}
                    className="flex-1 flex items-center justify-center gap-1"
                    size="sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleReject(logo._id)}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                    size="sm"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <Download className="w-4 h-4" />
                  Download Original
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {logos.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No pending logos</h3>
            <p className="text-gray-500">All logos have been reviewed</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default LogoReview;
