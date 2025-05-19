
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, Download, RefreshCcw } from 'lucide-react';

interface Claim {
  id: string;
  cause: string;
  claimerName: string;
  organization: string;
  status: 'pending' | 'verified' | 'processing';
  date: string;
}

interface RecentClaimsProps {
  recentClaims: Claim[];
}

const RecentClaims: React.FC<RecentClaimsProps> = ({ recentClaims }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApprove = (claimId: string) => {
    toast({
      title: "Claim Verified",
      description: "The claim has been successfully verified."
    });
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Claims</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <RefreshCcw className="h-3 w-3" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {recentClaims.map((claim) => (
          <Card key={claim.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{claim.cause}</h3>
                    <Badge 
                      variant="outline" 
                      className={
                        claim.status === 'pending' 
                          ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' 
                          : claim.status === 'verified'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      }
                    >
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Claimer</p>
                      <p className="font-medium">{claim.claimerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organization</p>
                      <p className="font-medium">{claim.organization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{new Date(claim.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Mark as Picked Up
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 md:flex-col w-full md:w-auto md:min-w-[120px] mt-4 md:mt-0">
                  {claim.status === 'pending' && (
                    <Button 
                      onClick={() => handleApprove(claim.id)} 
                      className="flex-1 md:flex-grow-0"
                    >
                      Verify
                    </Button>
                  )}
                  <Button 
                    onClick={() => navigate(`/admin/claim/${claim.id}`)}
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
      </div>
    </>
  );
};

export default RecentClaims;
