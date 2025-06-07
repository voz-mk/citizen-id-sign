
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

interface SuccessScreenProps {
  onNext: () => void;
}

const SuccessScreen = ({ onNext }: SuccessScreenProps) => {
  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="w-full max-w-sm space-y-6">
        {/* Success Animation */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">
            ¡Autenticación Exitosa!
          </h1>
          <p className="text-gray-600 animate-fade-in">
            Tu identidad digital ha sido verificada
          </p>
        </div>

        {/* Success Card */}
        <Card className="p-6 bg-white shadow-lg border-0 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Estado</div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">Verificado y Autenticado</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-2">Redirigiendo en 3 segundos...</div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-green-500 h-1 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>

            <Button 
              onClick={onNext}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium group"
            >
              Continuar al Panel
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>

        {/* Security Badge */}
        <Card className="p-4 bg-blue-50 border border-blue-200">
          <div className="text-center">
            <h3 className="font-medium text-blue-800 mb-1">Sesión Segura</h3>
            <p className="text-sm text-blue-700">
              Tu sesión está protegida con cifrado de extremo a extremo
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuccessScreen;
