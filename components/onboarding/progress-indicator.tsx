interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-colors ${
            index + 1 <= currentStep
              ? "bg-blue-600"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}