import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Video
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
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/seller/edit-gig/${gigData.id}`)}
                >
                  Edit Gig
                </Button>
              </div>
            </div>
          </div>

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

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Buyer Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Requirements Template */}
                  <div>
                    <h3 className="font-medium text-foreground mb-4">Questions for Buyers</h3>
                    <div className="space-y-4">
                      {gigData.requirements.map((req, index) => (
                        <div key={index} className="border-b border-border pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">{req.question}</h4>
                            {req.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Type: {req.type.replace('_', ' ')}
                            {req.options && ` (Options: ${req.options.join(', ')})`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buyer Responses */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium text-foreground mb-4">Buyer Responses</h3>
                    <div className="space-y-6">
                      {/* Mock buyer responses */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs">MJ</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Max Johnson</h4>
                            <p className="text-sm text-muted-foreground">Order #1234 • Completed</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">What is your brand/business name?</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded p-2">InnovateTech Solutions</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">What social media platforms do you need graphics for?</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded p-2">Instagram, LinkedIn, Twitter</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Do you have brand colors or a logo to include?</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded p-2">Yes, primary colors are blue (#1a73e8) and white. Logo attached in files.</p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs">SR</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Sanya Rodriguez</h4>
                            <p className="text-sm text-muted-foreground">Order #1235 • In Progress</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">What is your brand/business name?</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded p-2">Mindful Wellness Studio</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">What social media platforms do you need graphics for?</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded p-2">Instagram, Facebook</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Do you have brand colors or a logo to include?</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded p-2">Soft greens and earth tones. No logo yet, but prefer minimalist design.</p>
                          </div>
                        </div>
                      </div>
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