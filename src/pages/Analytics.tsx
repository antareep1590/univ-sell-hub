import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Star
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Analytics = () => {
  const salesData = [
    { name: 'Day 1', sales: 0, canceled: 0, completed: 0, newOrders: 0 },
    { name: 'Day 2', sales: 100, canceled: 10, completed: 100, newOrders: 5 },
    { name: 'Day 3', sales: 200, canceled: 0, completed: 150, newOrders: 8 },
    { name: 'Day 4', sales: 400, canceled: 0, completed: 200, newOrders: 12 },
    { name: 'Day 5', sales: 300, canceled: 0, completed: 180, newOrders: 9 },
    { name: 'Day 6', sales: 250, canceled: 0, completed: 160, newOrders: 7 },
    { name: 'Day 7', sales: 200, canceled: 0, completed: 140, newOrders: 6 }
  ];

  const ratingsData = [
    { stars: '5 Stars', count: 100 },
    { stars: '4 Stars', count: 80 },
    { stars: '3 Stars', count: 50 },
    { stars: '2 Stars', count: 20 },
    { stars: '1 Star', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Track your performance and earnings over time
              </p>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Earnings to Date</p>
                    <p className="text-2xl font-bold text-foreground">$600</p>
                  </div>
                  <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Selling Price</p>
                    <p className="text-2xl font-bold text-foreground">$100</p>
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Orders Completed</p>
                    <p className="text-2xl font-bold text-foreground">50</p>
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Earned in Feb</p>
                    <p className="text-2xl font-bold text-foreground">$320</p>
                  </div>
                  <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Overview</CardTitle>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 Days</SelectItem>
                      <SelectItem value="30">Last 30 Days</SelectItem>
                      <SelectItem value="90">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                    <span>Sales $1000</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
                    <span>Canceled $10</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                    <span>Completed 10</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
                    <span>New Orders 5</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="canceled" stroke="hsl(var(--destructive))" strokeWidth={2} />
                    <Line type="monotone" dataKey="completed" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="newOrders" stroke="hsl(var(--warning))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl font-bold mr-2">4.8</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-5 w-5 text-warning fill-current" 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">All Time Rating</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Communication with Seller</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning fill-current mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Service as Described</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning fill-current mr-1" />
                        <span>5.0</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Buy Again</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning fill-current mr-1" />
                        <span>4.7</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recommend</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning fill-current mr-1" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Rating Breakdown</p>
                  <p className="text-xs text-muted-foreground mb-3">Rated Orders 105</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart layout="horizontal" data={ratingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="stars" type="category" width={60} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--warning))" />
                    </BarChart>
                  </ResponsiveContainer>
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

export default Analytics;