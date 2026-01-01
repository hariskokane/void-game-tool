import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  glowColor?: string;
  type?: string;
}

const CalculatorInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "0",
  glowColor,
  type = "number"
}: CalculatorInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "bg-input/50 border-border/50 text-foreground",
          "focus:border-2 focus:bg-input/70 transition-all duration-300",
          "font-mono text-lg h-12"
        )}
        style={{
          borderColor: glowColor,
          boxShadow: value ? `0 0 10px ${glowColor}20` : undefined
        }}
      />
    </div>
  );
};

export default CalculatorInput;
