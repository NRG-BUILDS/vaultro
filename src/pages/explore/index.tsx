
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Users, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Explore() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Explore</h1>
            <p className="text-muted-foreground">Discover trending content, sounds, and creators</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 w-full sm:w-[250px]" />
          </div>
        </div>

        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="sounds">Sounds</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Popular topics on TikTok right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "Summer Fashion", posts: "1.2M", growth: "+24%" },
                    { name: "Dance Challenge", posts: "856K", growth: "+18%" },
                    { name: "Cooking Hacks", posts: "743K", growth: "+15%" },
                    { name: "DIY Projects", posts: "592K", growth: "+9%" },
                    { name: "Fitness Tips", posts: "487K", growth: "+12%" },
                    { name: "Life Hacks", posts: "329K", growth: "+7%" },
                  ].map((topic, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">#{topic.name}</h3>
                          <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800">
                            {topic.growth}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Videos</CardTitle>
                <CardDescription>Popular videos that are gaining traction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-[9/16] bg-muted rounded-md flex items-center justify-center relative">
                        <TrendingUp className="h-12 w-12 text-muted-foreground" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 dark:from-black/80 to-transparent p-3">
                          <p className="text-white text-sm line-clamp-2">How I grew my TikTok to 100K followers in 30 days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-muted rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">@creator{i + 1}</p>
                          <p className="text-xs text-muted-foreground">{(i + 1) * 150}K views</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sounds">
            <Card>
              <CardHeader>
                <CardTitle>Trending Sounds</CardTitle>
                <CardDescription>Popular audio tracks on TikTok right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                        <Music className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Original Sound - Artist Name {i + 1}</h3>
                        <p className="text-sm text-muted-foreground">Used in {(i + 1) * 125}K videos</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creators">
            <Card>
              <CardHeader>
                <CardTitle>Popular Creators</CardTitle>
                <CardDescription>Rising TikTok creators in your niche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-12 w-12 bg-muted rounded-full"></div>
                          <div>
                            <h3 className="font-medium">@creator{i + 1}</h3>
                            <p className="text-xs text-muted-foreground">{(i + 1) * 50}K followers</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">Lifestyle</Badge>
                          <Badge variant="outline">Fashion</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="aspect-square bg-muted rounded-md"></div>
                          <div className="aspect-square bg-muted rounded-md"></div>
                          <div className="aspect-square bg-muted rounded-md"></div>
                        </div>
                        <div className="mt-3 flex justify-between text-sm">
                          <span>Avg. Views: {(i + 1) * 25}K</span>
                          <span>Engagement: {4 + i}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
