
import { useState, useEffect } from "react";
import { ShoppingBag, Stethoscope } from "lucide-react";
import { Mode } from "@/pages/Index";

interface HeaderProps {
  mode: Mode;
}

const Header = ({ mode }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "py-2 glass shadow-md" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full glass transition-all duration-300 ${
            mode === "restaurant" ? "bg-amber-50/80 text-amber-600" : "bg-blue-50/80 text-blue-600"
          }`}>
            {mode === "restaurant" ? (
              <ShoppingBag className="w-5 h-5" />
            ) : (
              <Stethoscope className="w-5 h-5" />
            )}
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-none">
              GenAI Assistant
            </h1>
            <p className="text-sm text-muted-foreground leading-tight">
              {mode === "restaurant" ? "Restaurant Ordering" : "Clinic Booking"}
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <a 
            href="#" 
            className="px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
          >
            Help
          </a>
          <a 
            href="#" 
            className="px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
