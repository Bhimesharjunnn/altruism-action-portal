
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Eye, XCircle } from 'lucide-react';

interface PendingCause {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  date: string;
  category: string;
}

interface PendingCausesProps {
  pendingCauses: PendingCause[];
}

const PendingCauses: React.FC<PendingCausesProps> = ({ pendingCauses }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApprove = (causeId: string) => {
    toast({
      title: "Cause Approved",
      description: "The cause has been successfully approved."
    });
  };
  
  const handleReject = (causeId: string) => {
    toast({
      title: "Cause Rejected",
      description: "The cause has been rejected."
    });
  };
  
  const handleToggleCampaignStatus = (causeId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    toast({
      title: "Campaign Status Updated",
      description: `Campaign is now ${newStatus ? 'online' : 'offline'}.`
    });
  };
  
  const handleForceCloseClaims = (causeId: string) => {
    toast({
      title: "Claims Closed",
      description: "All claims for this cause have been closed as it reached the tote limit."
    });
  };

  return (
    <div className="space-y-4">
      {pendingCauses.map((cause) => (
        <Card key={cause.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{cause.title}</h3>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    Pending Review
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{cause.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Creator</p>
                    <p className="font-medium">{cause.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{cause.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">{new Date(cause.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleToggleCampaignStatus(cause.id, false)}
                  >
                    <Eye className="h-3 w-3" />
                    Toggle Online/Offline
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleForceCloseClaims(cause.id)}
                  >
                    <XCircle className="h-3 w-3" />
                    Force-close Claims
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 md:flex-col w-full md:w-auto md:min-w-[120px] mt-4 md:mt-0">
                <Button 
                  onClick={() => handleApprove(cause.id)} 
                  className="flex-1 md:flex-grow-0"
                >
                  Approve
                </Button>
                <Button 
                  onClick={() => handleReject(cause.id)}
                  variant="outline" 
                  className="flex-1 md:flex-grow-0"
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => navigate(`/admin/cause/${cause.id}`)}
                  variant="ghost" 
                  className="flex-1 md:flex-grow-0"
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {pendingCauses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No pending causes</h3>
          <p className="text-gray-500">All causes have been reviewed.</p>
        </div>
      )}
    </div>
  );
};

export default PendingCauses;
