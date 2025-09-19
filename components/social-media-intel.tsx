import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Calendar, TrendingUp, Users, Heart, MessageCircle, Share2, Eye, MapPin } from 'lucide-react'

interface SocialMediaIntelProps {
  timeRange: string
  geography: string
}

// Sample data for social media trends
const socialTrendData = [
  { date: 'Sep 20', searchVolume: 2800, searchTrend: 2600, allRetailers: 3200, socialPosts: 4500, socialTrend: 4200 },
  { date: 'Jan 21', searchVolume: 3200, searchTrend: 2800, allRetailers: 3400, socialPosts: 4800, socialTrend: 4400 },
  { date: 'May 21', searchVolume: 3600, searchTrend: 3200, allRetailers: 3800, socialPosts: 5200, socialTrend: 4800 },
  { date: 'Sep 21', searchVolume: 3400, searchTrend: 3000, allRetailers: 3600, socialPosts: 5000, socialTrend: 4600 },
  { date: 'Jan 22', searchVolume: 3800, searchTrend: 3400, allRetailers: 4000, socialPosts: 5400, socialTrend: 5000 },
  { date: 'May 22', searchVolume: 4200, searchTrend: 3800, allRetailers: 4400, socialPosts: 5800, socialTrend: 5400 },
  { date: 'Sep 22', searchVolume: 4600, searchTrend: 4200, allRetailers: 4800, socialPosts: 6200, socialTrend: 5800 },
  { date: 'Jan 23', searchVolume: 5000, searchTrend: 4600, allRetailers: 5200, socialPosts: 6600, socialTrend: 6200 },
  { date: 'May 23', searchVolume: 7200, searchTrend: 6800, allRetailers: 7600, socialPosts: 9200, socialTrend: 8800 },
  { date: 'May 23', searchVolume: 8800, searchTrend: 8400, allRetailers: 9200, socialPosts: 11800, socialTrend: 11400 },
  { date: 'Sep 23', searchVolume: 9600, searchTrend: 9200, allRetailers: 10000, socialPosts: 12600, socialTrend: 12200 },
  { date: 'Jan 24', searchVolume: 8200, searchTrend: 7800, allRetailers: 8600, socialPosts: 10800, socialTrend: 10400 },
  { date: 'May 24', searchVolume: 7400, searchTrend: 7000, allRetailers: 7800, socialPosts: 9400, socialTrend: 9000 }
]

const platformMetrics = [
  { platform: 'TikTok', posts: 12400, engagement: 890000, reach: 2300000, growth: '+156%' },
  { platform: 'Instagram', posts: 8900, engagement: 650000, reach: 1800000, growth: '+89%' },
  { platform: 'Pinterest', posts: 5600, engagement: 340000, reach: 920000, growth: '+234%' },
  { platform: 'Facebook', posts: 3200, engagement: 180000, reach: 560000, growth: '+45%' }
]

const trendingHashtags = [
  { tag: '#cottagecore', volume: 2300000, growth: '+340%', sentiment: 'positive' },
  { tag: '#y2kfashion', volume: 1800000, growth: '+280%', sentiment: 'positive' },
  { tag: '#sustainablestyle', volume: 1200000, growth: '+125%', sentiment: 'positive' },
  { tag: '#oversizedblazer', volume: 890000, growth: '+189%', sentiment: 'positive' },
  { tag: '#chunkysneakers', volume: 750000, growth: '+210%', sentiment: 'neutral' }
]

const topInfluencers = [
  { name: 'Emma Chamberlain', followers: '12.1M', engagement: '8.4%', mentions: 234, reach: '2.1M' },
  { name: 'Bella Hadid', followers: '59.7M', engagement: '3.2%', mentions: 189, reach: '8.9M' },
  { name: 'Dua Lipa', followers: '88.4M', engagement: '4.1%', mentions: 156, reach: '12.3M' },
  { name: 'Zendaya', followers: '184M', engagement: '5.8%', mentions: 145, reach: '18.7M' }
]

