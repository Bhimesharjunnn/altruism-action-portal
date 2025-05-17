
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Separator } from '@/components/ui/separator';

interface ConfirmationStepProps {
  formData: {
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
    toteQuantity: number;
    logoUrl: string;
    message: string;
  };
}

const ConfirmationStep = ({ formData }: ConfirmationStepProps) => {
  // Mock causes data
  const causes = [
    { id: '1', title: 'Clean Water Initiative' },
    { id: '2', title: "Children's Education Fund" },
    { id: '3', title: 'Women Entrepreneurs' },
    { id: '4', title: 'Wildlife Conservation' },
  ];

  const selectedCause = causes.find(cause => cause.id === formData.selectedCause)?.title || '';
  
  // Calculate sponsorship cost (this would normally come from backend)
  const unitPrice = 10; // $10 per tote
  const totalCost = formData.toteQuantity * unitPrice;
  
  // Mock QR code value
  const qrValue = `https://causeconnect.org/claim/${formData.selectedCause}?sponsor=${encodeURIComponent(formData.organizationName)}`;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Review Your Sponsorship</h2>
      <p className="text-gray-600 mb-6">
        Please review your sponsorship details before finalizing.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Organization Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Organization:</span>
                  <span className="font-medium">{formData.organizationName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="font-medium">{formData.contactName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </li>
                {formData.phone && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Sponsorship Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Cause:</span>
                  <span className="font-medium">{selectedCause}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{formData.toteQuantity} totes</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Price per tote:</span>
                  <span className="font-medium">${unitPrice.toFixed(2)}</span>
                </li>
                <Separator className="my-2" />
                <li className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">${totalCost.toLocaleString()}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full mt-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Ready to Complete!</h4>
                <p className="text-sm text-green-700">
                  Your sponsorship details are ready for submission. Click "Complete Sponsorship" to finalize.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Your QR Code</h3>
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
                  <QRCodeSVG value={qrValue} size={180} />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  This QR code will be printed on your sponsored totes.
                  <br />Users can scan it to learn more about your cause.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {formData.logoUrl && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Your Logo</h3>
                <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                  <img 
                    src={formData.logoUrl} 
                    alt="Organization Logo" 
                    className="max-h-32 max-w-full object-contain" 
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
