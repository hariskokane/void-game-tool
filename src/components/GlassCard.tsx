import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

const GlassCard = ({ children, className, glowColor }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative backdrop-blur-md bg-card/40 rounded-2xl border border-border/50 p-6",
        "shadow-lg transition-all duration-300 hover:border-border/80",
        className
      )}
      style={{
        boxShadow: glowColor 
          ? `0 0 20px ${glowColor}15, 0 0 40px ${glowColor}08`
          : undefined
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
