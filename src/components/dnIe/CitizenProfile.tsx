
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, CreditCard, Shield } from "lucide-react";

const CitizenProfile = () => {
  // Mock citizen data
  const citizenData = {
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    firstName: "Carlos",
    lastName: "Rodríguez",
    documentNumber: "12345678A",
    dateOfBirth: "15/03/1985",
    placeOfBirth: "Madrid, España",
    nationality: "Española",
    address: "Calle Gran Vía 25, 28013 Madrid",
    issueDate: "12/01/2020",
    expiryDate: "12/01/2030",
    status: "Activo"
  };

  return (
    <div className="space-y-4">
      {/* Photo and Basic Info Card */}
      <Card className="p-6 bg-white shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={citizenData.photo}
              alt="Foto del Ciudadano"
              className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              {citizenData.firstName} {citizenData.lastName}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{citizenData.documentNumber}</p>
            <Badge 
              variant="outline" 
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Shield className="w-3 h-3 mr-1" />
              {citizenData.status}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Personal Details */}
      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          Información Personal
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Fecha de Nacimiento</span>
            <span className="font-medium">{citizenData.dateOfBirth}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Lugar de Nacimiento</span>
            <span className="font-medium text-right">{citizenData.placeOfBirth}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Nacionalidad</span>
            <span className="font-medium">{citizenData.nationality}</span>
          </div>
          
          <div className="flex justify-between items-start py-2">
            <span className="text-gray-600 text-sm">Dirección</span>
            <span className="font-medium text-right flex-1 ml-4">{citizenData.address}</span>
          </div>
        </div>
      </Card>

      {/* Document Details */}
      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
          Información del Documento
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Fecha de Expedición</span>
            <span className="font-medium">{citizenData.issueDate}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Fecha de Caducidad</span>
            <span className="font-medium">{citizenData.expiryDate}</span>
          </div>
        </div>
      </Card>

      {/* Security Info */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="text-center">
          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <h4 className="font-medium text-blue-800 mb-1">Identidad Digital Segura</h4>
          <p className="text-sm text-blue-700">
            Esta información está protegida criptográficamente y verificada por las autoridades gubernamentales.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CitizenProfile;
