import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { Eye, Download } from "lucide-react";

const MyBusiness = () => {
  const [orders] = useState([
    {
      id: "1",
      buyer: "Max Johnson",
      buyerAvatar: "/placeholder.svg",
      buyerRating: 4.9,
      gigTitle: "Social Media Graphics Package",
      orderDate: "01/15/2024",
      deliveryDate: "01/18/2024",
      price: "$75",
      status: "Pending Delivery"
    },
    {
      id: "2",
      buyer: "Sanya Rodriguez", 
      buyerAvatar: "/placeholder.svg",
      buyerRating: 4.7,
      gigTitle: "Logo Design for Wellness Studio",
      orderDate: "01/12/2024",
      deliveryDate: "01/16/2024",
      price: "$150",
      status: "Delivered"
    },
    {
      id: "3",
      buyer: "Alex Chen",
      buyerAvatar: "/placeholder.svg", 
      buyerRating: 4.8,
      gigTitle: "Website Header Design",
      orderDate: "01/10/2024",
      deliveryDate: "01/14/2024",
      price: "$100",
      status: "Cancelled"
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      "Pending Delivery": "bg-warning text-warning-foreground",
      "Delivered": "bg-success text-success-foreground",
      "Delayed": "bg-destructive text-destructive-foreground",
      "Cancelled": "bg-muted text-muted-foreground"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-muted text-muted-foreground"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders 📋</h1>
            <p className="text-muted-foreground">
              Track your orders and manage all student projects in one place
            </p>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Orders</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search orders..." className="w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Gig Title</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={order.buyerAvatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {order.buyer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{order.buyer}</p>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <span className="text-warning">★</span>
                              <span>{order.buyerRating}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{order.gigTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell className={
                        order.status === "Delayed" ? "text-destructive font-medium" : ""
                      }>
                        {order.deliveryDate}
                      </TableCell>
                      <TableCell className={`font-medium ${
                        order.status === "Delivered" ? "text-success" : ""
                      }`}>
                        {order.price}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === "Delivered" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">1</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">1</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">$325</p>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyBusiness;