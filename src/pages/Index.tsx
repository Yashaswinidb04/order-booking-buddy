
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ModeSelector from "@/components/ModeSelector";
import ChatInterface from "@/components/ChatInterface";
import RestaurantMode from "@/components/RestaurantMode";
import ClinicMode from "@/components/ClinicMode";
import { toast } from "sonner";

export type Mode = "restaurant" | "clinic";

const Index = () => {
  const [mode, setMode] = useState<Mode>("restaurant");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle mode change with transition
  const handleModeChange = (newMode: Mode) => {
    if (newMode === mode) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(newMode);
      setIsTransitioning(false);
      toast.success(`Switched to ${newMode === "restaurant" ? "Restaurant" : "Clinic"} mode`);
    }, 300);
  };

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("animate-fade-in");
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/80">
      <Header mode={mode} />
      
      <main className="flex-1 container px-4 py-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className={`col-span-1 lg:col-span-8 space-y-6 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
          
          {mode === "restaurant" ? (
            <RestaurantMode />
          ) : (
            <ClinicMode />
          )}
        </section>
        
        <section className="col-span-1 lg:col-span-4 flex flex-col">
          <ChatInterface mode={mode} />
        </section>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} GenAI Assistant | Designed with precision</p>
      </footer>
    </div>
  );
};

export default Index;
