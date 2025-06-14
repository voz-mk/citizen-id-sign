import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Shield } from "lucide-react";
import { useEffect, useState } from 'react';

const CitizenProfile = ({ firstLoad }: { firstLoad: boolean }) => {
  const [loaded, setLoaded] = useState(false);

  // Mock citizen data
  const citizenData = {
    photo: "https://as1.ftcdn.net/v2/jpg/02/89/99/86/1000_F_289998619_hnJKgNQmbDwzph9m9t1ku3IR69mhl6SJ.jpg",
    firstName: "Antonio",
    lastName: "Rivera",
    documentNumber: "74125588",
    dateOfBirth: "01/01/2000",
    placeOfBirth: "Lima, Perú",
    nationality: "Peruana",
    address: "Av. La Molina 28013, La Molina, Lima",
    issueDate: "12/01/2020",
    expiryDate: "12/01/2030",
    status: "Activo"
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 700);
    return () => clearTimeout(timeout);
  });

  return (
    <div className="space-y-4">
      {/* Photo and Basic Info Card */}
      <Card className="p-6 bg-white shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {!loaded && firstLoad ? 
            (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 32" className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200">
                <path fill="currentColor" d="M.5 31.983a.503.503 0 0 0 .612-.354c1.03-3.843 5.216-4.839 7.718-5.435c.627-.149 1.122-.267 1.444-.406c2.85-1.237 3.779-3.227 4.057-4.679a.5.5 0 0 0-.165-.473c-1.484-1.281-2.736-3.204-3.526-5.416a.5.5 0 0 0-.103-.171c-1.045-1.136-1.645-2.337-1.645-3.294c0-.559.211-.934.686-1.217a.5.5 0 0 0 .243-.408C10.042 5.036 13.67 1.026 18.12 1l.107.007c4.472.062 8.077 4.158 8.206 9.324a.5.5 0 0 0 .178.369c.313.265.459.601.459 1.057c0 .801-.427 1.786-1.201 2.772a.5.5 0 0 0-.084.158c-.8 2.536-2.236 4.775-3.938 6.145a.5.5 0 0 0-.178.483c.278 1.451 1.207 3.44 4.057 4.679c.337.146.86.26 1.523.403c2.477.536 6.622 1.435 7.639 5.232a.5.5 0 0 0 .966-.26c-1.175-4.387-5.871-5.404-8.393-5.95c-.585-.127-1.09-.236-1.336-.344c-1.86-.808-3.006-2.039-3.411-3.665c1.727-1.483 3.172-3.771 3.998-6.337c.877-1.14 1.359-2.314 1.359-3.317c0-.669-.216-1.227-.644-1.663C27.189 4.489 23.19.076 18.227.005l-.149-.002c-4.873.026-8.889 4.323-9.24 9.83c-.626.46-.944 1.105-.944 1.924c0 1.183.669 2.598 1.84 3.896c.809 2.223 2.063 4.176 3.556 5.543c-.403 1.632-1.55 2.867-3.414 3.676c-.241.105-.721.22-1.277.352c-2.541.604-7.269 1.729-8.453 6.147a.5.5 0 0 0 .354.612"></path>
              </svg>
            ) : (
              <img
                src={citizenData.photo}
                alt="Foto del Ciudadano"
                className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
              />
            )}
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
