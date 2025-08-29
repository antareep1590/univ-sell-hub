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
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders 📋</h1>
            <p className="text-muted-foreground">
              Track your orders and earnings like a pro student!
            </p>
          </div>

          {/* Tabs */}
            <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-6">
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