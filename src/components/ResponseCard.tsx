
import { ReactNode } from "react";

interface ResponseCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  category?: string;
  className?: string;
}

const ResponseCard = ({ 
  title, 
  children, 
  icon, 
  category, 
  className = "" 
}: ResponseCardProps) => {
  return (
    <div className={`glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 animate-scale-in ${className}`}>
      {category && (
        <div className="px-4 py-1.5 bg-black/5 dark:bg-white/5 text-xs font-medium text-muted-foreground">
          {category}
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="shrink-0 p-2 bg-secondary rounded-full">
              {icon}
            </div>
          )}
          
          <div className="space-y-1.5">
            <h3 className="font-medium text-base leading-tight">{title}</h3>
            <div className="text-sm text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
