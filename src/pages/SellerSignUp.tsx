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
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  
  // Personal Info State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  
  // Professional Info State
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  
  // Linked Accounts State
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: false,
    facebook: false,
    twitter: false,
    github: false,
    stackoverflow: false
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

  const handleConnect = (platform: string) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: !prev[platform as keyof typeof prev]
    }));
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="professional">Professional Info</TabsTrigger>
                  <TabsTrigger value="linked">Linked Accounts</TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleSubmit}>
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className="h-12 text-base rounded-lg pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
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
                        <h3 className="text-lg font-semibold mb-4">Social Presence</h3>
                        <div className="space-y-3">
                          {[
                            { key: 'google', name: 'Google', icon: '🔍' },
                            { key: 'facebook', name: 'Facebook', icon: '📘' },
                            { key: 'twitter', name: 'Twitter', icon: '🐦' }
                          ].map((account) => (
                            <div key={account.key} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{account.icon}</span>
                                <span className="font-medium">{account.name}</span>
                              </div>
                              <Button
                                type="button"
                                variant={connectedAccounts[account.key as keyof typeof connectedAccounts] ? "default" : "outline"}
                                onClick={() => handleConnect(account.key)}
                                className={connectedAccounts[account.key as keyof typeof connectedAccounts] ? "bg-success hover:bg-success/90" : ""}
                              >
                                {connectedAccounts[account.key as keyof typeof connectedAccounts] ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Connected
                                  </>
                                ) : (
                                  "Connect"
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Professional Presence</h3>
                        <div className="space-y-3">
                          {[
                            { key: 'github', name: 'GitHub', icon: Github },
                            { key: 'stackoverflow', name: 'Stack Overflow', icon: Globe }
                          ].map((account) => (
                            <div key={account.key} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <account.icon className="h-6 w-6" />
                                <span className="font-medium">{account.name}</span>
                              </div>
                              <Button
                                type="button"
                                variant={connectedAccounts[account.key as keyof typeof connectedAccounts] ? "default" : "outline"}
                                onClick={() => handleConnect(account.key)}
                                className={connectedAccounts[account.key as keyof typeof connectedAccounts] ? "bg-success hover:bg-success/90" : ""}
                              >
                                {connectedAccounts[account.key as keyof typeof connectedAccounts] ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Connected
                                  </>
                                ) : (
                                  "Connect"
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg"
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