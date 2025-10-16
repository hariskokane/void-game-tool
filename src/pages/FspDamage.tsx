import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Swords, Sparkles } from "lucide-react";

const FspDamage = () => {
  const [damagePerSlash, setDamagePerSlash] = useState("");
  const [stamina, setStamina] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const THEME_COLOR = "hsl(265, 85%, 65%)";
  const THEME_GLOW = "hsl(265, 100%, 75%)";

  const calculateDamage = () => {
    const damage = parseFloat(damagePerSlash);
    const stam = parseFloat(stamina);

    if (!isNaN(damage) && !isNaN(stam)) {
      const totalDamage = damage * stam;
      setResult(totalDamage);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-primary/30">
              <Swords className="w-6 h-6 text-violet-500" />
              <span className="font-orbitron font-semibold text-violet-500">
                FSP Damage Calculator
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Damage per Full Stamina Potion
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Calculate the total damage you can deal with one Full Stamina Potion based on your stats
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

              <Button
                onClick={calculateDamage}
                className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-glow transition-all duration-300"
                disabled={!damagePerSlash || !stamina}
              >
                <Swords className="w-5 h-5 mr-2 text-white" />
                Calculate Damage
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <Sparkles className="w-4 h-4" />
                <span>No critical hits are considered — this is pure base damage</span>
              </div>
            </div>
          </GlassCard>

          {/* Result */}
          {result !== null && (
            <ResultCard
              title="Total Damage per FSP"
              value={formatNumber(result)}
              subtitle={`${result.toLocaleString()} damage points`}
              icon={<Swords className="w-8 h-8" style={{ color: THEME_COLOR }} />}
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

export default FspDamage;