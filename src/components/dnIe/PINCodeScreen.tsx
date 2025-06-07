
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PINCodeScreenProps {
  onNext: () => void;
}

const PINCodeScreen = ({ onNext }: PINCodeScreenProps) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (pin.length >= 4) {
      setIsLoading(true);
      // Simulate PIN verification
      setTimeout(() => {
        setIsLoading(false);
        onNext();
      }, 1500);
    }
  };

  const handlePinInput = (value: string) => {
    // Allow only numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setPin(numericValue);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Enter PIN Code
          </h1>
          <p className="text-gray-600">
            Please enter your eID PIN to authenticate
          </p>
        </div>

        {/* PIN Input Card */}
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPin ? "text" : "password"}
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => handlePinInput(e.target.value)}
                className="text-center text-lg tracking-widest py-4 pr-12"
                maxLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* PIN dots indicator */}
            <div className="flex justify-center space-x-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < pin.length ? 'bg-blue-600' : 'bg-gray-200'
                  } transition-colors duration-200`}
                />
              ))}
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={pin.length < 4 || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Authenticate'
              )}
            </Button>
          </div>
        </Card>

        {/* Security Info */}
        <Card className="p-4 bg-green-50 border border-green-200">
          <div className="text-center">
            <h3 className="font-medium text-green-800 mb-2">Secure Process</h3>
            <p className="text-sm text-green-700">
              Your PIN is encrypted and processed securely according to government standards.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PINCodeScreen;
