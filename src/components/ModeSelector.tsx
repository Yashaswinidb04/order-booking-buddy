
import { ShoppingBag, Stethoscope } from "lucide-react";
import { Mode } from "@/pages/Index";

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="glass rounded-xl p-1 flex max-w-md mx-auto">
      <button
        onClick={() => onModeChange("restaurant")}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          currentMode === "restaurant"
            ? "bg-white shadow-sm text-amber-600"
            : "hover:bg-white/50 text-muted-foreground"
        }`}
        aria-pressed={currentMode === "restaurant"}
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="font-medium">Restaurant</span>
      </button>
      
      <button
        onClick={() => onModeChange("clinic")}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          currentMode === "clinic"
            ? "bg-white shadow-sm text-blue-600"
            : "hover:bg-white/50 text-muted-foreground"
        }`}
        aria-pressed={currentMode === "clinic"}
      >
        <Stethoscope className="w-4 h-4" />
        <span className="font-medium">Clinic</span>
      </button>
    </div>
  );
};

export default ModeSelector;
