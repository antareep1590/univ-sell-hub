import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Plus, 
  X, 
  Upload, 
  Eye, 
  EyeOff, 
  CheckCircle,
  Github,
  Globe
} from "lucide-react";

interface Skill {
  name: string;
  level: string;
}

interface Language {
  name: string;
  level: string;
}

interface Education {
  college: string;
  country: string;
  title: string;
  major: string;
  year: string;
}

const SellerSignUp = () => {
  const [activeTab, setActiveTab] = useState("quickstart");
  const [showPassword, setShowPassword] = useState(false);
  const [signedUpWith, setSignedUpWith] = useState<'google' | 'microsoft' | null>(null);
  
  // Personal Info State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  
  // Professional Info State
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  
  // Linked Accounts State - now using direct input links
  const [linkedAccounts, setLinkedAccounts] = useState({
    linkedin: "",
    github: "",
    twitter: "",
    behance: "",
    portfolio: ""
  });
  
  // Account Security State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addSkill = () => {
    setSkills([...skills, { name: "", level: "" }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: "", level: "" }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  const addEducation = () => {
    setEducation([...education, { college: "", country: "", title: "", major: "", year: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const handleLinkedAccountChange = (platform: string, value: string) => {
    setLinkedAccounts(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleOAuthSignUp = (provider: 'google' | 'microsoft') => {
    // Simulate OAuth sign-up - in reality this would redirect to OAuth provider
    setSignedUpWith(provider);
    
    // Pre-fill with simulated data from OAuth provider
    if (provider === 'google') {
      setFirstName("John");
      setLastName("Doe");
      setEmail("john.doe@gmail.com");
    } else if (provider === 'microsoft') {
      setFirstName("Jane");
      setLastName("Smith");
      setEmail("jane.smith@outlook.com");
    }
    
    // Move to personal info tab
    setActiveTab("personal");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard without validation
    window.location.href = "/seller/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* College-style header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Join the Student Community!</h1>
            <p className="text-muted-foreground">Let's set up your profile to showcase your amazing skills</p>
          </div>
          
          <Card className="border-card-border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-foreground">
                Student Profile Setup
              </CardTitle>
            </CardHeader>
            
            <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="professional">Professional Info</TabsTrigger>
                  <TabsTrigger value="linked">Linked Accounts</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
                  {/* Quick Start Tab */}
                  <TabsContent value="quickstart" className="space-y-6 mt-6">
                    <div className="text-center space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">Welcome to Univ Jobs! 🎉</h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                          Sign up instantly using your Google or Microsoft account. We'll securely pre-fill your details to get you started faster!
                        </p>
                      </div>
                      
                      <div className="space-y-4 max-w-md mx-auto">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="w-full h-14 text-base border-2 hover:bg-muted/50"
                          onClick={() => handleOAuthSignUp('google')}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">G</span>
                            </div>
                            <span>Sign up with Google</span>
                          </div>
                        </Button>
                        
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="w-full h-14 text-base border-2 hover:bg-muted/50"
                          onClick={() => handleOAuthSignUp('microsoft')}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">M</span>
                            </div>
                            <span>Sign up with Microsoft</span>
                          </div>
                        </Button>
                      </div>
                      
                    </div>
                  </TabsContent>

                  {/* Personal Info Tab */}
                  <TabsContent value="personal" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Samarth"
                          className="h-12 text-base rounded-lg"
                          readOnly={signedUpWith !== null}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nasula"
                          className="h-12 text-base rounded-lg"
                          readOnly={signedUpWith !== null}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@university.edu"
                          className="h-12 text-base rounded-lg"
                          readOnly={signedUpWith !== null}
                        />
                      </div>
                      
                      {signedUpWith && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span>Signed up with {signedUpWith === 'google' ? 'Google' : 'Microsoft'} - no password required</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Profile Picture</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                          {profilePicture ? (
                            <img 
                              src={URL.createObjectURL(profilePicture)} 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('profilePic')?.click()}
                          className="rounded-lg"
                        >
                          📸 Upload Photo
                        </Button>
                        <input
                          id="profilePic"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself and your skills... 🚀"
                        rows={4}
                        className="rounded-lg resize-none"
                      />
                      <p className="text-xs text-muted-foreground">Share what makes you unique as a student!</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Languages</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addLanguage}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Language
                        </Button>
                      </div>
                      {languages.map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Select 
                            value={language.name} 
                            onValueChange={(value) => updateLanguage(index, 'name', value)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                              <SelectItem value="chinese">Chinese</SelectItem>
                              <SelectItem value="hindi">Hindi</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select 
                            value={language.level} 
                            onValueChange={(value) => updateLanguage(index, 'level', value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="conversational">Conversational</SelectItem>
                              <SelectItem value="fluent">Fluent</SelectItem>
                              <SelectItem value="native">Native</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLanguage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Professional Info Tab */}
                  <TabsContent value="professional" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Skills</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addSkill}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Skill
                        </Button>
                      </div>
                      {skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Select 
                            value={skill.name} 
                            onValueChange={(value) => updateSkill(index, 'name', value)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select skill" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="design">Graphic Design</SelectItem>
                              <SelectItem value="writing">Content Writing</SelectItem>
                              <SelectItem value="marketing">Digital Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select 
                            value={skill.level} 
                            onValueChange={(value) => updateSkill(index, 'level', value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Education</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Education
                        </Button>
                      </div>
                      {education.map((edu, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>College/University</Label>
                              <Input
                                value={edu.college}
                                onChange={(e) => updateEducation(index, 'college', e.target.value)}
                                placeholder="IIT Kharagpur"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Country</Label>
                              <Input
                                value={edu.country}
                                onChange={(e) => updateEducation(index, 'country', e.target.value)}
                                placeholder="India"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                value={edu.title}
                                onChange={(e) => updateEducation(index, 'title', e.target.value)}
                                placeholder="Masters"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Major</Label>
                              <Input
                                value={edu.major}
                                onChange={(e) => updateEducation(index, 'major', e.target.value)}
                                placeholder="Machine Learning"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Year</Label>
                              <Input
                                value={edu.year}
                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                placeholder="2023"
                              />
                            </div>
                            <div className="flex items-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEducation(index)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Linked Accounts Tab */}
                  <TabsContent value="linked" className="space-y-6 mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Link Your Accounts</h3>
                        <p className="text-muted-foreground mb-6">
                          Add links to your professional and social accounts to showcase your presence
                        </p>
                        
                        <div className="space-y-6">
                          {/* LinkedIn */}
                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center">
                              <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">in</span>
                              </div>
                              LinkedIn Profile
                            </Label>
                            <Input
                              id="linkedin"
                              value={linkedAccounts.linkedin}
                              onChange={(e) => handleLinkedAccountChange('linkedin', e.target.value)}
                              placeholder="https://linkedin.com/in/your-profile"
                              className="h-12"
                            />
                            {linkedAccounts.linkedin && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-blue-600 border-blue-200">
                                  <a href={linkedAccounts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    View Profile →
                                  </a>
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* GitHub */}
                          <div className="space-y-2">
                            <Label htmlFor="github" className="text-sm font-medium flex items-center">
                              <Github className="w-5 h-5 mr-2" />
                              GitHub Profile
                            </Label>
                            <Input
                              id="github"
                              value={linkedAccounts.github}
                              onChange={(e) => handleLinkedAccountChange('github', e.target.value)}
                              placeholder="https://github.com/your-username"
                              className="h-12"
                            />
                            {linkedAccounts.github && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-gray-800 border-gray-200">
                                  <a href={linkedAccounts.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    View Profile →
                                  </a>
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Twitter */}
                          <div className="space-y-2">
                            <Label htmlFor="twitter" className="text-sm font-medium flex items-center">
                              <div className="w-5 h-5 bg-blue-400 rounded-full mr-2 flex items-center justify-center">
                                <span className="text-white text-xs">𝕏</span>
                              </div>
                              Twitter/X Profile
                            </Label>
                            <Input
                              id="twitter"
                              value={linkedAccounts.twitter}
                              onChange={(e) => handleLinkedAccountChange('twitter', e.target.value)}
                              placeholder="https://twitter.com/your-username"
                              className="h-12"
                            />
                            {linkedAccounts.twitter && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-blue-400 border-blue-100">
                                  <a href={linkedAccounts.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    View Profile →
                                  </a>
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Behance */}
                          <div className="space-y-2">
                            <Label htmlFor="behance" className="text-sm font-medium flex items-center">
                              <div className="w-5 h-5 bg-blue-500 rounded mr-2 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">Be</span>
                              </div>
                              Behance Portfolio
                            </Label>
                            <Input
                              id="behance"
                              value={linkedAccounts.behance}
                              onChange={(e) => handleLinkedAccountChange('behance', e.target.value)}
                              placeholder="https://behance.net/your-profile"
                              className="h-12"
                            />
                            {linkedAccounts.behance && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-blue-500 border-blue-100">
                                  <a href={linkedAccounts.behance} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    View Portfolio →
                                  </a>
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Personal Portfolio */}
                          <div className="space-y-2">
                            <Label htmlFor="portfolio" className="text-sm font-medium flex items-center">
                              <Globe className="w-5 h-5 mr-2" />
                              Personal Portfolio/Website
                            </Label>
                            <Input
                              id="portfolio"
                              value={linkedAccounts.portfolio}
                              onChange={(e) => handleLinkedAccountChange('portfolio', e.target.value)}
                              placeholder="https://your-website.com"
                              className="h-12"
                            />
                            {linkedAccounts.portfolio && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-green-600 border-green-100">
                                  <a href={linkedAccounts.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    Visit Website →
                                  </a>
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg"
                        >
                          Create Account & Start Earning! 🎉
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </form>
              </Tabs>

              <div className="text-center mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/seller/signin" className="text-primary hover:underline font-medium">
                    Sign in here!
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerSignUp;