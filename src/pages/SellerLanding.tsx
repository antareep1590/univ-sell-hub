import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  Globe, 
  Shield, 
  Star, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Mic,
  Code,
  Palette,
  FileText,
  Database,
  BookOpen
} from "lucide-react";

const SellerLanding = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Flexible Earning",
      description: "Set your own rates and work on your schedule"
    },
    {
      icon: Globe,
      title: "Global Audience",
      description: "Connect with clients from around the world"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid safely and on time, every time"
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Grow your professional profile and earn reviews"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Gig",
      description: "Showcase your skills and services to potential buyers"
    },
    {
      step: "2",
      title: "Get Hired",
      description: "Receive orders from clients who need your expertise"
    },
    {
      step: "3",
      title: "Deliver Work",
      description: "Complete projects and provide excellent service"
    },
    {
      step: "4",
      title: "Get Paid",
      description: "Receive secure payments directly to your account"
    }
  ];

  const categories = [
    { icon: Mic, name: "Voice Talent", color: "text-purple-600" },
    { icon: Code, name: "Programming Help", color: "text-blue-600" },
    { icon: Palette, name: "Logo Design", color: "text-pink-600" },
    { icon: FileText, name: "Content Writing", color: "text-green-600" },
    { icon: Database, name: "Data Entry", color: "text-orange-600" },
    { icon: BookOpen, name: "Tutoring", color: "text-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Start selling your skills. <br />
            <span className="text-primary">Grow your career.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Univ Jobs connects you with global buyers for flexible, skill-building jobs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/seller/signup">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg">
                Start Selling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/seller/signin">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Already a Seller? Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-card-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-card-border">
                <CardContent className="p-6 text-center">
                  <category.icon className={`h-8 w-8 mx-auto mb-3 ${category.color}`} />
                  <p className="font-medium text-foreground">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of sellers already earning on Univ Jobs
          </p>
          <Link to="/seller/signup">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellerLanding;