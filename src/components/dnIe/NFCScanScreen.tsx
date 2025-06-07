
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Nfc, Smartphone, Waves } from "lucide-react";

interface NFCScanScreenProps {
  onNext: () => void;
}

const NFCScanScreen = ({ onNext }: NFCScanScreenProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onNext();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-50 to-red-100">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Scan your eID
          </h1>
          <p className="text-gray-600">
            Place your electronic ID card near your phone's NFC sensor
          </p>
        </div>

        {/* NFC Animation Card */}
        <Card className="p-8 bg-white shadow-lg border-0">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center relative overflow-hidden">
                <Nfc className="w-16 h-16 text-white z-10" />
                
                {/* Animated rings */}
                {isScanning && (
                  <>
                    <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-2 border-4 border-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-4 border-4 border-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </>
                )}
              </div>
              
              {/* Phone representation */}
              <div className="absolute -bottom-2 -right-2">
                <div className="w-12 h-8 bg-gray-800 rounded-md flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Progress */}
            {isScanning && (
              <div className="space-y-2">
                <div className="text-sm text-red-600 font-medium">
                  Scanning... {scanProgress}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {!isScanning && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Waves className="w-5 h-5" />
                  <span className="text-sm">Ready to scan</span>
                </div>
                
                <Button 
                  onClick={startScan}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium"
                >
                  Start NFC Scan
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-4 bg-red-50 border border-red-200">
          <div className="text-center">
            <h3 className="font-medium text-red-800 mb-2">Instructions</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Enable NFC on your device</li>
              <li>• Place your eID on the back of your phone</li>
              <li>• Keep it steady during scanning</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NFCScanScreen;
