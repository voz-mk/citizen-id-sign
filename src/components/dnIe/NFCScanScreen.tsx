
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
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-50 to-red-100">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Escanea tu DNIe
          </h1>
          <p className="text-gray-600">
            Acerca tu documento electrónico de identidad al sensor NFC de tu teléfono
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
                  Escaneando... {scanProgress}%
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
                  <span className="text-sm">Listo para escanear</span>
                </div>
                
                <Button 
                  onClick={startScan}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium"
                >
                  Iniciar Escaneo NFC
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-8 bg-white shadow-lg border-0">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-16 h-16 mr-1 text-blue-900" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"></path></svg>
            <span>Certificado de Autenticación</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-16 h-16 mr-1 text-blue-900" viewBox="0 0 256 256"><path fill="currentColor" d="M232 164H70.38c2.2-4.42 4.41-8.94 6.59-13.52l.79-1.66c13.52-1.65 28.69-11.3 45.38-28.87c5.31 12 14 24.73 27.59 27.29c5.26 1 13.51.79 22.93-5.82a58 58 0 0 0 9-7.91C190.9 141.2 205.68 148 232 148a12 12 0 0 0 0-24c-31 0-35.42-10.49-36-12.38c.49-5.37-2.75-9.76-7.88-11.63s-11.17.78-14.22 5.46c-10 15.32-16.62 18.62-18.75 18.21c-4.88-.91-12.39-15.54-15.44-30.09a12 12 0 0 0-21.13-5c-10.3 12.92-19.16 21.79-26.47 27.56c21.19-52.94 17-72.22 11.37-82.25C98.48 24.91 89.41 20 78 20c-18.08 0-32.64 16.55-39 44.26c-3.45 15.1-4 31.81-1.46 45.85c2.65 14.71 8.36 25.7 16.68 32.23c-3.53 7.44-7.22 14.72-10.75 21.66H24a12 12 0 0 0 0 24h6.7c-9.7 17.67-16.85 29.6-17 29.81a12 12 0 1 0 20.56 12.38C34.91 229.15 45.23 212 58 188h174a12 12 0 0 0 0-24M62.43 69.6C65.77 55 72.45 44 78 44c3.71 0 4.29 1 4.64 1.64c1.43 2.53 6.55 17.07-17.44 72.78a44.6 44.6 0 0 1-4-12.56c-1.97-10.97-1.52-24.19 1.23-36.26"></path></svg>
            <span>Certificado de Firma Digital</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-16 h-16 mr-1 text-blue-900" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m22 16l-2-2h-9.468a4.5 4.5 0 1 0 0 4H16.5l1.25-1.293L19 18h1zM6 16h1M3 3.5v5M6 7V5a1.5 1.5 0 1 1 3 0v2a1.5 1.5 0 1 1-3 0m6-3.5v5m3-5v5M18 7V5a1.5 1.5 0 0 1 3 0v2a1.5 1.5 0 0 1-3 0" color="currentColor"></path></svg>
            <span>Certificado de Encriptación</span>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-4 bg-red-50 border border-red-200">
          <div className="text-center">
            <h3 className="font-medium text-red-800 mb-2">Instrucciones</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Activa el NFC en tu dispositivo</li>
              <li>• Coloca tu DNIe en la parte trasera del teléfono</li>
              <li>• Manténlo firme durante el escaneo</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NFCScanScreen;
