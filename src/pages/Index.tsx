
import { useState } from "react";
import WelcomeScreen from "@/components/dnIe/WelcomeScreen";
import NFCScanScreen from "@/components/dnIe/NFCScanScreen";
import PINCodeScreen from "@/components/dnIe/PINCodeScreen";
import SuccessScreen from "@/components/dnIe/SuccessScreen";
import MainScreen from "@/components/dnIe/MainScreen";

type Screen = "welcome" | "nfc" | "pin" | "success" | "main";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNext={() => navigateToScreen("nfc")} />;
      case "nfc":
        return <NFCScanScreen onNext={() => navigateToScreen("pin")} />;
      case "pin":
        return <PINCodeScreen onNext={() => navigateToScreen("success")} />;
      case "success":
        return <SuccessScreen onNext={() => navigateToScreen("main")} />;
      case "main":
        return <MainScreen />;
      default:
        return <WelcomeScreen onNext={() => navigateToScreen("nfc")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {renderScreen()}
    </div>
  );
};

export default Index;
