import { ReactNode } from "react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  glowColor?: string;
  animated?: boolean;
}

const ResultCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  glowColor,
  animated = true 
}: ResultCardProps) => {
  return (
    <GlassCard 
      className={cn(
        "text-center",
        animated && "animate-in fade-in slide-in-from-bottom-4 duration-500"
      )}
      glowColor={glowColor}
    >
      <div className="flex flex-col items-center gap-4">
        {icon && (
          <div 
            className="p-3 rounded-full animate-float"
            style={{ 
              backgroundColor: `${glowColor}15`,
              boxShadow: `0 0 20px ${glowColor}30`
            }}
          >
            {icon}
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          <p 
            className="text-4xl md:text-5xl font-orbitron font-bold animate-glow-pulse"
            style={{ color: glowColor }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ResultCard;