const geographicData = [
  { region: 'Montana', searchInterest: 48, color: '#3b82f6' },
  { region: 'California', searchInterest: 92, color: '#1d4ed8' },
  { region: 'New York', searchInterest: 87, color: '#1e40af' },
  { region: 'Texas', searchInterest: 76, color: '#2563eb' },
  { region: 'Florida', searchInterest: 68, color: '#3b82f6' }
]

export function SocialMediaIntel({ timeRange, geography }: SocialMediaIntelProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('overview')
  const [selectedMetric, setSelectedMetric] = useState('posts')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Social Media Intel</h1>
          <p className="text-muted-foreground">Track social trends and conversations across platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sep 2020 - May 2024</span>
        </div>
      </div>

      {/* Platform Tabs */}
      <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Social Overview</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="pinterest">Pinterest</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Time Range Filters */}
          <div className="flex items-center gap-2">
            <Button variant={timeRange === '7d' ? 'default' : 'outline'} size="sm">1w</Button>
            <Button variant={timeRange === '30d' ? 'default' : 'outline'} size="sm">1m</Button>
            <Button variant="outline" size="sm">3m</Button>
            <Button variant="outline" size="sm">6m</Button>
            <Button variant="outline" size="sm">YTD</Button>
            <Button variant="outline" size="sm">1y</Button>
            <Button variant="outline" size="sm">All</Button>
          </div>

          {/* Main Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Social Trend Analysis</CardTitle>
              <CardDescription>Track social mentions and engagement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={socialTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="searchVolume" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                      strokeDasharray="5 5"
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="searchTrend" 
                      stackId="2"
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.4}
                      strokeDasharray="3 3"
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="allRetailers" 
                      stackId="3"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="socialPosts" 
                      stackId="4"
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="socialTrend" 
                      stackId="5"
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.4}
                      strokeDasharray="2 2"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span>Search Volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span>Search Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span>All Retailers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                  <span>Social Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                  <span>Social Trend</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section - Map and Metrics */}
          <div className="grid grid-cols-12 gap-6">
            {/* Map View */}
            <div className="col-span-12 lg:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>Map View</CardTitle>
                  <CardDescription>
                    Compare between different regions of the world where{' '}
                    <span className="font-medium">E.L.F Cosmetics</span> got the most search.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="us">
                    <SelectTrigger className="w-full mb-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Simplified Map Representation */}
                  <div className="relative bg-blue-50 rounded-lg p-6 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="space-y-2">
                        {geographicData.slice(0, 3).map((region, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{region.region}</span>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-12 h-2 rounded-full" 
                                style={{ backgroundColor: region.color }}
                              ></div>
                              <span className="font-medium">{region.searchInterest}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Metrics */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              {/* Platform Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformMetrics.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">{platform.platform[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{platform.platform}</h4>
                            <p className="text-sm text-muted-foreground">{platform.posts.toLocaleString()} posts</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{(platform.engagement / 1000).toFixed(0)}K</p>
                          <p className="text-sm text-green-600">{platform.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Hashtags */}
              <Card>
                <CardHeader>
                  <CardTitle>Trending Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingHashtags.slice(0, 4).map((hashtag, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-blue-600">{hashtag.tag}</span>
                          <Badge variant="outline">{hashtag.sentiment}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{(hashtag.volume / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-green-600">{hashtag.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Individual Platform Tabs */}
        {['tiktok', 'instagram', 'facebook', 'pinterest', 'search'].map((platform) => (
          <TabsContent key={platform} value={platform} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{platform} Analytics</CardTitle>
                <CardDescription>Detailed metrics and trends for {platform}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-medium">2.3M</p>
                    <p className="text-sm text-muted-foreground">Total Reach</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl font-medium">156K</p>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-medium">12.4K</p>
                    <p className="text-sm text-muted-foreground">Comments</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Share2 className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-medium">8.9K</p>
                    <p className="text-sm text-muted-foreground">Shares</p>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={socialTrendData.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="socialPosts" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}