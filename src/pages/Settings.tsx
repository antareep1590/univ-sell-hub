import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield,
  Bell,
  Mail,
  Eye,
  Download,
  Trash2,
  Save
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newMessages: true,
    marketingEmails: false,
    weeklyDigest: true,
    promotionalOffers: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showOnlineStatus: true,
    allowDirectMessages: true
  });

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API
    toast({
      title: "Password Updated! 🔒",
      description: "Your password has been successfully updated.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be emailed to you within 24 hours.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    toast({
      title: "Account Deletion Request",
      description: "Please contact support to proceed with account deletion.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings ⚙️</h1>
            <p className="text-muted-foreground">
              Manage your account preferences and security settings
            </p>
          </div>

          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* Security Settings */}
            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Enter your new password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <Button onClick={handlePasswordChange} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline" className="mt-4">
                    Setup 2FA
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Order Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about order status changes
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.orderUpdates}
                      onCheckedChange={() => handleNotificationChange('orderUpdates')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">New Messages</p>
                      <p className="text-sm text-muted-foreground">
                        Instant notifications for new messages
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.newMessages}
                      onCheckedChange={() => handleNotificationChange('newMessages')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">
                        Weekly summary of your activity and earnings
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.weeklyDigest}
                      onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">
                        Tips, updates, and platform news
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.marketingEmails}
                      onCheckedChange={() => handleNotificationChange('marketingEmails')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Promotional Offers</p>
                      <p className="text-sm text-muted-foreground">
                        Special deals and discount notifications
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.promotionalOffers}
                      onCheckedChange={() => handleNotificationChange('promotionalOffers')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Privacy Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Public Profile</p>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to potential buyers
                      </p>
                    </div>
                    <Switch 
                      checked={privacy.profileVisibility}
                      onCheckedChange={() => handlePrivacyChange('profileVisibility')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Online Status</p>
                      <p className="text-sm text-muted-foreground">
                        Show when you're online to buyers
                      </p>
                    </div>
                    <Switch 
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={() => handlePrivacyChange('showOnlineStatus')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Direct Messages</p>
                      <p className="text-sm text-muted-foreground">
                        Allow buyers to message you directly
                      </p>
                    </div>
                    <Switch 
                      checked={privacy.allowDirectMessages}
                      onCheckedChange={() => handlePrivacyChange('allowDirectMessages')}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Export Data</p>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your data
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Delete Account</p>
                      <p className="text-sm text-destructive">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;