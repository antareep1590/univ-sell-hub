import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  DollarSign,
  Clock,
  TrendingUp,
  Download,
  Settings
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  activity: string;
  description: string;
  from: string;
  order: string;
  amount: string;
}

const Earnings = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "08/09/2023",
      activity: "Gigs Earnings",
      description: "abcd...",
      from: "Max",
      order: "Poster",
      amount: "$100"
    },
    {
      id: "2",
      date: "02/21/2023", 
      activity: "Earnings",
      description: "abcd...",
      from: "Antaroop",
      order: "Gigs",
      amount: "$100"
    },
    {
      id: "3",
      date: "09/20/2024",
      activity: "Expense",
      description: "abc...",
      from: "Sam",
      order: "Gigs",
      amount: "$50"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Earnings & Expenses</h1>
              <p className="text-muted-foreground">
                Track your payments, balance, and financial overview
              </p>
            </div>
          </div>

          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Available Funds */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Available Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance Available</p>
                    <p className="text-3xl font-bold text-foreground">$50</p>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full mb-2">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Withdraw Balance
                    </Button>
                    <Link to="/seller/manage-payouts">
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Payout Methods
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Future Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payments Cleared</p>
                    <p className="text-3xl font-bold text-foreground">$100</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payments for Active Orders</p>
                    <p className="text-xl font-bold text-foreground">$50</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings & Expenses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Earnings & Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Earnings to Date</p>
                    <p className="text-3xl font-bold text-success">$500</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expenses to Date</p>
                    <p className="text-xl font-bold text-destructive">$100</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reports</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Date Range</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.activity === "Expense" ? (
                            <TrendingUp className="h-4 w-4 mr-2 text-destructive rotate-180" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-2 text-success" />
                          )}
                          {transaction.activity}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.from}</TableCell>
                      <TableCell>{transaction.order}</TableCell>
                      <TableCell className={`font-medium ${
                        transaction.activity === "Expense" ? "text-destructive" : "text-success"
                      }`}>
                        {transaction.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Earnings;