import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LogOut, Settings, User, MessageCircle } from "lucide-react";

export const AuthenticatedHeader = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-background border-b border-border px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/seller/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-semibold text-xl text-foreground">Univ Jobs</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/seller/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/seller/dashboard') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Dashboard
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`text-sm font-medium hover:text-primary ${
                    location.pathname.includes('/seller/my-business') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  My Orders <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/seller/my-business" className="w-full">
                    Orders & Earnings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/seller/my-gigs" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/seller/my-gigs') ? 'text-primary' : 'text-foreground'
              }`}
            >
              My Gigs
            </Link>
            
            <Link 
              to="/seller/analytics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/seller/analytics') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/seller/messages">
            <Button variant="ghost" size="sm" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem asChild>
                <Link to="/seller/profile" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/seller/settings" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};