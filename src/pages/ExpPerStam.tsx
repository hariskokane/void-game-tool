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

    if (!isNaN(lvl) && lvl > 0) {
      // Corrected Formula: (0.2 * ((LVL + 1) * 2.5)^2 + 100) / (5 * (LVL - 1) + 20)
      const base = (lvl + 1) * 2.5;
      const numerator = 0.2 * Math.pow(base, 2) + 100;
      const denominator = 5 * (lvl - 1) + 20;
      const expPerStam = numerator / denominator;
      
      // Round to nearest whole number
      setResult(Math.round(expPerStam));
    } else {
      setResult(null);
    }
  };

  // Modified to display whole numbers
  const formatNumber = (num: number) => {
    // First round the number to handle any floating point issues
    const roundedNum = Math.round(num);
    
    if (roundedNum >= 1e9) return `${(roundedNum / 1e9).toFixed(2)}B`;
    if (roundedNum >= 1e6) return `${(roundedNum / 1e6).toFixed(2)}M`;
    if (roundedNum >= 1e3) return `${(roundedNum / 1e3).toFixed(2)}K`;
    return roundedNum.toString(); // Return as whole number string
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
                {/* Updated formula text display */}
                <span>Formula: (0.2 × ((LVL + 1) × 2.5)² + 100) / (5 × (LVL - 1) + 20)</span>
              </div>
            </div>
          </GlassCard>

          {/* Result */}
          {result !== null && (
            <div className="space-y-6">
              <ResultCard
                title="EXP per Stamina"
                value={formatNumber(result)}
                subtitle={`${result} experience points per stamina`}
                icon={<Zap className="w-8 h-8" style={{ color: THEME_COLOR }} />}
                glowColor={THEME_COLOR}
              />
              
              {/* EXP for Multiple Slashes */}
              <GlassCard glowColor={THEME_COLOR} className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-yellow-500 text-center">
                    EXP per Slash Count
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-yellow-500/20">
                      <div className="text-lg font-orbitron font-semibold text-yellow-500">
                        {formatNumber(result * 10)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        10 Slashes
                      </div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-yellow-500/20">
                      <div className="text-lg font-orbitron font-semibold text-yellow-500">
                        {formatNumber(result * 50)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        50 Slashes
                      </div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-yellow-500/20">
                      <div className="text-lg font-orbitron font-semibold text-yellow-500">
                        {formatNumber(result * 100)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        100 Slashes
                      </div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg border border-yellow-500/20">
                      <div className="text-lg font-orbitron font-semibold text-yellow-500">
                        {formatNumber(result * 200)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        200 Slashes
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Total EXP gained for different numbers of stamina slashes
                  </div>
                </div>
              </GlassCard>
            </div>
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
