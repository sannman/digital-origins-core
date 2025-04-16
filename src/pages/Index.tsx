
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { IndianRupee, Receipt, QrCode, ThumbsUp } from "lucide-react";
import { generateUPIQRString } from "@/utils/upiQRGenerator";

const Index = () => {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [waiterName, setWaiterName] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [qrCodeData, setQRCodeData] = useState<string>("");

  // Restaurant's UPI details
  const RESTAURANT_VPA = "restaurant@upi"; // Replace with actual UPI ID
  const RESTAURANT_NAME = "Sample Restaurant"; // Replace with actual name

  const handleGenerateQR = () => {
    if (billAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid bill amount.",
        variant: "destructive"
      });
      return;
    }

    const upiString = generateUPIQRString({
      payeeName: RESTAURANT_NAME,
      payeeVPA: RESTAURANT_VPA,
      amount: calculateTotal(),
      transactionNote: `Bill: ₹${billAmount} + Tip: ₹${tipAmount}`
    });

    setQRCodeData(upiString);
    setShowQR(true);
    toast({
      title: "QR Code Generated",
      description: `Scan to pay ₹${calculateTotal()}`,
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
              Scan QR code to pay bill and tips
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
            
            {/* QR Code Section */}
            {showQR && (
              <div className="flex flex-col items-center justify-center space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`}
                  alt="UPI QR Code"
                  className="w-48 h-48"
                />
                <p className="text-sm text-gray-500">Scan this QR code to pay</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleGenerateQR}
              disabled={billAmount <= 0}
            >
              {showQR ? 'Update QR Code' : 'Generate QR Code'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
