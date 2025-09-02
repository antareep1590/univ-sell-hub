import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  CreditCard,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Shield
} from "lucide-react";

const WithdrawBalance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data
  const availableBalance = 1247.50;
  const minimumWithdraw = 10;
  const maximumWithdraw = 1000;
  
  const payoutMethods = [
    { id: "paypal", name: "PayPal", email: "john@example.com", type: "PayPal" },
    { id: "bank", name: "Bank Transfer", details: "****1234", type: "Bank Account" },
    { id: "stripe", name: "Stripe", details: "****5678", type: "Stripe Express" }
  ];

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setWithdrawAmount(value);
    }
  };

  const validateWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!withdrawAmount || isNaN(amount)) {
      return "Please enter a valid amount";
    }
    
    if (amount < minimumWithdraw) {
      return `Minimum withdrawal amount is $${minimumWithdraw}`;
    }
    
    if (amount > maximumWithdraw) {
      return `Maximum withdrawal amount is $${maximumWithdraw}`;
    }
    
    if (amount > availableBalance) {
      return "Insufficient balance";
    }
    
    if (!selectedMethod) {
      return "Please select a payout method";
    }
    
    return null;
  };

  const handleWithdrawRequest = () => {
    const error = validateWithdraw();
    if (error) {
      toast({
        title: "Withdrawal Error",
        description: error,
        variant: "destructive"
      });
      return;
    }
    
    setShowVerification(true);
  };

  const handleVerifyAndWithdraw = async () => {
    if (!verificationCode || verificationCode.length < 6) {
      toast({
        title: "Verification Required",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Withdrawal Initiated",
        description: `Your withdrawal of $${withdrawAmount} has been processed and will arrive within 1-3 business days.`
      });
      
      navigate("/seller/my-business");
    }, 2000);
  };

  const error = validateWithdraw();

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/seller/my-business')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Business
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Withdraw Balance</h1>
              <p className="text-muted-foreground">
                Transfer your earnings to your preferred payout method
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Available Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Available Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">
                  ${availableBalance.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Ready for withdrawal
                </p>
              </CardContent>
            </Card>

            {/* Withdrawal Form */}
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showVerification ? (
                  <>
                    {/* Amount Input */}
                    <div className="space-y-2">
                      <Label htmlFor="amount">Withdrawal Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="amount"
                          type="text"
                          value={withdrawAmount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Min: ${minimumWithdraw} • Max: ${maximumWithdraw} per transaction
                      </p>
                    </div>

                    {/* Payout Method Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="method">Payout Method</Label>
                      <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payout method" />
                        </SelectTrigger>
                        <SelectContent>
                          {payoutMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id}>
                              <div className="flex items-center space-x-3">
                                <CreditCard className="h-4 w-4" />
                                <div>
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {method.type} • {method.details || method.email}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Don't see your method? <Button variant="link" className="h-auto p-0 text-xs" onClick={() => navigate("/seller/manage-payouts")}>Manage payout methods</Button>
                      </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Action Button */}
                    <Button 
                      onClick={handleWithdrawRequest}
                      disabled={!!error}
                      className="w-full"
                    >
                      Request Withdrawal
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Verification Step */}
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Verify Your Identity</h3>
                        <p className="text-muted-foreground">
                          We've sent a 6-digit code to your registered email address
                        </p>
                      </div>
                    </div>

                    {/* Verification Code Input */}
                    <div className="space-y-2">
                      <Label htmlFor="verification">Verification Code</Label>
                      <Input
                        id="verification"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="123456"
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        Enter the 6-digit code sent to your email
                      </p>
                    </div>

                    {/* Withdrawal Summary */}
                    <div className="bg-muted rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Withdrawal Amount:</span>
                        <span className="font-medium">${withdrawAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payout Method:</span>
                        <span className="font-medium">
                          {payoutMethods.find(m => m.id === selectedMethod)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Time:</span>
                        <span className="font-medium">1-3 business days</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowVerification(false)}
                        className="flex-1"
                        disabled={isProcessing}
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleVerifyAndWithdraw}
                        disabled={isProcessing || verificationCode.length < 6}
                        className="flex-1"
                      >
                        {isProcessing ? "Processing..." : "Confirm Withdrawal"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Processing times:</strong> Most withdrawals are processed within 1-3 business days.</p>
                    <p><strong>Fees:</strong> Standard withdrawal fees may apply depending on your payout method.</p>
                    <p><strong>Limits:</strong> Daily withdrawal limit is ${maximumWithdraw}. Monthly limit is $10,000.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WithdrawBalance;