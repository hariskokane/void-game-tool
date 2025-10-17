import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FlaskConical, Target } from "lucide-react";

const FspNeeded = () => {
  const [damagePerSlash, setDamagePerSlash] = useState("");
  const [stamina, setStamina] = useState("");
  const [targetDamage, setTargetDamage] = useState("500000000");
  const [customDamage, setCustomDamage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const THEME_COLOR = "hsl(0, 85%, 60%)";
  const THEME_GLOW = "hsl(0, 100%, 70%)";

  const targetOptions = [
    { value: "500000000", label: "500M" },
    { value: "750000000", label: "750M" },
    { value: "1000000000", label: "1B" },
    { value: "2000000000", label: "2B" },
    { value: "custom", label: "Custom" },
  ];

  const calculateFspNeeded = () => {
    const damage = parseFloat(damagePerSlash);
    const stam = parseFloat(stamina);
    const target = targetDamage === "custom" 
      ? parseFloat(customDamage)
      : parseFloat(targetDamage);

    if (!isNaN(damage) && !isNaN(stam) && !isNaN(target)) {
      const fspNeeded = target / (damage * stam);
      setResult(Math.ceil(fspNeeded));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-primary/30">
              <FlaskConical className="w-6 h-6 text-red-500" />
              <span className="font-orbitron font-semibold text-red-500">
                FSP Estimation Tool
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
              Calculate FSP Required
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Estimate how many Full Stamina Potions you need to reach your damage milestone
            </p>
          </div>

          {/* Calculator Card */}
          <GlassCard glowColor={THEME_COLOR} className="animate-in fade-in slide-in-from-bottom duration-700 delay-150">
            <div className="space-y-6">
              <CalculatorInput
                label="Damage per Slash"
                value={damagePerSlash}
                onChange={setDamagePerSlash}
                placeholder="Enter damage"
                glowColor={THEME_COLOR}
              />

              <CalculatorInput
                label="Stamina Stat"
                value={stamina}
                onChange={setStamina}
                placeholder="Enter stamina"
                glowColor={THEME_COLOR}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground/90">Target Damage Goal</Label>
                <RadioGroup value={targetDamage} onValueChange={setTargetDamage}>
                  <div className="grid grid-cols-2 gap-3">
                    {targetOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                          targetDamage === option.value
                            ? 'bg-red-500/20 border-red-500 shadow-glow-sm'
                            : 'border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-red-500/30'
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="sr-only" />
                        <Target className="w-4 h-4 text-red-500" />
                        <span className="font-orbitron font-semibold">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {targetDamage === "custom" && (
                <CalculatorInput
                  label="Custom Target Damage"
                  value={customDamage}
                  onChange={setCustomDamage}
                  placeholder="Enter target damage"
                  glowColor={THEME_COLOR}
                />
              )}

              <Button
                onClick={calculateFspNeeded}
                className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-glow transition-all duration-300"
                disabled={!damagePerSlash || !stamina || (targetDamage === "custom" && !customDamage)}
              >
                <FlaskConical className="w-5 h-5 mr-2 text-white" />
                Estimate FSP Needed
              </Button>
            </div>
          </GlassCard>

          {/* Result */}
          {result !== null && (
            <ResultCard
              title="Full Stamina Potions Required"
              value={result}
              subtitle={`You'll need ${result} FSP to reach your goal`}
              icon={<FlaskConical className="w-8 h-8" style={{ color: THEME_COLOR }} />}
              glowColor={THEME_COLOR}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground pb-8">
        <p>VOID Tools — calculations assume no crit multipliers</p>
      </footer>
    </div>
  );
};

export default FspNeeded;