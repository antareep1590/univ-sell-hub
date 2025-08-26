import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">U</span>
              </div>
              <span className="font-semibold text-xl">Univ Jobs</span>
            </div>
            <p className="text-sm text-footer-foreground/80">
              Connecting students and professionals with real-world opportunities. 
              Build your future with flexible, skill-building jobs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/seller" className="hover:text-primary transition-colors">Become a Seller</Link></li>
              <li><Link to="/seller/signin" className="hover:text-primary transition-colors">Seller Sign In</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Find Services</Link></li>
              <li><Link to="/signin" className="hover:text-primary transition-colors">Buyer Sign In</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">Browse Categories</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-footer-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-footer-foreground/60">
            © 2024 Univ Jobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};