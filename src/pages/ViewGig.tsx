import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft,
  Star,
  Clock,
  Users,
  Eye,
  Heart,
  FileText,
  Image as ImageIcon,
  Video,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface GigData {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
  basicPrice: number;
  basicDelivery: number;
  basicRevisions: number;
  basicFeatures: string[];
  requirements: Array<{
    question: string;
    type: 'text' | 'multiple_choice' | 'file';
    required: boolean;
    options?: string[];
  }>;
  bannerImage?: string;
  gallery: Array<{
    type: 'image' | 'video';
    url: string;
    title?: string;
  }>;
  ratings: number;
  totalOrders: number;
  views: number;
  status: 'active' | 'paused' | 'draft';
}

const ViewGig = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enquiriesPage, setEnquiriesPage] = useState(1);
  const enquiriesPerPage = 5;

  // Mock buyer enquiries data
  const [buyerEnquiries] = useState([
    {
      id: "1",
      buyer: "Max Johnson",
      orderId: "1234",
      status: "Completed",
      avatar: "MJ",
      date: "2024-01-15",
      responses: {
        "What is your brand/business name?": "InnovateTech Solutions",
        "What social media platforms do you need graphics for?": "Instagram, LinkedIn, Twitter",
        "Do you have brand colors or a logo to include?": "Yes, primary colors are blue (#1a73e8) and white. Logo attached in files."
      }
    },
    {
      id: "2", 
      buyer: "Sanya Rodriguez",
      orderId: "1235",
      status: "In Progress",
      avatar: "SR",
      date: "2024-01-18",
      responses: {
        "What is your brand/business name?": "Mindful Wellness Studio",
        "What social media platforms do you need graphics for?": "Instagram, Facebook",
        "Do you have brand colors or a logo to include?": "Soft greens and earth tones. No logo yet, but prefer minimalist design."
      }
    },
    // Add more mock data for pagination testing
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 3}`,
      buyer: `Buyer ${i + 3}`,
      orderId: `123${i + 6}`,
      status: ["Completed", "In Progress", "Delivered"][i % 3],
      avatar: `B${i + 3}`,
      date: `2024-01-${20 + i}`,
      responses: {
        "What is your brand/business name?": `Brand Name ${i + 3}`,
        "What social media platforms do you need graphics for?": "Instagram, Facebook",
        "Do you have brand colors or a logo to include?": `Brand details ${i + 3}`
      }
    }))
  ]);

  const totalEnquiries = buyerEnquiries.length;
  const totalPages = Math.ceil(totalEnquiries / enquiriesPerPage);
  const startIndex = (enquiriesPage - 1) * enquiriesPerPage;
  const paginatedEnquiries = buyerEnquiries.slice(startIndex, startIndex + enquiriesPerPage);

  // Mock data - in real app this would come from an API
  const [gigData] = useState<GigData>({
    id: id || "1",
    title: "I will create stunning social media graphics for your brand",
    category: "Graphics & Design",
    subcategory: "Social Media Design",
    tags: ["social media", "graphics", "branding", "instagram", "facebook"],
    description: "I will create eye-catching social media graphics that help your brand stand out. With 3+ years of experience in graphic design and a deep understanding of social media trends, I'll deliver professional designs that engage your audience and drive results.\n\nWhat you'll get:\n• Custom designs tailored to your brand\n• High-resolution files ready for posting\n• Multiple format options (Instagram, Facebook, Twitter, etc.)\n• Unlimited revisions until you're satisfied\n• Fast delivery within 2-3 days\n\nPerfect for businesses, influencers, and content creators looking to elevate their social media presence!",
    basicPrice: 25,
    basicDelivery: 3,
    basicRevisions: 2,
    basicFeatures: [
      "3 social media graphics",
      "High-resolution files",
      "Commercial use rights",
      "2 revisions included"
    ],
    bannerImage: '/placeholder.svg',
    requirements: [
      {
        question: "What is your brand/business name?",
        type: 'text',
        required: true
      },
      {
        question: "What social media platforms do you need graphics for?",
        type: 'multiple_choice',
        required: true,
        options: ["Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok"]
      },
      {
        question: "Do you have brand colors or a logo to include?",
        type: 'text',
        required: false
      },
      {
        question: "Please upload any reference images or existing brand materials",
        type: 'file',
        required: false
      }
    ],
    gallery: [
      {
        type: 'image',
        url: '/placeholder.svg',
        title: 'Social Media Graphics Sample 1'
      },
      {
        type: 'image', 
        url: '/placeholder.svg',
        title: 'Social Media Graphics Sample 2'
      },
      {
        type: 'image',
        url: '/placeholder.svg', 
        title: 'Brand Design Portfolio'
      }
    ],
    ratings: 4.9,
    totalOrders: 157,
    views: 2340,
    status: 'active'
  });

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

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/seller/my-gigs')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Gigs
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">View Gig</h1>
                <p className="text-muted-foreground">
                  Review your gig details and performance
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {getStatusBadge(gigData.status)}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Enquiries ({totalEnquiries})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Buyer Enquiries</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-4">
                        {paginatedEnquiries.map((enquiry) => (
                          <div key={enquiry.id} className="border rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xs">{enquiry.avatar}</span>
                              </div>
                              <div>
                                <h4 className="font-medium">{enquiry.buyer}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Order #{enquiry.orderId} • {enquiry.status} • {enquiry.date}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              {Object.entries(enquiry.responses).map(([question, answer]) => (
                                <div key={question}>
                                  <p className="text-sm font-medium text-foreground mb-1">{question}</p>
                                  <p className="text-sm text-muted-foreground bg-muted rounded p-2">{answer}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Showing {startIndex + 1}-{Math.min(startIndex + enquiriesPerPage, totalEnquiries)} of {totalEnquiries} enquiries
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEnquiriesPage(prev => Math.max(1, prev - 1))}
                            disabled={enquiriesPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-sm">{enquiriesPage} of {totalPages}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEnquiriesPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={enquiriesPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/seller/edit-gig/${gigData.id}`)}
                >
                  Edit Gig
                </Button>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          {gigData.bannerImage && (
            <div className="mb-8">
              <div className="relative aspect-[3/1] bg-muted rounded-lg overflow-hidden">
                <img
                  src={gigData.bannerImage}
                  alt="Gig banner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Gig Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">{gigData.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {gigData.views.toLocaleString()} views
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {gigData.totalOrders} orders
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-warning" />
                        {gigData.ratings}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Category</h3>
                    <p className="text-muted-foreground">{gigData.category} &gt; {gigData.subcategory}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {gigData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Description</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {gigData.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Basic Package</h3>
                      <span className="text-2xl font-bold text-primary">${gigData.basicPrice}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{gigData.basicDelivery} days delivery</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{gigData.basicRevisions} revisions</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">What's included:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {gigData.basicFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle>Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {gigData.gallery.map((item, index) => (
                      <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title || `Gallery item ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          {item.type === 'video' ? (
                            <Video className="h-5 w-5 text-white" />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <span className="font-medium">{gigData.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Orders</span>
                    <span className="font-medium">{gigData.totalOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-warning mr-1" />
                      <span className="font-medium">{gigData.ratings}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium">6.7%</span>
                  </div>
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

export default ViewGig;