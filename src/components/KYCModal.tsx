import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Upload, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KYCModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKYCSubmit: (status: 'pending' | 'verified') => void;
}

export const KYCModal: React.FC<KYCModalProps> = ({ open, onOpenChange, onKYCSubmit }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: undefined as Date | undefined,
    country: "",
    idType: "",
    idNumber: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    routingNumber: ""
  });
  const [documents, setDocuments] = useState({
    governmentId: null as File | null,
    proofOfAddress: null as File | null
  });
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (type: 'governmentId' | 'proofOfAddress', file: File | null) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        const age = formData.dateOfBirth ? 
          new Date().getFullYear() - formData.dateOfBirth.getFullYear() : 0;
        return formData.fullName && formData.dateOfBirth && age >= 18 && formData.country && formData.idType && formData.idNumber;
      case 2:
        return documents.governmentId && documents.proofOfAddress;
      case 3:
        return formData.bankAccountName && formData.bankAccountNumber && formData.bankName && 
               (formData.country === 'US' ? formData.routingNumber.length === 9 : true);
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (isStepValid(3)) {
      // Simulate KYC submission
      toast({
        title: "KYC Documents Submitted! 📋",
        description: "Your documents are being reviewed. You'll be notified once verification is complete.",
      });
      
      // Simulate verification in progress
      onKYCSubmit('pending');
      onOpenChange(false);
      
      // Simulate verification completion after a few seconds (for demo)
      setTimeout(() => {
        onKYCSubmit('verified');
        toast({
          title: "KYC Verified! ✅",
          description: "Your identity has been verified. You can now add payout methods.",
        });
      }, 3000);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      fullName: "",
      dateOfBirth: undefined,
      country: "",
      idType: "",
      idNumber: "",
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "",
      routingNumber: ""
    });
    setDocuments({
      governmentId: null,
      proofOfAddress: null
    });
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Complete Your KYC Verification
          </DialogTitle>
          <DialogDescription>
            This information is essential for payouts and is handled securely according to compliance requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={cn(
                    "w-12 h-px ml-2",
                    currentStep > step ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Legal Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="As shown on government documents"
                  />
                  <p className="text-xs text-muted-foreground">Must match your government-issued ID</p>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth <span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date of birth"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={(date) => handleInputChange('dateOfBirth', date)}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">You must be at least 18 years old</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country of Residence <span className="text-destructive">*</span></Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idType">Government ID Type <span className="text-destructive">*</span></Label>
                    <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="national_id">National ID</SelectItem>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">Government ID Number <span className="text-destructive">*</span></Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      placeholder="ID number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Document Upload */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Government ID Document <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('govId')?.click()}
                      >
                        {documents.governmentId ? 'Change Document' : 'Upload Document'}
                      </Button>
                      <input
                        id="govId"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload('governmentId', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">
                        JPEG, PNG, or PDF (max 5MB). Ensure document is clear and unexpired.
                      </p>
                      {documents.governmentId && (
                        <div className="mt-2 text-sm text-success">
                          ✓ {documents.governmentId.name} uploaded
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Proof of Address <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('proofAddress')?.click()}
                      >
                        {documents.proofOfAddress ? 'Change Document' : 'Upload Document'}
                      </Button>
                      <input
                        id="proofAddress"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload('proofOfAddress', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">
                        Recent utility bill or bank statement (max 5MB, not older than 3 months)
                      </p>
                      {documents.proofOfAddress && (
                        <div className="mt-2 text-sm text-success">
                          ✓ {documents.proofOfAddress.name} uploaded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Bank Details */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bank Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankAccountName">Bank Account Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="bankAccountName"
                    value={formData.bankAccountName}
                    onChange={(e) => handleInputChange('bankAccountName', e.target.value)}
                    placeholder="Exactly as registered with your bank"
                  />
                  <p className="text-xs text-muted-foreground">Must match your payout account</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccountNumber">Bank Account Number <span className="text-destructive">*</span></Label>
                  <Input
                    id="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                    placeholder="Your account number"
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">Official Bank Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    placeholder="e.g. Chase Bank, Bank of America"
                  />
                </div>

                {formData.country === 'US' && (
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Bank Routing Number <span className="text-destructive">*</span></Label>
                    <Input
                      id="routingNumber"
                      value={formData.routingNumber}
                      onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                      placeholder="9-digit routing number"
                      maxLength={9}
                    />
                    <p className="text-xs text-muted-foreground">Required for US residents (9 digits)</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? handleCancel : () => setCurrentStep(prev => prev - 1)}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!isStepValid(currentStep)}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid(3)}
                className="bg-primary hover:bg-primary/90"
              >
                Submit KYC
              </Button>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-xs text-muted-foreground">
                All information and documents are encrypted and reviewed only for identity verification per compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};