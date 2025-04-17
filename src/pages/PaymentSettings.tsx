
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

export default function PaymentSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [restaurantName, setRestaurantName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!restaurantName.trim() || !upiId.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSaving(true);
    
    try {
      // In a real app, you would save this data to Supabase
      // For now we'll just simulate success
      setTimeout(() => {
        toast.success("Payment settings saved successfully");
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving payment settings:", error);
      toast.error("Failed to save settings");
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>
            Configure your restaurant's payment details for customer transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurant-name">Restaurant Name</Label>
            <Input
              id="restaurant-name"
              placeholder="Enter your restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input
              id="upi-id"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This is the UPI ID where you'll receive payments from customers
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
