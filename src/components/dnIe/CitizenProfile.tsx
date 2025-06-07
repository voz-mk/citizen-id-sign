
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, CreditCard, Shield } from "lucide-react";

const CitizenProfile = () => {
  // Mock citizen data
  const citizenData = {
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    firstName: "Carlos",
    lastName: "Rodriguez",
    documentNumber: "12345678A",
    dateOfBirth: "15/03/1985",
    placeOfBirth: "Madrid, Spain",
    nationality: "Spanish",
    address: "Calle Gran Via 25, 28013 Madrid",
    issueDate: "12/01/2020",
    expiryDate: "12/01/2030",
    status: "Active"
  };

  return (
    <div className="space-y-4">
      {/* Photo and Basic Info Card */}
      <Card className="p-6 bg-white shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={citizenData.photo}
              alt="Citizen Photo"
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
          Personal Information
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Date of Birth</span>
            <span className="font-medium">{citizenData.dateOfBirth}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Place of Birth</span>
            <span className="font-medium text-right">{citizenData.placeOfBirth}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Nationality</span>
            <span className="font-medium">{citizenData.nationality}</span>
          </div>
          
          <div className="flex justify-between items-start py-2">
            <span className="text-gray-600 text-sm">Address</span>
            <span className="font-medium text-right flex-1 ml-4">{citizenData.address}</span>
          </div>
        </div>
      </Card>

      {/* Document Details */}
      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
          Document Information
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Issue Date</span>
            <span className="font-medium">{citizenData.issueDate}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Expiry Date</span>
            <span className="font-medium">{citizenData.expiryDate}</span>
          </div>
        </div>
      </Card>

      {/* Security Info */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="text-center">
          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <h4 className="font-medium text-blue-800 mb-1">Secure Digital Identity</h4>
          <p className="text-sm text-blue-700">
            This information is cryptographically protected and verified by government authorities.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CitizenProfile;
