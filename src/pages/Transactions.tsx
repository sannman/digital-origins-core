
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';

// Mock transaction data for demonstration
const mockTransactions = [
  { id: '1', date: '2025-04-17', amount: 450, status: 'completed', customer: 'Table #3' },
  { id: '2', date: '2025-04-17', amount: 320, status: 'completed', customer: 'Table #5' },
  { id: '3', date: '2025-04-16', amount: 780, status: 'completed', customer: 'Table #2' },
  { id: '4', date: '2025-04-15', amount: 550, status: 'completed', customer: 'Table #7' },
  { id: '5', date: '2025-04-15', amount: 290, status: 'completed', customer: 'Table #1' },
];

export default function Transactions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transactions] = useState(mockTransactions);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View all your restaurant's payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">₹{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{transaction.customer}</td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
