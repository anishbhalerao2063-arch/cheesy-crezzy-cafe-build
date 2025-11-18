import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;
  const grandTotal = location.state?.grandTotal;

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
    if (!orderNumber) {
      navigate("/menu");
    }
  }, [user, orderNumber, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-cream via-background to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">Your order has been placed successfully</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="text-2xl font-bold text-primary">{orderNumber}</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">₹{grandTotal}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Your order is being prepared</p>
            <p>✓ You will be notified when it's ready</p>
            <p>✓ Thank you for choosing Chezzy Crezzy Café!</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/menu")}>
              Back to Menu
            </Button>
            <Button className="flex-1 bg-secondary hover:bg-secondary/90" onClick={() => navigate("/menu")}>
              Order More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
