import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { X, TrendingUp, MessageSquare } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface TrendAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trendName: string;
  trendData?: {
    searchVolume: string;
    growth: string;
    trajectory: string;
    countries: string[];
  };
}

// Mock data for the charts - in a real app this would come from an API
const searchInterestData = [
  { date: "Sep 21", volume: 5000, trend: 5000 },
  { date: "Jan 22", volume: 8000, trend: 7500 },
  { date: "May 22", volume: 12000, trend: 11000 },
  { date: "Sep 22", volume: 15000, trend: 14500 },
  { date: "Jan 23", volume: 22000, trend: 20000 },
  { date: "May 23", volume: 28000, trend: 26000 },
  { date: "Sep 23", volume: 35000, trend: 33000 },
  { date: "Jan 24", volume: 42000, trend: 40000 },
  { date: "May 24", volume: 48000, trend: 46000 },
];

const socialBuzzData = [
  { date: "Sep 21", posts: 2, trend: 2 },
  { date: "Jan 22", posts: 3, trend: 3 },
  { date: "May 22", posts: 4, trend: 4 },
  { date: "Sep 22", posts: 5, trend: 5 },
  { date: "Jan 23", posts: 8, trend: 7 },
  { date: "May 23", posts: 12, trend: 10 },
  { date: "Sep 23", posts: 18, trend: 15 },
  { date: "Jan 24", posts: 25, trend: 22 },
  { date: "May 24", posts: 74, trend: 35 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey === "volume"
              ? "Search Volume: "
              : entry.dataKey === "posts"
                ? "Social Posts: "
                : "Trend: "}
            <span className="font-medium">
              {entry.value.toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function TrendAnalysisDialog({
  open,
  onOpenChange,
  trendName,
  trendData,
}: TrendAnalysisDialogProps) {
  const [selectedTimeRange, setSelectedTimeRange] =
    useState("3y");

  // Calculate mock metrics based on trend name
  const getMetrics = () => {
    const baseSearches =
      Math.floor(Math.random() * 50000) + 20000;
    const growthPercent = Math.floor(Math.random() * 500) + 100;
    const socialPosts = Math.floor(Math.random() * 100) + 30;
    const socialGrowth = Math.floor(Math.random() * 2000) + 500;

    return {
      searchVolume: baseSearches.toLocaleString(),
      searchGrowth: `+${(growthPercent * 1000).toLocaleString()}.${Math.floor(Math.random() * 10)}%`,
      socialPosts: socialPosts,
      socialGrowth: `+${socialGrowth}.${Math.floor(Math.random() * 10)}%`,
    };
  };

  const metrics = getMetrics();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:max-w-6xl h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-xl">
                {trendName} : Overview
              </DialogTitle>
              <div className="flex gap-2">
                {["4y", "3y", "1y", "6m", "3m"].map((range) => (
                  <Button
                    key={range}
                    variant={
                      selectedTimeRange === range
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                    className="h-8 px-3"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {/* Search Interest Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">
                  Search Interest
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Metrics */}
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold">
                      {metrics.searchVolume}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Weekly Searches
                    </div>
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {metrics.searchGrowth} to last year
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">
                      {trendName}
                    </p>
                    <p>
                      has{" "}
                      <span className="font-medium">high</span>{" "}
                      average weekly searches. Searches over the
                      last 3 months are up{" "}
                      <span className="font-medium">
                        +1,463%
                      </span>{" "}
                      to last year and are{" "}
                      <span className="font-medium">
                        growing
                      </span>{" "}
                      at an
                      <span className="font-medium">
                        {" "}
                        accelerated rate
                      </span>
                      .
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Mar 30, 2024
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">
                        Avg Weekly Searches:
                      </div>
                      <div className="text-xl font-bold">
                        32,791
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        +25.05% from last year
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-2">
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <AreaChart data={searchInterestData}>
                        <defs>
                          <linearGradient
                            id="searchGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3b82f6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="opacity-30"
                        />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                          tickFormatter={(value) =>
                            `${value / 1000}k`
                          }
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="volume"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#searchGradient)"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="trend"
                          stroke="#1e40af"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Search Volume</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 border-t-2 border-dashed border-blue-700"></div>
                      <span>Search Trend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Buzz Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-medium">
                  Social Buzz
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Metrics */}
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold">
                      {metrics.socialPosts}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Posts
                    </div>
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {metrics.socialGrowth} to last year
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">
                      {trendName}
                    </p>
                    <p>
                      has an average engagement rating compared
                      to the last 20 weeks. It has been
                      mentioned in{" "}
                      <span className="font-medium">
                        {metrics.socialPosts} posts
                      </span>{" "}
                      over the last 3 months, with an average of{" "}
                      <span className="font-medium">6,405</span>{" "}
                      likes and comments per post.
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-2">
                  <div className="h-64">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <AreaChart data={socialBuzzData}>
                        <defs>
                          <linearGradient
                            id="socialGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ef4444"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ef4444"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="opacity-30"
                        />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          className="text-xs"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="posts"
                          stroke="#ef4444"
                          fillOpacity={1}
                          fill="url(#socialGradient)"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="trend"
                          stroke="#dc2626"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Social Posts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 border-t-2 border-dashed border-red-700"></div>
                      <span>Social Trend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}