import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SellerLanding from "./pages/SellerLanding";
import SellerSignIn from "./pages/SellerSignIn";
import SellerSignUp from "./pages/SellerSignUp";
import MyGigs from "./pages/MyGigs";
import CreateGig from "./pages/CreateGig";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics"; 
import Earnings from "./pages/Earnings";
import MyBusiness from "./pages/MyBusiness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/seller" element={<SellerLanding />} />
          <Route path="/seller/signin" element={<SellerSignIn />} />
          <Route path="/seller/signup" element={<SellerSignUp />} />
          <Route path="/seller/dashboard" element={<Dashboard />} />
          <Route path="/seller/my-gigs" element={<MyGigs />} />
          <Route path="/seller/create-gig" element={<CreateGig />} />
          <Route path="/seller/analytics" element={<Analytics />} />
          <Route path="/seller/earnings" element={<Earnings />} />
          <Route path="/seller/my-business" element={<MyBusiness />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
