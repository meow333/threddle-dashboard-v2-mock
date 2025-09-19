import { useState } from "react";
import { LoginRegistration } from "../login-registration";
import { WelcomeScreen } from "./welcome-screen";
import { StoreConnectionProgress } from "./store-connection-progress";
import { BusinessContext } from "./business-context";
import { ProductInsightsDashboard } from "./product-insights-dashboard";
import { RecommendationsSetup } from "./recommendations-setup";
import { WelcomePage } from "./welcome-page";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    email: "",
    primaryCategory: "",
    geography: "",
    growthFocus: "",
    notifications: {
      inventoryAlerts: false,
      weeklyDigest: false,
      competitorAlerts: false,
    }
  });

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleRegister = () => {
    // For new users starting onboarding, go to welcome screen
    handleNext();
  };

  const handleLogin = () => {
    handleNext();
  };

  const handleBusinessContext = (data: { primaryCategory: string; growthFocus: string[] }) => {
    setUserData(prev => ({ ...prev, primaryCategory: data.primaryCategory, growthFocus: data.growthFocus.join(', ') }));
    handleNext();
  };

  const handleNotificationSettings = (notifications: { inventoryAlerts: boolean; weeklyDigest: boolean; competitorAlerts: boolean }) => {
    setUserData(prev => ({ ...prev, notifications }));
    handleNext();
  };

  const steps = [
    <LoginRegistration key="login" onSignIn={handleLogin} onRegister={handleRegister} />,
    <WelcomeScreen key="welcome" onNext={handleNext} onBack={handleBack} />,
    <StoreConnectionProgress key="connection" onNext={handleNext} onBack={handleBack} />,
    <BusinessContext key="business" onNext={handleBusinessContext} onBack={handleBack} />,
    <ProductInsightsDashboard key="insights" onNext={handleNext} onBack={handleBack} />,
    <RecommendationsSetup key="recommendations" onNext={handleNotificationSettings} onBack={handleBack} />,
    <WelcomePage key="final" onComplete={onComplete} onBack={handleBack} />
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {steps[currentStep]}
    </div>
  );
}
