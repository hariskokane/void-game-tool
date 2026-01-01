import { ReactNode } from "react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/components/ThemeProvider";

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
  const { theme } = useThemeContext();
  
  // Adjust text color for better visibility in light mode
  const getTextColorClass = () => {
    if (!glowColor) return "text-foreground";
    
    // For light mode, we need to ensure good contrast
    if (theme === "light") {
      // If glowColor is a CSS variable, we can't easily determine its lightness
      // So we'll use a more contrasting color
      return "text-foreground";
    }
    
    // For dark mode, use the glow color
    return "";
  };

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
            className={cn(
              "text-4xl md:text-5xl font-orbitron font-bold animate-glow-pulse",
              getTextColorClass()
            )}
            style={{ 
              color: theme === "dark" ? glowColor : undefined,
              textShadow: theme === "light" && glowColor ? `0 0 10px ${glowColor}80` : undefined
            }}
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