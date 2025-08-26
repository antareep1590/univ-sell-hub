import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-semibold text-xl text-foreground">Univ Jobs</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
              Explore
            </Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/seller/signin">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Sign In
            </Button>
          </Link>
          <Link to="/seller/signup">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Join as Seller
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};