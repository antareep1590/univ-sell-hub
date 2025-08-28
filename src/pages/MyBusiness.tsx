import { useState } from "react";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GigsManager from "@/components/gigs/GigsManager";
import EarningsPanel from "@/components/earnings/EarningsPanel";

const MyBusiness = () => {
  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Business 📊</h1>
            <p className="text-muted-foreground">
              Manage your gigs and track your earnings like a pro!
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="gigs" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="gigs">Gigs</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gigs" className="mt-6">
              <GigsManager />
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-6">
              <EarningsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyBusiness;