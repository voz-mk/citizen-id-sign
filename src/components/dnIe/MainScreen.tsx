
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { User, QrCode, Camera, CheckCircle } from "lucide-react";
import CitizenProfile from "./CitizenProfile";
import QRScanner from "./QRScanner";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Panel DNIe</h1>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Autenticado</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger 
              value="profile" 
              className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="scanner" 
              className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <QrCode className="w-4 h-4" />
              <span>Firmar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <CitizenProfile />
          </TabsContent>

          <TabsContent value="scanner" className="mt-6">
            <QRScanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainScreen;
