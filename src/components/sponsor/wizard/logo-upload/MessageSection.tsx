
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MessageSectionProps {
  message: string;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageSection = ({ message, onMessageChange }: MessageSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Message</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Any special requests or details about your sponsorship?"
            value={message}
            onChange={onMessageChange}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageSection;
