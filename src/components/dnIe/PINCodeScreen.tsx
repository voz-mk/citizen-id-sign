
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
    if (pin.length === 6) {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-50 to-red-100">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Introduce tu PIN
          </h1>
          <p className="text-gray-600">
            Por favor, introduce el PIN de tu DNIe para autenticarte
          </p>
        </div>

        {/* PIN Input Card */}
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPin ? "number" : "password"}
                placeholder="PIN"
                value={pin}
                onChange={(e) => handlePinInput(e.target.value)}
                className="mx-auto w-2/3 py-4 text-center text-4xl tracking-wide"
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
                  className={`w-4 h-4 rounded-full ${
                    index < pin.length ? 'bg-red-600' : 'bg-gray-200'
                  } transition-colors duration-200`}
                />
              ))}
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={pin.length < 6 || isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-primary-foreground py-3 rounded-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verificando...</span>
                </div>
              ) : (
                'Autenticar'
              )}
            </Button>
          </div>
        </Card>

        {/* Security Info */}
        <Card className="p-4 bg-green-50 border border-green-200">
          <div className="text-center">
            <h3 className="font-medium text-green-800 mb-2">Proceso Seguro</h3>
            <p className="text-sm text-green-700">
              Tu PIN está cifrado y se procesa de forma segura según los estándares gubernamentales.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PINCodeScreen;
