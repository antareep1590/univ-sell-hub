import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { 
  MessageCircle,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Eye
} from "lucide-react";

interface Order {
  id: string;
  buyer: string;
  buyerRating?: number;  // Add buyer rating
  gig: string;
  dueDate: string;
  total: string;
  status: "pending" | "in-transit" | "completed" | "canceled";
  note?: string;
}

interface Message {
  id: string;
  name: string;
  avatar: string;
  message: string;
  timeAgo: string;
}

const Dashboard = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      buyer: "Antaroop",
      buyerRating: 4.8,
      gig: "abcd...",
      dueDate: "04/13/2024",
      total: "$100",
      status: "pending",
      note: "-"
    },
    {
      id: "2", 
      buyer: "Sam",
      buyerRating: 4.7,
      gig: "abcd...",
      dueDate: "04/03/2023",
      total: "$100",
      status: "in-transit",
      note: "-"
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: "1",
      name: "Max",
      avatar: "/placeholder.svg",
      message: "Hello",
      timeAgo: "2hr"
    },
    {
      id: "2",
      name: "Sanya",
      avatar: "/placeholder.svg", 
      message: "Wailey",
      timeAgo: "4hr"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-warning text-warning-foreground",
      "in-transit": "bg-primary text-primary-foreground",
      completed: "bg-success text-success-foreground",
      canceled: "bg-destructive text-destructive-foreground"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Student! 🎯</h1>
            <p className="text-muted-foreground">
              Ready to showcase your skills and grow your career?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Inbox Response Rate</p>
                      <p className="text-xl font-bold">100%</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="text-xl font-bold">20%</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-12 w-12 bg-success/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-success" />
                      </div>
                      <p className="text-sm text-muted-foreground">Order Response Rate</p>
                      <p className="text-xl font-bold">100%</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-12 w-12 bg-success/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-success" />
                      </div>
                      <p className="text-sm text-muted-foreground">Delivered on Time</p>
                      <p className="text-xl font-bold">100%</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Order Completion</p>
                        <p className="text-xl font-bold">80%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Earned in January</p>
                        <p className="text-xl font-bold text-success">$50</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Orders */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Active Orders</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">2 orders</Badge>
                      <Select defaultValue="active">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                          <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Gig</TableHead>
                        <TableHead>Due On</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{order.buyer}</span>
                              {order.buyerRating && (
                                <div className="flex items-center space-x-1 text-xs bg-muted rounded px-2 py-1">
                                  <span className="text-warning">★</span>
                                  <span className="font-medium">{order.buyerRating}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{order.gig}</TableCell>
                          <TableCell>{order.dueDate}</TableCell>
                          <TableCell className="font-medium">{order.total}</TableCell>
                          <TableCell>{order.note}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Share Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3 text-sm font-mono">
                        www.univjobs.com/seller/yourprofile
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Inbox */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Inbox
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-center space-x-3">
                      <img
                        src={message.avatar}
                        alt={message.name}
                        className="h-10 w-10 rounded-full bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{message.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          Me: {message.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {message.timeAgo}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;