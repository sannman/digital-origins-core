
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SettingsProps {
  restaurantName: string;
  upiId: string;
  onUpdate: (name: string, upiId: string) => void;
}

export const SettingsDialog: React.FC<SettingsProps> = ({
  restaurantName,
  upiId,
  onUpdate,
}) => {
  const [name, setName] = React.useState(restaurantName);
  const [vpa, setVpa] = React.useState(upiId);

  const handleSave = () => {
    if (!name.trim() || !vpa.trim()) {
      toast({
        title: "Invalid Details",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    onUpdate(name, vpa);
    toast({
      title: "Settings Updated",
      description: "Your restaurant details have been saved"
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-4 right-4">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restaurant Settings</DialogTitle>
          <DialogDescription>
            Configure your restaurant's payment details here
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Restaurant Name</Label>
            <Input
              id="restaurantName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter restaurant name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              value={vpa}
              onChange={(e) => setVpa(e.target.value)}
              placeholder="Enter UPI ID (e.g., business@upi)"
            />
          </div>
          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
