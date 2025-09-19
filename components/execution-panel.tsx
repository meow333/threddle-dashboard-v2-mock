import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  TrendingUp,
  Hammer,
  AlertTriangle,
  Target,
  Clock,
} from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

interface ExecutionPanelProps {
  className?: string;
}

export function ExecutionPanel({
  className,
}: ExecutionPanelProps) {
  // Mock data - in a real app this would come from props or API
  const executionData = {
    topPriorityAction: "Launch Holiday Collection",
    marginImpact: "+$45,280",
    biggestThreat: "Amazon Prime Day",
    trendPeakWindow: "Next 7 days",
  };

  return (
    <div
      className={`border-b border-gray-200 bg-white px-8 py-5 ${className || ""}`}
    >
      <div className="flex items-center justify-between">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="p-2 bg-blue-50 rounded-lg">
            <Target className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">
            Execution Panel
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="flex items-center gap-8 xl:gap-12">
          {/* Top Priority Action */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 block uppercase tracking-wider">
                TOP PRIORITY
              </span>
              <span className="text-sm font-medium text-gray-900">
                {executionData.topPriorityAction}
              </span>
            </div>
          </div>

          {/* Margin Impact */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Hammer className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 block uppercase tracking-wider">
                MARGIN IMPACT
              </span>
              <span className="font-medium text-green-600">
                {executionData.marginImpact}
              </span>
            </div>
          </div>

          {/* Biggest Competitor Threat */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 block uppercase tracking-wider">
                THREAT
              </span>
              <Badge
                variant="secondary"
                className="text-orange-600 bg-orange-50 border-orange-200 font-normal"
              >
                {executionData.biggestThreat}
              </Badge>
            </div>
          </div>

          {/* Trend Peak Window */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 block uppercase tracking-wider">
                PEAK WINDOW
              </span>
              <span className="text-sm font-medium text-blue-600">
                {executionData.trendPeakWindow}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
