import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthenticatedHeader } from "@/components/AuthenticatedHeader";
import { Footer } from "@/components/Footer";
import { 
  Send,
  Search,
  Paperclip,
  MoreVertical,
  ArrowLeft
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatThread {
  id: string;
  contact: {
    name: string;
    avatar: string;
    initials: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  gigTitle?: string;
}

interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: string;
  delivered?: boolean;
  read?: boolean;
}

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedThread, setSelectedThread] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");

  const [threads] = useState<ChatThread[]>([
    {
      id: "1",
      contact: {
        name: "Max Johnson",
        avatar: "/placeholder.svg",
        initials: "MJ"
      },
      lastMessage: "Thanks for the amazing work on the logo design!",
      timestamp: "2hr",
      unread: 2,
      gigTitle: "Logo Design Project"
    },
    {
      id: "2", 
      contact: {
        name: "Sanya Rodriguez",
        avatar: "/placeholder.svg",
        initials: "SR"
      },
      lastMessage: "When can you deliver the social media graphics?",
      timestamp: "4hr",
      unread: 0,
      gigTitle: "Social Media Package"
    },
    {
      id: "3",
      contact: {
        name: "Alex Chen", 
        avatar: "/placeholder.svg",
        initials: "AC"
      },
      lastMessage: "Perfect! Approved the final revision.",
      timestamp: "1d",
      unread: 0,
      gigTitle: "Website Header Design"
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "other",
      content: "Hi! I'm interested in your logo design service. Can you create something modern and minimalist for my tech startup?",
      timestamp: "Yesterday 2:30 PM"
    },
    {
      id: "2", 
      sender: "me",
      content: "Hello! Absolutely, I'd love to help with your logo design. I specialize in modern, clean designs perfect for tech companies. Could you tell me more about your brand and what style you're looking for?",
      timestamp: "Yesterday 2:45 PM",
      delivered: true,
      read: true
    },
    {
      id: "3",
      sender: "other", 
      content: "Great! The company is called 'InnovateTech' and we focus on AI solutions for small businesses. I'm looking for something that feels trustworthy but also cutting-edge.",
      timestamp: "Yesterday 3:15 PM"
    },
    {
      id: "4",
      sender: "me",
      content: "Perfect! That gives me a great direction to work with. I'll create a few concepts that balance professionalism with innovation. The logo will work well across digital and print media. I can have the first drafts ready within 2-3 days.",
      timestamp: "Yesterday 3:20 PM",
      delivered: true,
      read: true
    },
    {
      id: "5",
      sender: "other",
      content: "Thanks for the amazing work on the logo design!",
      timestamp: "Today 2:15 PM"
    }
  ]);

  const selectedThreadData = threads.find(t => t.id === selectedThread);
  const filteredThreads = threads.filter(thread =>
    thread.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (thread.gigTitle && thread.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Messages 💬</h1>
            <p className="text-muted-foreground">
              Stay connected with your buyers and manage all conversations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Threads Sidebar */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[480px]">
                  <div className="space-y-1 p-4 pt-0">
                    {filteredThreads.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No conversations found</p>
                      </div>
                    ) : (
                      filteredThreads.map((thread) => (
                        <div
                          key={thread.id}
                          onClick={() => setSelectedThread(thread.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedThread === thread.id ? 'bg-muted' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={thread.contact.avatar} />
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {thread.contact.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm truncate">{thread.contact.name}</p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
                                  {thread.unread > 0 && (
                                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                                      {thread.unread}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {thread.gigTitle && (
                                <p className="text-xs text-primary mb-1">{thread.gigTitle}</p>
                              )}
                              <p className="text-sm text-muted-foreground truncate">
                                {thread.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Panel */}
            <Card className="lg:col-span-2">
              {selectedThreadData ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedThreadData.contact.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {selectedThreadData.contact.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{selectedThreadData.contact.name}</h3>
                          {selectedThreadData.gigTitle && (
                            <p className="text-sm text-muted-foreground">{selectedThreadData.gigTitle}</p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <Separator />

                  {/* Messages */}
                  <CardContent className="p-0">
                    <ScrollArea className="h-[380px] p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.sender === 'me'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className={`text-xs ${
                                  message.sender === 'me' 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-muted-foreground'
                                }`}>
                                  {message.timestamp}
                                </span>
                                {message.sender === 'me' && (
                                  <span className="text-xs text-primary-foreground/70">
                                    {message.read ? '✓✓' : message.delivered ? '✓' : '○'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>

                  <Separator />

                  {/* Message Composer */}
                  <div className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        size="sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;