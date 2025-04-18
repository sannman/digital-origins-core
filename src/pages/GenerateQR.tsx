
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';
import { generateQRCode } from '@/utils/upiQRGenerator';
import { AlertCircle } from 'lucide-react';

export default function GenerateQR() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrData, setQrData] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({
    restaurantName: '',
    upiId: '',
  });
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Load payment settings from localStorage
  useEffect(() => {
    const restaurantName = localStorage.getItem('restaurantName') || '';
    const upiId = localStorage.getItem('upiId') || '';
    
    setPaymentSettings({ restaurantName, upiId });
    setSettingsLoaded(true);
  }, []);

  const handleGenerate = async () => {
    if (!paymentSettings.restaurantName || !paymentSettings.upiId) {
      toast.error("Please configure your payment settings first");
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setGenerating(true);
    
    try {
      // Generate QR code data URL using our utility function
      const qrCodeUrl = await generateQRCode({
        payeeName: paymentSettings.restaurantName,
        payeeVPA: paymentSettings.upiId,
        amount: Number(amount),
        description: description || 'Restaurant payment',
      });
      
      setQrData(qrCodeUrl);
      toast.success("QR code generated successfully");
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setGenerating(false);
    }
  };

  const handleSetupPayment = () => {
    navigate("/payment-settings");
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate Payment QR Code</CardTitle>
            <CardDescription>
              Create a QR code for your customers to make payments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {settingsLoaded && (!paymentSettings.restaurantName || !paymentSettings.upiId) && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 flex items-start space-x-2 mb-4">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Payment settings not configured</p>
                  <p className="text-sm">You need to set up your payment details first.</p>
                  <Button 
                    variant="outline" 
                    className="mt-2 text-xs h-8" 
                    onClick={handleSetupPayment}
                  >
                    Setup Payment Details
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Food order, Table #5, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {settingsLoaded && paymentSettings.upiId && (
              <p className="text-sm text-muted-foreground mt-2">
                Payment will be received at: <span className="font-medium">{paymentSettings.upiId}</span>
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleGenerate} 
              disabled={generating || !paymentSettings.upiId}
            >
              {generating ? "Generating..." : "Generate QR Code"}
            </Button>
          </CardFooter>
        </Card>

        {qrData && (
          <Card>
            <CardHeader>
              <CardTitle>Payment QR Code</CardTitle>
              <CardDescription>
                Show this QR code to your customer for payment
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <img src={qrData} alt="Payment QR Code" className="w-64 h-64" />
              </div>
              <p className="mt-4 text-center font-medium">
                Amount: ₹{amount}
              </p>
              {description && (
                <p className="text-sm text-muted-foreground text-center">
                  {description}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Pay to: {paymentSettings.restaurantName} ({paymentSettings.upiId})
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => window.print()}
              >
                Print QR Code
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
