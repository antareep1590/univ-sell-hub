import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  X, 
  Upload, 
  ArrowLeft,
  ArrowRight,
  Save,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronDown,
  Check,
  AlertCircle
} from "lucide-react";

interface Package {
  name: string;
  description: string;
  price: string;
  deliveryTime: string;
  revisions: string;
  features: {
    pageEvaluation: boolean;
    keywordResearch: number;
    socialPosts: number;
    customVideos: boolean;
    customGraphics: boolean;
  };
}

interface AddOn {
  id: string;
  name: string;
  price: string;
  enabled: boolean;
}

interface Question {
  id: string;
  text: string;
  type: "text" | "multiple-choice";
  required: boolean;
  options?: string[];
}

interface GigData {
  title: string;
  category: string;
  subcategory: string;
  serviceType: string;
  tags: string[];
  packages: Package[];
  addOns: AddOn[];
  description: string;
  questions: Question[];
  gallery: {
    video: File | null;
    images: (File | null)[];
    documents: (File | null)[];
  };
}

const CreateGig = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("overview");
  
  const [gigData, setGigData] = useState<GigData>({
    title: "",
    category: "",
    subcategory: "",
    serviceType: "",
    tags: [],
    packages: [
      {
        name: "Basic",
        description: "",
        price: "",
        deliveryTime: "",
        revisions: "",
        features: {
          pageEvaluation: false,
          keywordResearch: 0,
          socialPosts: 0,
          customVideos: false,
          customGraphics: false
        }
      },
      {
        name: "Standard", 
        description: "",
        price: "",
        deliveryTime: "",
        revisions: "",
        features: {
          pageEvaluation: false,
          keywordResearch: 0,
          socialPosts: 0,
          customVideos: false,
          customGraphics: false
        }
      },
      {
        name: "Premium",
        description: "",
        price: "",
        deliveryTime: "",
        revisions: "",
        features: {
          pageEvaluation: false,
          keywordResearch: 0,
          socialPosts: 0,
          customVideos: false,
          customGraphics: false
        }
      }
    ],
    addOns: [
      { id: "fast-delivery", name: "Extra Fast Delivery", price: "", enabled: false },
      { id: "additional-revisions", name: "Additional Revisions", price: "", enabled: false },
      { id: "licensed-videos", name: "Licensed Video Clips ($5 each)", price: "5", enabled: false },
      { id: "licensed-images", name: "Licensed Images ($2 each)", price: "2", enabled: false }
    ],
    description: "",
    questions: [],
    gallery: {
      video: null,
      images: [null, null, null],
      documents: [null, null, null]
    }
  });

  const [tagInput, setTagInput] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [questionRequired, setQuestionRequired] = useState(false);

  const steps = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "pricing", label: "Pricing", icon: Plus },
    { id: "description", label: "Description", icon: FileText },
    { id: "requirements", label: "Requirements", icon: AlertCircle },
    { id: "gallery", label: "Gallery", icon: ImageIcon }
  ];

  const addTag = () => {
    if (tagInput.trim() && !gigData.tags.includes(tagInput.trim())) {
      setGigData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setGigData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const updatePackage = (index: number, field: string, value: any) => {
    setGigData(prev => ({
      ...prev,
      packages: prev.packages.map((pkg, i) => 
        i === index ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  const updatePackageFeature = (index: number, feature: string, value: any) => {
    setGigData(prev => ({
      ...prev,
      packages: prev.packages.map((pkg, i) => 
        i === index ? { ...pkg, features: { ...pkg.features, [feature]: value } } : pkg
      )
    }));
  };

  const addQuestion = () => {
    if (questionText.trim()) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionText,
        type: questionType as "text" | "multiple-choice",
        required: questionRequired
      };
      
      setGigData(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
      }));
      
      setQuestionText("");
      setQuestionType("text");
      setQuestionRequired(false);
    }
  };

  const removeQuestion = (questionId: string) => {
    setGigData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleFileUpload = (type: "video" | "image" | "document", index?: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    if (type === 'video') {
      input.accept = 'video/*';
    } else if (type === 'image') {
      input.accept = 'image/*';
    } else {
      input.accept = '.pdf,.doc,.docx,.ppt,.pptx';
    }
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setGigData(prev => ({
          ...prev,
          gallery: {
            ...prev.gallery,
            [type === 'video' ? 'video' : type === 'image' ? 'images' : 'documents']: 
              type === 'video' ? file : 
              type === 'image' && index !== undefined ?
                prev.gallery.images.map((img, i) => i === index ? file : img) :
              index !== undefined ?
                prev.gallery.documents.map((doc, i) => i === index ? file : doc) :
                prev.gallery.documents
          }
        }));
      }
    };
    
    input.click();
  };

  const canProceed = (step: string) => {
    switch (step) {
      case 'overview':
        return gigData.title && gigData.category && gigData.subcategory;
      case 'pricing':
        return gigData.packages[0].price && gigData.packages[0].deliveryTime;
      case 'description':
        return gigData.description.trim().length > 0;
      case 'requirements':
        return true; // Optional step
      case 'gallery':
        return true; // Can publish without gallery
      default:
        return false;
    }
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const publishGig = () => {
    console.log("Publishing gig:", gigData);
    // Handle gig publishing logic here
    navigate('/seller/my-gigs');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Create a New Gig</h1>
            <p className="text-muted-foreground">
              Showcase your skills and attract buyers with a compelling gig
            </p>
          </div>

          <Card className="border-card-border shadow-lg">
            <CardContent className="p-0">
              {/* Progress Tabs */}
              <div className="border-b border-border">
                <div className="flex overflow-x-auto">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                          isActive 
                            ? 'border-primary text-primary bg-primary/5' 
                            : isCompleted
                            ? 'border-success text-success'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {step.label}
                        {isCompleted && <Check className="h-4 w-4 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {/* Overview Step */}
                {currentStep === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Gig Overview</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Gig Title</Label>
                          <Input
                            id="title"
                            placeholder="I will create stunning social media content for your brand"
                            value={gigData.title}
                            onChange={(e) => setGigData(prev => ({ ...prev, title: e.target.value }))}
                            className="mt-1"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Describe what you're offering - max 80 characters
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Category</Label>
                            <Select 
                              value={gigData.category} 
                              onValueChange={(value) => setGigData(prev => ({ ...prev, category: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                <SelectItem value="Graphics & Design">Graphics & Design</SelectItem>
                                <SelectItem value="Programming & Tech">Programming & Tech</SelectItem>
                                <SelectItem value="Writing & Translation">Writing & Translation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Sub-category</Label>
                            <Select 
                              value={gigData.subcategory} 
                              onValueChange={(value) => setGigData(prev => ({ ...prev, subcategory: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select sub-category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Social Media">Social Media</SelectItem>
                                <SelectItem value="SEO">SEO</SelectItem>
                                <SelectItem value="Content Marketing">Content Marketing</SelectItem>
                                <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Service Type</Label>
                          <Select 
                            value={gigData.serviceType} 
                            onValueChange={(value) => setGigData(prev => ({ ...prev, serviceType: value }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Social Content">Social Content</SelectItem>
                              <SelectItem value="Strategy Development">Strategy Development</SelectItem>
                              <SelectItem value="Account Management">Account Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Tags</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder="Add a tag"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addTag()}
                            />
                            <Button type="button" variant="outline" onClick={addTag}>
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {gigData.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                {tag}
                                <X 
                                  className="h-3 w-3 cursor-pointer" 
                                  onClick={() => removeTag(tag)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing Step */}
                {currentStep === "pricing" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Pricing Packages</h2>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {gigData.packages.map((pkg, index) => (
                          <Card key={index} className="border-2">
                            <CardHeader>
                              <CardTitle className="text-center">{pkg.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <Label>Package Description</Label>
                                <Textarea
                                  placeholder="Brief description"
                                  value={pkg.description}
                                  onChange={(e) => updatePackage(index, 'description', e.target.value)}
                                  rows={3}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label>Price ($)</Label>
                                  <Input
                                    type="number"
                                    placeholder="25"
                                    value={pkg.price}
                                    onChange={(e) => updatePackage(index, 'price', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label>Delivery</Label>
                                  <Select 
                                    value={pkg.deliveryTime} 
                                    onValueChange={(value) => updatePackage(index, 'deliveryTime', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Days" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 Day</SelectItem>
                                      <SelectItem value="2">2 Days</SelectItem>
                                      <SelectItem value="3">3 Days</SelectItem>
                                      <SelectItem value="7">1 Week</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label>Revisions</Label>
                                <Select 
                                  value={pkg.revisions} 
                                  onValueChange={(value) => updatePackage(index, 'revisions', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Number" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 Revision</SelectItem>
                                    <SelectItem value="2">2 Revisions</SelectItem>
                                    <SelectItem value="3">3 Revisions</SelectItem>
                                    <SelectItem value="unlimited">Unlimited</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Package Features */}
                              <div className="space-y-3 pt-2 border-t">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">Page Evaluation</Label>
                                  <Checkbox
                                    checked={pkg.features.pageEvaluation}
                                    onCheckedChange={(checked) => 
                                      updatePackageFeature(index, 'pageEvaluation', checked)
                                    }
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">Keyword Research</Label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    className="w-16 h-8"
                                    value={pkg.features.keywordResearch}
                                    onChange={(e) => 
                                      updatePackageFeature(index, 'keywordResearch', parseInt(e.target.value) || 0)
                                    }
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">Social Posts</Label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    className="w-16 h-8"
                                    value={pkg.features.socialPosts}
                                    onChange={(e) => 
                                      updatePackageFeature(index, 'socialPosts', parseInt(e.target.value) || 0)
                                    }
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">Custom Videos</Label>
                                  <Checkbox
                                    checked={pkg.features.customVideos}
                                    onCheckedChange={(checked) => 
                                      updatePackageFeature(index, 'customVideos', checked)
                                    }
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <Label className="text-sm">Custom Graphics</Label>
                                  <Checkbox
                                    checked={pkg.features.customGraphics}
                                    onCheckedChange={(checked) => 
                                      updatePackageFeature(index, 'customGraphics', checked)
                                    }
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Add-on Services */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Add-on Services</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              {gigData.addOns.map((addon) => (
                                <div key={addon.id} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <Checkbox
                                      checked={addon.enabled}
                                      onCheckedChange={(checked) => {
                                        setGigData(prev => ({
                                          ...prev,
                                          addOns: prev.addOns.map(a => 
                                            a.id === addon.id ? { ...a, enabled: !!checked } : a
                                          )
                                        }));
                                      }}
                                    />
                                    <Label>{addon.name}</Label>
                                  </div>
                                  {addon.enabled && !addon.id.includes('licensed') && (
                                    <Input
                                      type="number"
                                      placeholder="Price"
                                      className="w-24"
                                      value={addon.price}
                                      onChange={(e) => {
                                        setGigData(prev => ({
                                          ...prev,
                                          addOns: prev.addOns.map(a => 
                                            a.id === addon.id ? { ...a, price: e.target.value } : a
                                          )
                                        }));
                                      }}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description Step */}
                {currentStep === "description" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Gig Description</h2>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your service in detail. What will you deliver? What makes your service unique?"
                          value={gigData.description}
                          onChange={(e) => setGigData(prev => ({ ...prev, description: e.target.value }))}
                          rows={12}
                          className="mt-2"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Write a clear, detailed description of your service to attract the right buyers.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Requirements Step */}
                {currentStep === "requirements" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Buyer Requirements</h2>
                      
                      {/* Preset Questions */}
                      <div className="space-y-4 mb-6">
                        <h3 className="font-medium">Common Questions</h3>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium">
                                  Is this order for personal, business use, or side project?
                                </Label>
                                <RadioGroup className="mt-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="personal" id="personal" />
                                    <Label htmlFor="personal">Personal</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="business" id="business" />
                                    <Label htmlFor="business">Business</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="side-project" id="side-project" />
                                    <Label htmlFor="side-project">Side Project</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Custom Questions */}
                      <div>
                        <h3 className="font-medium mb-4">Add Custom Questions</h3>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div>
                                <Label>Question Text</Label>
                                <Input
                                  placeholder="What are you looking to achieve?"
                                  value={questionText}
                                  onChange={(e) => setQuestionText(e.target.value)}
                                />
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="required"
                                    checked={questionRequired}
                                    onCheckedChange={(checked) => setQuestionRequired(!!checked)}
                                  />
                                  <Label htmlFor="required" className="text-sm">Required</Label>
                                </div>
                                
                                <Select value={questionType} onValueChange={setQuestionType}>
                                  <SelectTrigger className="w-48">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Free Text</SelectItem>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex space-x-2">
                                <Button 
                                  type="button" 
                                  onClick={addQuestion}
                                  disabled={!questionText.trim()}
                                >
                                  Add Question
                                </Button>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  onClick={() => {
                                    setQuestionText("");
                                    setQuestionType("text");
                                    setQuestionRequired(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Added Questions */}
                        {gigData.questions.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-medium mb-3">Your Questions</h4>
                            <div className="space-y-3">
                              {gigData.questions.map((question) => (
                                <Card key={question.id}>
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{question.text}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                          <Badge variant="outline" className="text-xs">
                                            {question.type === 'text' ? 'Free Text' : 'Multiple Choice'}
                                          </Badge>
                                          {question.required && (
                                            <Badge variant="outline" className="text-xs bg-destructive/10">
                                              Required
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeQuestion(question.id)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Gallery Step */}
                {currentStep === "gallery" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Showcase Your Service</h2>
                      <p className="text-muted-foreground mb-6">
                        Encourage buyers to choose your gig by featuring a variety of your work.
                      </p>

                      {/* Video Upload */}
                      <div className="mb-8">
                        <Label className="text-lg font-medium">Video</Label>
                        <p className="text-sm text-muted-foreground mb-3">
                          Capture buyers' attention with a video that showcases your service
                        </p>
                        
                        <Card 
                          className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => handleFileUpload('video')}
                        >
                          <CardContent className="p-8 text-center">
                            {gigData.gallery.video ? (
                              <div>
                                <Video className="h-12 w-12 mx-auto mb-3 text-primary" />
                                <p className="font-medium">{gigData.gallery.video.name}</p>
                                <p className="text-sm text-muted-foreground">Click to replace</p>
                              </div>
                            ) : (
                              <div>
                                <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                                <p className="font-medium">Upload Video</p>
                                <p className="text-sm text-muted-foreground">Browse or drag and drop</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Images Upload */}
                      <div className="mb-8">
                        <Label className="text-lg font-medium">Images</Label>
                        <p className="text-sm text-muted-foreground mb-3">
                          Show examples of your work (up to 3 images)
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {gigData.gallery.images.map((image, index) => (
                            <Card 
                              key={index}
                              className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer aspect-square"
                              onClick={() => handleFileUpload('image', index)}
                            >
                              <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                                {image ? (
                                  <div>
                                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-sm font-medium">{image.name}</p>
                                    <p className="text-xs text-muted-foreground">Click to replace</p>
                                  </div>
                                ) : (
                                  <div>
                                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm">Upload Image</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Documents Upload */}
                      <div>
                        <Label className="text-lg font-medium">Documents</Label>
                        <p className="text-sm text-muted-foreground mb-3">
                          Share PDF portfolios, presentations, or other documents
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {gigData.gallery.documents.map((doc, index) => (
                            <Card 
                              key={index}
                              className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
                              onClick={() => handleFileUpload('document', index)}
                            >
                              <CardContent className="p-6 text-center">
                                {doc ? (
                                  <div>
                                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <p className="text-sm font-medium">{doc.name}</p>
                                    <p className="text-xs text-muted-foreground">Click to replace</p>
                                  </div>
                                ) : (
                                  <div>
                                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm">Upload Document</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === "overview"}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    
                    {currentStep === "gallery" ? (
                      <Button onClick={publishGig} className="bg-primary hover:bg-primary-hover">
                        Publish Gig
                      </Button>
                    ) : (
                      <Button 
                        onClick={nextStep}
                        disabled={!canProceed(currentStep)}
                        className="bg-primary hover:bg-primary-hover"
                      >
                        Save & Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateGig;