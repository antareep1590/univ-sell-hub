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
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  Image as ImageIcon
} from "lucide-react";

interface Gig {
  id: string;
  title: string;
  category: string;
  image: string;
  views: number;
  clicks: number;
  orders: number;
  status: "active" | "paused" | "pending" | "denied" | "draft";
  tags: string[];
  price: number;
}

const MyGigs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const [gigs] = useState<Gig[]>([
    {
      id: "1",
      title: "I will create stunning social media designs",
      category: "Graphic Design",
      image: "/placeholder.svg",
      views: 1250,
      clicks: 85,
      orders: 12,
      status: "active",
      tags: ["Instagram", "Facebook", "Brand Design"],
      price: 25
    },
    {
      id: "2",
      title: "I will write engaging blog posts and articles",
      category: "Content Writing", 
      image: "/placeholder.svg",
      views: 890,
      clicks: 62,
      orders: 8,
      status: "active",
      tags: ["Blog", "SEO", "Content"],
      price: 35
    },
    {
      id: "3",
      title: "I will tutor math and physics for students",
      category: "Tutoring",
      image: "/placeholder.svg", 
      views: 650,
      clicks: 45,
      orders: 15,
      status: "paused",
      tags: ["Math", "Physics", "Online"],
      price: 20
    },
    {
      id: "4",
      title: "I will develop responsive web applications",
      category: "Programming",
      image: "/placeholder.svg",
      views: 430,
      clicks: 28,
      orders: 5,
      status: "draft",
      tags: ["React", "JavaScript", "Web Dev"],
      price: 75
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-success text-success-foreground",
      paused: "bg-muted text-muted-foreground",
      pending: "bg-warning text-warning-foreground",
      denied: "bg-destructive text-destructive-foreground",
      draft: "bg-secondary text-secondary-foreground"
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: <Play className="h-3 w-3" />,
      paused: <Pause className="h-3 w-3" />,
      pending: "⏳",
      denied: "❌", 
      draft: "📝"
    };
    return icons[status as keyof typeof icons];
  };

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || gig.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">My Gigs Gallery 🎨</h1>
                <p className="text-muted-foreground">
                  Showcase your amazing skills to the world!
                </p>
              </div>
              <Link to="/seller/create-gig">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground h-12 px-6 rounded-lg shadow-lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Gig ✨
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your gigs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-lg"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 h-12 rounded-lg">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">🟢 Active</SelectItem>
                  <SelectItem value="paused">⏸️ Paused</SelectItem>
                  <SelectItem value="pending">⏳ Pending</SelectItem>
                  <SelectItem value="draft">📝 Draft</SelectItem>
                  <SelectItem value="denied">❌ Denied</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 h-12 rounded-lg">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Graphic Design">🎨 Design</SelectItem>
                  <SelectItem value="Content Writing">✍️ Writing</SelectItem>
                  <SelectItem value="Programming">💻 Programming</SelectItem>
                  <SelectItem value="Tutoring">📚 Tutoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGigs.map((gig) => (
              <Card key={gig.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-card-border rounded-xl overflow-hidden">
                <div className="relative">
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                    {gig.image ? (
                      <img 
                        src={gig.image} 
                        alt={gig.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    )}
                    
                    {/* Status badge */}
                    <Badge 
                      className={`absolute top-2 left-2 ${getStatusColor(gig.status)} flex items-center gap-1 text-xs font-medium`}
                    >
                      {getStatusIcon(gig.status)}
                      {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                    </Badge>
                    
                    {/* Quick actions overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Link to={`/seller/view-gig/${gig.id}`}>
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="rounded-full">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Title and Price */}
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2 text-foreground leading-tight">
                        {gig.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{gig.category}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {gig.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs py-0 px-2">
                          {tag}
                        </Badge>
                      ))}
                      {gig.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs py-0 px-2">
                          +{gig.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center justify-center bg-muted rounded p-2">
                        <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="font-medium">{gig.views}</span>
                      </div>
                      <div className="flex items-center justify-center bg-muted rounded p-2">
                        <span className="text-muted-foreground">★</span>
                        <span className="font-medium ml-1">4.9</span>
                      </div>
                      <div className="flex items-center justify-center bg-muted rounded p-2">
                        <span className="font-medium">{gig.orders} orders</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-lg font-bold text-primary">
                        ${gig.price}
                      </div>
                      <div className="flex space-x-1">
                        <Link to={`/seller/view-gig/${gig.id}`}>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg" title="View">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg" title="Edit">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg" title="Duplicate">
                          <span className="text-xs">⧉</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant={gig.status === 'active' ? 'secondary' : 'default'}
                          className="h-8 w-8 p-0 rounded-lg"
                          title={gig.status === 'active' ? 'Pause' : 'Activate'}
                        >
                          {gig.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0 rounded-lg" title="Delete">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGigs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No gigs found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your search filters"
                  : "Create your first gig to get started!"}
              </p>
              {!searchQuery && statusFilter === "all" && categoryFilter === "all" && (
                <Link to="/seller/create-gig">
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Gig
                  </Button>
                </Link>
              )}
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-6 right-6 md:hidden">
            <Link to="/seller/create-gig">
              <Button 
                size="lg" 
                className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyGigs;