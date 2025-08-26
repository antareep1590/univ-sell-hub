import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Search,
  Users,
  Shield,
  TrendingUp,
  Globe,
  Clock,
  DollarSign,
  Star,
  Briefcase,
  GraduationCap,
  Code,
  Palette,
  FileText,
  Mic,
  Database,
  BookOpen
} from "lucide-react";

const Index = () => {
  const benefits = [
    {
      icon: Users,
      title: "Student-Friendly Jobs",
      description: "Flexible opportunities designed around your academic schedule"
    },
    {
      icon: GraduationCap,
      title: "Earn While You Learn",
      description: "Gain real-world experience and build your professional network"
    },
    {
      icon: Shield,
      title: "Fast, Secure Payments",
      description: "Get paid quickly and safely for all your completed work"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with clients and professionals from around the world"
    }
  ];

  const categories = [
    { icon: Clock, name: "Part-time Jobs", description: "Flexible work opportunities" },
    { icon: BookOpen, name: "Tutoring", description: "Share your knowledge" },
    { icon: Palette, name: "Graphic Design", description: "Visual creativity" },
    { icon: Code, name: "Programming Help", description: "Technical assistance" },
    { icon: FileText, name: "Content Writing", description: "Create engaging content" },
    { icon: Database, name: "Data Entry", description: "Accurate data processing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Find jobs. Earn skills.{" "}
            <br />
            <span className="text-primary">Build your future.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Univ Jobs connects students and professionals with real-world opportunities.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-card border border-card-border rounded-lg p-2 shadow-sm">
              <Search className="h-5 w-5 text-muted-foreground ml-3" />
              <Input
                type="text"
                placeholder="What job are you looking for?"
                className="flex-1 border-0 focus-visible:ring-0 text-base"
              />
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-6">
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/seller">
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3">
                Join Univ Jobs
              </Button>
            </Link>
            <span className="text-muted-foreground">Already a member?{" "}
              <Link to="/seller/signin" className="text-primary hover:underline">
                Sign In
              </Link>
            </span>
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

      {/* Popular Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Popular Categories
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Discover opportunities across various fields and industries
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-card-border group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <category.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-light">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students and professionals building their future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/seller/signup">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4">
                Start as a Seller
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4">
              Find Jobs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
