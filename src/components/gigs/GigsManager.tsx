import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { 
  Plus,
  Search,
  Edit3,
  Eye,
  MoreHorizontal,
  Filter,
  Calendar,
  Users
} from "lucide-react";

interface Gig {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  status: "active" | "paused" | "draft";
  thumbnail: string;
  priceRange: string;
  orders: number;
  rating: number;
  dateCreated: string;
  dateUpdated: string;
}

const GigsManager = () => {
  const navigate = useNavigate();
  
  // Sample data
  const [gigs] = useState<Gig[]>([
    {
      id: "1",
      title: "I will create stunning social media content for your brand",
      category: "Digital Marketing",
      subcategory: "Social Media",
      status: "active",
      thumbnail: "/placeholder.svg",
      priceRange: "$25 - $150",
      orders: 12,
      rating: 4.9,
      dateCreated: "2024-01-15",
      dateUpdated: "2024-01-20"
    },
    {
      id: "2", 
      title: "I will design professional logos for your business",
      category: "Graphics & Design",
      subcategory: "Logo Design",
      status: "paused",
      thumbnail: "/placeholder.svg",
      priceRange: "$50 - $200",
      orders: 8,
      rating: 5.0,
      dateCreated: "2024-01-10",
      dateUpdated: "2024-01-18"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedGigs, setSelectedGigs] = useState<string[]>([]);
  const [periodFilter, setPeriodFilter] = useState("last30days");

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-success text-success-foreground",
      paused: "bg-warning text-warning-foreground", 
      draft: "bg-muted text-muted-foreground"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleSelectGig = (gigId: string) => {
    setSelectedGigs(prev => 
      prev.includes(gigId) 
        ? prev.filter(id => id !== gigId)
        : [...prev, gigId]
    );
  };

  const handleSelectAll = () => {
    setSelectedGigs(selectedGigs.length === gigs.length ? [] : gigs.map(g => g.id));
  };

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || gig.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Gigs</h2>
          <p className="text-muted-foreground">
            Manage your active gigs and create new ones
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => navigate('/seller/create-gig')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
          Active
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Pending Approval  
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Requires Modification
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Draft
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Denied
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Paused
        </button>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter & Search Gigs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gigs by title, category, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                <SelectItem value="Graphics & Design">Graphics & Design</SelectItem>
                <SelectItem value="Programming & Tech">Programming & Tech</SelectItem>
                <SelectItem value="Writing & Translation">Writing & Translation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gigs Table/Cards */}
      {filteredGigs.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="max-w-sm mx-auto">
              <div className="h-24 w-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No gigs found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all" 
                  ? "Try adjusting your filters or search terms"
                  : "Start by creating your first gig to showcase your skills"
                }
              </p>
              <Button 
                onClick={() => navigate('/seller/create-gig')}
                className="bg-primary hover:bg-primary-hover"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Gig
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Gigs ({filteredGigs.length})</CardTitle>
              {selectedGigs.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedGigs.length} selected
                  </span>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedGigs.length === filteredGigs.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Gig</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Cancellations</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGigs.map((gig) => (
                    <TableRow key={gig.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedGigs.includes(gig.id)}
                          onCheckedChange={() => handleSelectGig(gig.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={gig.thumbnail}
                            alt={gig.title}
                            className="h-12 w-12 rounded-lg object-cover bg-muted"
                          />
                          <div>
                            <p className="font-medium text-foreground line-clamp-2 max-w-xs">
                              {gig.title}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">10</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">50</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          {gig.orders}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">0%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(gig.dateUpdated).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GigsManager;