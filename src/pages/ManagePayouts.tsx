import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { 
  CreditCard,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface PayoutMethod {
  id: string;
  type: 'bank' | 'paypal' | 'other';
  name: string;
  details: string;
  isDefault: boolean;
  status: 'verified' | 'pending' | 'failed';
}

interface PayoutRequest {
  id: string;
  amount: string;
  method: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

// Validation schemas
const bankSchema = z.object({
  methodType: z.literal("bank"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(8, "Account number must be at least 8 characters"),
  routingNumber: z.string().length(9, "Routing number must be exactly 9 digits"),
});

const paypalSchema = z.object({
  methodType: z.literal("paypal"),
  email: z.string().email("Please enter a valid email address"),
});

const otherSchema = z.object({
  methodType: z.literal("other"),
  methodName: z.string().min(2, "Method name is required"),
  accountInfo: z.string().min(5, "Account information is required"),
});

const payoutMethodSchema = z.discriminatedUnion("methodType", [
  bankSchema,
  paypalSchema,
  otherSchema,
]);

type PayoutMethodForm = z.infer<typeof payoutMethodSchema>;

const ManagePayouts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [selectedMethodType, setSelectedMethodType] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [show2FAConfirm, setShow2FAConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const form = useForm<PayoutMethodForm>({
    resolver: zodResolver(payoutMethodSchema),
    defaultValues: {
      methodType: "bank",
    },
  });

  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: "1",
      type: "bank",
      name: "Bank Transfer",
      details: "Chase Bank ***1234",
      isDefault: true,
      status: "verified"
    },
    {
      id: "2", 
      type: "paypal",
      name: "PayPal",
      details: "student@email.com",
      isDefault: false,
      status: "verified"
    }
  ]);

  const [payoutHistory] = useState<PayoutRequest[]>([
    {
      id: "1",
      amount: "$150.00",
      method: "Chase Bank ***1234",
      date: "01/15/2024",
      status: "completed"
    },
    {
      id: "2",
      amount: "$75.00", 
      method: "PayPal",
      date: "01/10/2024",
      status: "processing"
    },
    {
      id: "3",
      amount: "$200.00",
      method: "Chase Bank ***1234", 
      date: "12/28/2023",
      status: "completed"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: { color: "bg-success text-success-foreground", icon: CheckCircle },
      pending: { color: "bg-warning text-warning-foreground", icon: Clock },
      failed: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
      completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
      processing: { color: "bg-primary text-primary-foreground", icon: Clock }
    };
    
    const variant = variants[status as keyof typeof variants];
    const Icon = variant.icon;
    
    return (
      <Badge className={variant.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleAddMethod = (data: PayoutMethodForm) => {
    const action = () => {
      // In real app, this would validate and add the method
      const methodDetails = 
        data.methodType === 'bank' ? `${data.bankName} ***${data.accountNumber.slice(-4)}` :
        data.methodType === 'paypal' ? data.email :
        `${data.methodName} - ${data.accountInfo}`;

      const newMethod: PayoutMethod = {
        id: Date.now().toString(),
        type: data.methodType,
        name: data.methodType === 'bank' ? 'Bank Transfer' : 
              data.methodType === 'paypal' ? 'PayPal' : 
              data.methodName,
        details: methodDetails,
        isDefault: payoutMethods.length === 0,
        status: 'pending'
      };

      setPayoutMethods(prev => [...prev, newMethod]);
      toast({
        title: "Payout Method Added! 🎉",
        description: "Your new payout method has been added successfully.",
      });
      setIsAddingMethod(false);
      form.reset();
      setSelectedMethodType("");
    };

    setPendingAction(() => action);
    setShow2FAConfirm(true);
  };

  const handle2FAConfirm = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setShow2FAConfirm(false);
  };

  const handleDeleteMethod = (id: string) => {
    const action = () => {
      setPayoutMethods(prev => prev.filter(method => method.id !== id));
      toast({
        title: "Method Removed",
        description: "Payout method has been deleted successfully."
      });
      setShowDeleteConfirm(null);
    };

    setPendingAction(() => action);
    setShow2FAConfirm(true);
  };

  const handleSetDefault = (id: string) => {
    setPayoutMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    toast({
      title: "Default Method Updated",
      description: "Your default payout method has been changed."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/seller/my-business')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Earnings
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Manage Payout Methods 💳</h1>
                <p className="text-muted-foreground">
                  Add, edit, and manage how you receive your earnings
                </p>
              </div>
                <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Method
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Payout Method</DialogTitle>
                    <DialogDescription>
                      Add a new way to receive your earnings
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={form.handleSubmit(handleAddMethod)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="method-type">Method Type</Label>
                      <Select 
                        value={selectedMethodType} 
                        onValueChange={(value) => {
                          setSelectedMethodType(value);
                          form.setValue("methodType", value as any);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payout method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="other">Other Method</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.methodType && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.methodType.message}
                        </p>
                      )}
                    </div>

                    {selectedMethodType === 'bank' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bank-name">Bank Name</Label>
                          <Input 
                            id="bank-name" 
                            placeholder="e.g. Chase Bank"
                            {...form.register("bankName")}
                          />
                          {(form.formState.errors as any).bankName && (
                            <p className="text-sm text-destructive">
                              {(form.formState.errors as any).bankName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account-number">Account Number</Label>
                          <Input 
                            id="account-number" 
                            placeholder="Account number"
                            {...form.register("accountNumber")}
                          />
                          {(form.formState.errors as any).accountNumber && (
                            <p className="text-sm text-destructive">
                              {(form.formState.errors as any).accountNumber.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="routing-number">Routing Number</Label>
                          <Input 
                            id="routing-number" 
                            placeholder="Routing number"
                            {...form.register("routingNumber")}
                          />
                          {(form.formState.errors as any).routingNumber && (
                            <p className="text-sm text-destructive">
                              {(form.formState.errors as any).routingNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedMethodType === 'paypal' && (
                      <div className="space-y-2">
                        <Label htmlFor="paypal-email">PayPal Email</Label>
                        <Input 
                          id="paypal-email" 
                          type="email" 
                          placeholder="your@email.com"
                          {...form.register("email")}
                        />
                        {(form.formState.errors as any).email && (
                          <p className="text-sm text-destructive">
                            {(form.formState.errors as any).email.message}
                          </p>
                        )}
                      </div>
                    )}

                    {selectedMethodType === 'other' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="method-name">Method Name</Label>
                          <Input 
                            id="method-name" 
                            placeholder="e.g. Venmo, Zelle"
                            {...form.register("methodName")}
                          />
                          {(form.formState.errors as any).methodName && (
                            <p className="text-sm text-destructive">
                              {(form.formState.errors as any).methodName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account-info">Account Information</Label>
                          <Input 
                            id="account-info" 
                            placeholder="Account details"
                            {...form.register("accountInfo")}
                          />
                          {(form.formState.errors as any).accountInfo && (
                            <p className="text-sm text-destructive">
                              {(form.formState.errors as any).accountInfo.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsAddingMethod(false);
                        form.reset();
                        setSelectedMethodType("");
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add Method
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payout Methods */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Your Payout Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {payoutMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No Payout Methods</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Add a payout method to start receiving your earnings
                      </p>
                      <Button onClick={() => setIsAddingMethod(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Method
                      </Button>
                    </div>
                  ) : (
                    payoutMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{method.name}</h3>
                              <p className="text-sm text-muted-foreground">{method.details}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(method.status)}
                            {method.isDefault && (
                              <Badge variant="outline">Default</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {!method.isDefault && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleSetDefault(method.id)}
                              >
                                Set Default
                              </Button>
                            )}
                          </div>
                          {!method.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowDeleteConfirm(method.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payout History */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {payoutHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No Payout History</h3>
                      <p className="text-muted-foreground text-sm">
                        Your payout requests will appear here
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payoutHistory.map((payout) => (
                          <TableRow key={payout.id}>
                            <TableCell className="font-medium">{payout.amount}</TableCell>
                            <TableCell>{payout.method}</TableCell>
                            <TableCell>{payout.date}</TableCell>
                            <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payout Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payout method? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (showDeleteConfirm) {
                  handleDeleteMethod(showDeleteConfirm);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Method
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 2FA Confirmation Dialog */}
      <AlertDialog open={show2FAConfirm} onOpenChange={setShow2FAConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription>
              For your security, please confirm this action. In a real application, this would require 2FA verification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setPendingAction(null);
              setShow2FAConfirm(false);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handle2FAConfirm}>
              Confirm Action
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default ManagePayouts;