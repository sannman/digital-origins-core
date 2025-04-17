
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
          <p className="text-muted-foreground mb-4">Configure your restaurant's UPI payment details</p>
          <Button onClick={() => navigate('/payment-settings')}>View Settings</Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Generate QR Code</h2>
          <p className="text-muted-foreground mb-4">Create QR codes for customer payments</p>
          <Button onClick={() => navigate('/generate-qr')}>Generate QR</Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <p className="text-muted-foreground mb-4">View your restaurant's payment history</p>
          <Button onClick={() => navigate('/transactions')}>View History</Button>
        </div>
      </div>
    </div>
  );
}
