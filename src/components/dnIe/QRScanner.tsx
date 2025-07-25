
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, QrCode, CheckCircle, RotateCcw, Send, X, Smartphone, Nfc, Waves } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QrScanner from 'qr-scanner';

type ScanState = "idle" | "scanning" | "scanned" | "nfc" | "signing" | "success";

const QRScannerComponent = () => {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scannedMessage, setScannedMessage] = useState("");
  const parsedMessage = scannedMessage && JSON.parse(scannedMessage);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (scanState === 'scanning') {
      const effect = async () => {
        try {
          const qrScanner = new QrScanner(
            videoRef.current,
            (result) => {
              console.log('QR Code detected:', result.data);
              setScannedMessage(result.data);
              setScanState("scanned");
              qrScanner.stop();
            },
            {
              highlightScanRegion: true,
              highlightCodeOutline: true,
              preferredCamera: 'environment',
            }
          );
    
          qrScannerRef.current = qrScanner;
          
          await qrScanner.start();
          setHasPermission(true);
          
        } catch (error) {
          console.error('Error starting QR scanner:', error);
          setHasPermission(false);
          toast({
            title: "Error de Cámara",
            description: "No se pudo acceder a la cámara. Por favor, permite el acceso para escanear códigos QR.",
            variant: "destructive",
          });
        }
      }
      effect();
    }
  }, [scanState])

  const startScanning = () => {
    setScanState("scanning");
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    setScanState("idle");
  };

  const signMessage = () => {
    setScanState("nfc");
  };

  const resetScanner = () => {
    setScanState("idle");
    setScannedMessage("");
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
  };

  const startNFCScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanState("signing");
            setTimeout(() => {
              setScanState("success");
              toast({
                title: "Mensaje Firmado Exitosamente",
                description: "Tu firma digital ha sido aplicada y enviada a la parte solicitante.",
              });
            }, 1500);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  }

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

            {hasPermission === false && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Se requiere acceso a la cámara para escanear códigos QR. Por favor, permite el acceso cuando se solicite.
                </p>
              </div>
            )}

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
              <video
                ref={videoRef}
                className="w-full max-w-sm mx-auto rounded-lg bg-black"
                playsInline
                muted
              />
              
              <Button
                onClick={stopScanning}
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Escaneando...
              </h3>
              <p className="text-gray-600">
                Apunta tu cámara al código QR
              </p>
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
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                Entidad: {parsedMessage.entity}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                URL: {parsedMessage.url}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                Mensaje: {parsedMessage.message}
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

      case "nfc":
        return (
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
                  onClick={startNFCScan}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium"
                >
                  Iniciar Escaneo NFC
                </Button>
              </div>
            )}
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

export default QRScannerComponent;
