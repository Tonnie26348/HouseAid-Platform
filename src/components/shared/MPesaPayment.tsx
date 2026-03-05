import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface MPesaPaymentProps {
  amount: number;
  workerName: string;
}

const MPesaPayment: React.FC<MPesaPaymentProps> = ({ amount, workerName }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.match(/^(?:254|\+254|0)?(7|1)[0-9]{8}$/)) {
      toast.error("Please enter a valid Kenyan phone number");
      return;
    }

    setIsProcessing(true);
    // Simulate STK Push
    toast.info("STK Push sent to your phone. Please enter your PIN.");
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      toast.success("Payment of KSh " + amount + " to " + workerName + " confirmed!");
    }, 5000);
  };

  if (isDone) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <CardTitle>Payment Successful</CardTitle>
          <CardDescription>KSh {amount} has been sent to {workerName}.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          <CardTitle>Pay with M-Pesa</CardTitle>
        </div>
        <CardDescription>
          Pay KSh {amount} for service provided by {workerName}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa Phone Number</Label>
            <Input
              id="phone"
              placeholder="e.g. 0712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#32ba43] hover:bg-[#2da93d] text-white" disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay KSh ${amount}`}
          </Button>
          <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
            <CreditCard className="h-3 w-3" /> Secure payment via Safaricom M-Pesa
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default MPesaPayment;
