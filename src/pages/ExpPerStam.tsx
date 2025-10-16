import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles } from "lucide-react";

const ExpPerStam = () => {
  const [level, setLevel] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const THEME_COLOR = "hsl(45, 100%, 50%)"; // Gold/yellow color
  const THEME_GLOW = "hsl(45, 100%, 70%)";

  const calculateExpPerStam = () => {
    const lvl = parseFloat(level);

    if (!isNaN(lvl) && lvl > 1) {
      // Formula: [0.2 × (x + 1) × 2.5]² + 100 / [5 × (x - 1) + 20]
      const numerator = Math.pow(0.2 * (lvl + 1) * 2.5, 2) + 100;
      const denominator = 5 * (lvl - 1) + 20;
      const expPerStam = numerator / denominator;
      
      setResult(expPerStam);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-primary/30">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="font-orbitron font-semibold text-yellow-500">
                EXP Calculator
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
              EXP per Stamina
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Calculate the experience points gained per stamina point based on your level
            </p>
          </div>

          {/* Calculator Card */}
          <GlassCard glowColor={THEME_COLOR} className="animate-in fade-in slide-in-from-bottom duration-700 delay-150">
            <div className="space-y-6">
              <CalculatorInput
                label="Character Level"
                value={level}
                onChange={setLevel}
                placeholder="Enter your level"
                glowColor={THEME_COLOR}
              />

              <Button
                onClick={calculateExpPerStam}
                className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:shadow-glow transition-all duration-300"
                disabled={!level}
              >
                <Zap className="w-5 h-5 mr-2 text-white" />
                Calculate EXP per Stamina
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <Sparkles className="w-4 h-4" />
                <span>Formula: [0.2 × (level + 1) × 2.5]² + 100 / [5 × (level - 1) + 20]</span>
              </div>
            </div>
          </GlassCard>

          {/* Result */}
          {result !== null && (
            <ResultCard
              title="EXP per Stamina"
              value={formatNumber(result)}
              subtitle={`${result.toFixed(2)} experience points per stamina`}
              icon={<Zap className="w-8 h-8" style={{ color: THEME_COLOR }} />}
              glowColor={THEME_COLOR}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground pb-8">
        <p>VOID Tools — calculates experience gain efficiency</p>
      </footer>
    </div>
  );
};

export default ExpPerStam;
