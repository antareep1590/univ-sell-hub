import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const SellerSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard without validation
    window.location.href = "/seller/dashboard";
  };

  const handleSocialSignIn = (provider: string) => {
    // Handle social sign in logic here
    console.log("Social sign in:", provider);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="p-4">
        <Link to="/seller" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-md">
          {/* College-style illustration placeholder */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back, Student!</h1>
            <p className="text-muted-foreground">Ready to showcase your skills and earn?</p>
          </div>
          
          <Card className="border-card-border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-foreground">
                Sign In
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base rounded-lg border-input focus:border-input-focus"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-base rounded-lg border-input focus:border-input-focus pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link to="/seller/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg"
                >
                  Let's Get Started! 🚀
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/seller/signup" className="text-primary hover:underline font-medium">
                    Sign up here!
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerSignIn;