
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { IndianRupee, Receipt, CreditCard, ThumbsUp } from "lucide-react";

const Index = () => {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [waiterName, setWaiterName] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");

  const handlePayment = () => {
    if (billAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid bill amount.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would connect to payment processing
    toast({
      title: "Payment Initiated",
      description: `Processing payment of ₹${billAmount + tipAmount}`,
    });
  };

  const calculateTotal = () => {
    return billAmount + tipAmount;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Receipt className="h-6 w-6" />
              Restaurant Payment
            </CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Pay your bill and add tips for service
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            {/* Bill Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Bill Details
              </h3>
              <div className="space-y-2">
                <Label htmlFor="billAmount">Bill Amount (₹)</Label>
                <Input 
                  id="billAmount" 
                  type="number" 
                  placeholder="Enter bill amount" 
                  value={billAmount || ''} 
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                />
              </div>
            </div>
            
            {/* Tip Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                Tip Your Server
              </h3>
              <div className="space-y-2">
                <Label htmlFor="waiterName">Waiter Name</Label>
                <Input 
                  id="waiterName" 
                  placeholder="Enter waiter name" 
                  value={waiterName} 
                  onChange={(e) => setWaiterName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipAmount">Tip Amount (₹)</Label>
                <Input 
                  id="tipAmount" 
                  type="number" 
                  placeholder="Enter tip amount" 
                  value={tipAmount || ''} 
                  onChange={(e) => setTipAmount(Number(e.target.value))}
                />
              </div>
            </div>
            
            {/* Payment Method Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </h3>
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input 
                  id="upiId" 
                  placeholder="Enter UPI ID (e.g. name@upi)" 
                  value={upiId} 
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handlePayment}
              disabled={billAmount <= 0}
            >
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
