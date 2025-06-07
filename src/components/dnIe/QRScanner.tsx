
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, QrCode, CheckCircle, RotateCcw, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ScanState = "idle" | "scanning" | "scanned" | "signing" | "success";

const QRScanner = () => {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scannedMessage, setScannedMessage] = useState("");
  const { toast } = useToast();

  const startScanning = () => {
    setScanState("scanning");
    
    // Simulate QR scanning
    setTimeout(() => {
      const mockMessage = "Solicitud de verificación de documento del Banco XYZ para aplicación de préstamo #LA-2024-001. Por favor confirma tu identidad para proceder.";
      setScannedMessage(mockMessage);
      setScanState("scanned");
    }, 2000);
  };

  const signMessage = () => {
    setScanState("signing");
    
    // Simulate message signing and server response
    setTimeout(() => {
      setScanState("success");
      toast({
        title: "Mensaje Firmado Exitosamente",
        description: "Tu firma digital ha sido aplicada y enviada a la parte solicitante.",
      });
    }, 1500);
  };

  const resetScanner = () => {
    setScanState("idle");
    setScannedMessage("");
  };

  const renderScannerContent = () => {
    switch (scanState) {
      case "idle":
        return (
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <QrCode className="w-16 h-16 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Escanear Código QR
              </h3>
              <p className="text-gray-600">
                Escanea un código QR para firmar un documento o verificar tu identidad
              </p>
            </div>

            <Button
              onClick={startScanning}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              <Camera className="w-5 h-5 mr-2" />
              Iniciar Cámara
            </Button>
          </div>
        );

      case "scanning":
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Camera className="w-16 h-16 text-white z-10" />
                
                {/* Scanning animation */}
                <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl animate-ping"></div>
                <div className="absolute inset-2 border-4 border-blue-400 rounded-2xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Escaneando...
              </h3>
              <p className="text-gray-600">
                Apunta tu cámara al código QR
              </p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        );

      case "scanned":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Código QR Detectado
              </h3>
            </div>

            <Card className="p-4 bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Mensaje a Firmar:</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {scannedMessage}
              </p>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={signMessage}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
              >
                <Send className="w-5 h-5 mr-2" />
                Firmar Mensaje
              </Button>
              
              <Button
                onClick={resetScanner}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Escanear de Nuevo
              </Button>
            </div>
          </div>
        );

      case "signing":
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Firmando Mensaje...
              </h3>
              <p className="text-gray-600">
                Aplicando tu firma digital
              </p>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ¡Mensaje Firmado!
              </h3>
              <p className="text-gray-600">
                Tu firma ha sido enviada exitosamente
              </p>
            </div>

            <Card className="p-4 bg-green-50 border border-green-200">
              <div className="text-center">
                <h4 className="font-medium text-green-800 mb-1">Estado de la Firma</h4>
                <p className="text-sm text-green-700">
                  Documento firmado y transmitido a la parte solicitante
                </p>
              </div>
            </Card>

            <Button
              onClick={resetScanner}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Escanear Otro Código QR
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-white shadow-lg">
        {renderScannerContent()}
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="text-center">
          <h4 className="font-medium text-blue-800 mb-2">Firma Digital</h4>
          <p className="text-sm text-blue-700">
            Usa esta función para firmar documentos y verificar tu identidad con terceros usando tu ID digital autenticado.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default QRScanner;
