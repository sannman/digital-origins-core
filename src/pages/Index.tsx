
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-4xl font-bold tracking-tight">Restaurant Payment System</h1>
        <p className="text-lg text-muted-foreground">
          A simple way to manage UPI payments for your restaurant
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <Button asChild size="lg">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login?tab=register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
