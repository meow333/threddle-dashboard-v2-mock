import { useState } from "react";
import { Badge } from "./ui/badge";
const mapImage = "/images/maps/world.png";

interface RegionData {
	country: string;
	code: string;
	intensity: number;
	color: string;
	position: { x: number; y: number };
}

const regionData: RegionData[] = [
	{
		country: "United States",
		code: "US",
		intensity: 95,
		color: "#1e40af", // Darkest blue for highest intensity
		position: { x: 25, y: 45 }
	},
	{
		country: "United Kingdom",
		code: "UK",
		intensity: 87,
		color: "#3b82f6", // Medium blue
		position: { x: 52, y: 35 }
	},
	{
		country: "Canada",
		code: "CA",
		intensity: 76,
		color: "#60a5fa", // Lighter blue
		position: { x: 25, y: 25 }
	},
	{
		country: "Germany",
		code: "DE",
		intensity: 68,
		color: "#93c5fd", // Even lighter blue
		position: { x: 55, y: 40 }
	},
	{
		country: "France",
		code: "FR",
		intensity: 62,
		color: "#bfdbfe", // Light blue
		position: { x: 52, y: 45 }
	},
	{
		country: "Australia",
		code: "AU",
		intensity: 58,
		color: "#dbeafe", // Very light blue
		position: { x: 85, y: 75 }
	}
];

interface InteractiveWorldMapProps {
	selectedTrend: string;
}

export function InteractiveWorldMap({
	selectedTrend
}: InteractiveWorldMapProps) {
	const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(
		null
	);
	const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

	const displayRegion = hoveredRegion || selectedRegion;
	const topRegions = regionData.slice(0, 3); // Top 3 regions

	return (
		<div className="space-y-4">
			{/* Map Container */}
			<div className="relative">
				{/* Background Map */}
				<div
					className="relative w-full h-[350px] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
					style={{
						backgroundImage: `url(${mapImage})`,
						backgroundSize: "cover"
					}}
				>
					{/* Overlay for better contrast */}
					<div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]"></div>

					{/* Interactive Markers */}
					{regionData.map((region) => (
						<div
							key={region.code}
							className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
							style={{
								left: `${region.position.x}%`,
								top: `${region.position.y}%`
							}}
							onMouseEnter={() => setHoveredRegion(region)}
							onMouseLeave={() => setHoveredRegion(null)}
							onClick={() => setSelectedRegion(region)}
						>
							{/* Pulse animation for top regions */}
							{region.intensity >= 80 && (
								<div
									className="absolute inset-0 rounded-full animate-ping"
									style={{ backgroundColor: region.color }}
								></div>
							)}

							{/* Main marker */}
							<div
								className="w-4 h-4 rounded-full border border-white shadow-lg relative z-10"
								style={{ backgroundColor: region.color }}
							></div>

							{/* Hover tooltip */}
							{hoveredRegion === region && (
								<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
									<div className="font-medium">
										{region.country}
									</div>
									<div>
										Trend Intensity: {region.intensity}
									</div>
									<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Legend */}
				<div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
					<div className="font-medium mb-1">Trend Intensity</div>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1">
							<div className="w-3 h-3 rounded-full bg-blue-200"></div>
							<span>Low</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="w-3 h-3 rounded-full bg-blue-500"></div>
							<span>High</span>
						</div>
					</div>
				</div>
			</div>

			{/* Region Details */}
			{displayRegion && (
				<div className="bg-accent/50 rounded-lg p-4">
					<div className="flex items-center justify-between mb-2">
						<h4 className="font-medium">{displayRegion.country}</h4>
						<Badge
							variant="secondary"
							className="text-xs"
							style={{
								backgroundColor: displayRegion.color + "20",
								color: displayRegion.color,
								borderColor: displayRegion.color
							}}
						>
							{displayRegion.intensity} intensity
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						{selectedTrend} is{" "}
						{displayRegion.intensity >= 80
							? "very popular"
							: displayRegion.intensity >= 60
							? "moderately popular"
							: "gaining traction"}{" "}
						in {displayRegion.country}
					</p>
				</div>
			)}

			{/* Top Regions Summary */}
			<div className="grid grid-cols-3 gap-3">
				{topRegions.map((region, index) => (
					<div
						key={region.code}
						className="text-center p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent/50"
						onClick={() => setSelectedRegion(region)}
					>
						<div className="flex items-center justify-center mb-2">
							<div
								className="w-3 h-3 rounded-full mr-2"
								style={{ backgroundColor: region.color }}
							></div>
							<span className="text-sm font-medium">
								{region.code}
							</span>
						</div>
						<div className="text-lg font-semibold">
							{region.intensity}
						</div>
						<div className="text-xs text-muted-foreground">
							#{index + 1} strongest
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
