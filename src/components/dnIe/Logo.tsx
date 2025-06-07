
import { Shield, CreditCard } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20", 
    lg: "w-32 h-32"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10"
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto relative ${className}`}>
      {/* ID Card Background */}
      <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg relative overflow-hidden">
        {/* Card Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1 left-1 right-1 h-2 bg-white/30 rounded-sm"></div>
          <div className="absolute top-4 left-1 right-1 h-1 bg-white/20 rounded-sm"></div>
          <div className="absolute bottom-4 left-1 right-1 h-1 bg-white/20 rounded-sm"></div>
          <div className="absolute bottom-1 left-1 right-1 h-2 bg-white/30 rounded-sm"></div>
        </div>
        
        {/* Main Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-2 shadow-md">
            <Shield className={`${iconSizes[size]} text-red-600`} />
          </div>
        </div>
        
        {/* Card Icon Overlay */}
        <div className="absolute bottom-1 right-1">
          <CreditCard className="w-3 h-3 text-white/70" />
        </div>
        
        {/* Shine Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default Logo;
