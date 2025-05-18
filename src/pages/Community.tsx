
import { useState } from "react";
import { ArrowUp, MessageSquare, Search, Share, ThumbsUp, Trending, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";

// Mock posts data
const posts = [
  {
    id: 1,
    username: "trader_max",
    avatar: null,
    time: "2 hours ago",
    content: "Just added NVDA to my portfolio after their recent AI announcements. Thoughts on semiconductor sector performance this quarter?",
    likes: 24,
    comments: 8,
    liked: true
  },
  {
    id: 2,
    username: "investor_kate",
    avatar: null,
    time: "5 hours ago",
    content: "My technical analysis of $TSLA shows a potential breakout pattern. I'm sharing my chart here - what do you all see?",
    likes: 18,
    comments: 12,
    liked: false
  },
  {
    id: 3,
    username: "marketsavvy",
    avatar: null,
    time: "Yesterday",
    content: "Just published my monthly portfolio review with a 12% gain. Main winners were energy stocks and AI-related companies.",
    likes: 45,
    comments: 22,
    liked: false
  }
];

// Mock groups data
const groups = [
  { id: 1, name: "Value Investors", members: 2454, posts: 125 },
  { id: 2, name: "Technical Traders", members: 3211, posts: 298 },
  { id: 3, name: "Crypto Community", members: 5687, posts: 521 },
  { id: 4, name: "Dividend Investors", members: 1876, posts: 87 }
];

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [localPosts, setLocalPosts] = useState(posts);

  const toggleLike = (postId: number) => {
    setLocalPosts(localPosts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } 
        : post
    ));
  };

  // Generate initial letter avatar from username
  const getInitials = (name: string) => {
    return name.split('_')[1]?.[0]?.toUpperCase() || name[0].toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent">Community</h1>
          <p className="text-silver">Connect with traders and share insights</p>
        </div>
        <Button className="gap-2">
          <Share size={16} />
          New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-space p-1">
              <TabsTrigger value="feed" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                <MessageSquare className="h-4 w-4 mr-2" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="trending" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                <Trending className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="groups" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
                <Users className="h-4 w-4 mr-2" />
                Groups
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="animate-fade-in">
              <div className="glass-card p-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-8 w-8 bg-space-accent/20">
                    <span className="text-sm">Y</span>
                  </Avatar>
                  <Input 
                    placeholder="Share a trading insight or ask a question..." 
                    className="bg-space focus-visible:ring-cosmic"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs">Add Chart</Button>
                  <Button size="sm" className="text-xs">Post</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {localPosts.map(post => (
                  <div key={post.id} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-8 w-8 bg-space-light">
                        <span className="text-sm">{getInitials(post.username)}</span>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">@{post.username}</div>
                        <div className="text-xs text-muted-foreground">{post.time}</div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button 
                        className={`flex items-center gap-1 hover:text-cosmic transition-colors ${post.liked ? 'text-cosmic' : ''}`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <ThumbsUp size={14} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-cosmic transition-colors">
                        <MessageSquare size={14} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-cosmic transition-colors ml-auto">
                        <Share size={14} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="animate-fade-in">
              <div className="glass-card p-4">
                <h3 className="font-medium mb-4">Trending Discussions</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-space-light rounded-md flex items-center gap-3">
                    <div className="bg-cosmic/20 p-2 rounded-full">
                      <Trending size={16} className="text-cosmic" />
                    </div>
                    <div>
                      <h4 className="font-medium">FOMC Meeting Impact</h4>
                      <p className="text-sm text-muted-foreground">321 traders discussing</p>
                    </div>
                    <Button size="sm" className="ml-auto">Join</Button>
                  </div>
                  
                  <div className="p-3 border border-space-light rounded-md flex items-center gap-3">
                    <div className="bg-cosmic/20 p-2 rounded-full">
                      <Trending size={16} className="text-cosmic" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Sector Outlook</h4>
                      <p className="text-sm text-muted-foreground">187 traders discussing</p>
                    </div>
                    <Button size="sm" className="ml-auto">Join</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="animate-fade-in">
              <div className="glass-card p-4">
                <h3 className="font-medium mb-4">Trading Communities</h3>
                <div className="space-y-3">
                  {groups.map(group => (
                    <div key={group.id} className="p-3 border border-space-light rounded-md flex items-center gap-3">
                      <div className="bg-space-accent/20 h-10 w-10 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-space-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members • {group.posts} posts this week</p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-auto">Join</Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div>
          <div className="glass-card p-4 mb-4">
            <h3 className="font-medium mb-3">Find Community Members</h3>
            <div className="flex items-center gap-2">
              <Input placeholder="Search by name or tag" className="bg-space focus-visible:ring-cosmic" />
              <Button size="icon">
                <Search size={16} />
              </Button>
            </div>
          </div>
          
          <div className="glass-card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Top Contributors</h3>
              <Button variant="link" size="sm" className="text-xs p-0">See All</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "trader_max", posts: 87, followers: 521 },
                { name: "investor_kate", posts: 63, followers: 345 },
                { name: "marketsavvy", posts: 52, followers: 284 }
              ].map((user, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-space-light">
                    <span className="text-sm">{getInitials(user.name)}</span>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">@{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.posts} posts • {user.followers} followers</div>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto text-xs h-7">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-medium mb-3">Trading Challenges</h3>
            <div className="bg-space-light/40 p-3 rounded-md mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-cosmic/20 p-1 rounded-full">
                  <ArrowUp size={14} className="text-cosmic" />
                </div>
                <h4 className="text-sm font-medium">Weekly Performance</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Beat the market this week to earn badges and ranking points</p>
              <Button size="sm" className="w-full text-xs">Join Challenge</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
