
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Shield, CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
      {/* Logo/Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">DNIe</h1>
        <p className="text-red-100 text-lg">Digital National Identity</p>
      </div>

      {/* Welcome Card */}
      <Card className="w-full max-w-sm p-6 bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-scale-in">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to DNIe
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            Securely access your digital identity and sign documents with your electronic ID card.
          </p>

          {/* Features */}
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Secure NFC validation</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Digital document signing</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Identity verification</span>
            </div>
          </div>

          <Button 
            onClick={onNext}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            <Smartphone className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-red-200 text-sm">
        <p>Powered by secure government technology</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
