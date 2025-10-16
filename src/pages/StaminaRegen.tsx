import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Timer, Moon } from "lucide-react";

const StaminaRegen = () => {
  const [level, setLevel] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const THEME_COLOR = "hsl(180, 85%, 55%)";
  const THEME_GLOW = "hsl(180, 70%, 65%)";

  const calculateStaminaRegen = () => {
    const lvl = parseFloat(level);
    const atk = parseFloat(attack);
    const def = parseFloat(defense);

    if (!isNaN(lvl) && !isNaN(atk) && !isNaN(def)) {
      const regenRate = 40 + (lvl / 50) + ((atk + def) / 100);
      setResult(regenRate);
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
              <Timer className="w-6 h-6 text-teal-500" />
              <span className="font-orbitron font-semibold text-teal-500">
                Stamina Recovery System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
              Stamina Regeneration Rate
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Calculate your passive stamina recovery per hour based on your character stats
            </p>
          </div>

          {/* Calculator Card */}
          <GlassCard glowColor={THEME_COLOR} className="animate-in fade-in slide-in-from-bottom duration-700 delay-150">
            <div className="space-y-6">
              <CalculatorInput
                label="Player Level"
                value={level}
                onChange={setLevel}
                placeholder="Enter level"
                glowColor={THEME_COLOR}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <CalculatorInput
                  label="Attack Stat"
                  value={attack}
                  onChange={setAttack}
                  placeholder="Enter attack"
                  glowColor={THEME_COLOR}
                />

                <CalculatorInput
                  label="Defense Stat"
                  value={defense}
                  onChange={setDefense}
                  placeholder="Enter defense"
                  glowColor={THEME_COLOR}
                />
              </div>

              <Button
                onClick={calculateStaminaRegen}
                className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-glow transition-all duration-300"
                disabled={!level || !attack || !defense}
              >
                <Moon className="w-5 h-5 mr-2 text-white" />
                Calculate Regen Rate
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <Timer className="w-4 h-4" />
                <span>Passive stamina recovery — no FSP used</span>
              </div>
            </div>
          </GlassCard>

          {/* Result */}
          {result !== null && (
            <ResultCard
              title="Stamina per Hour"
              value={result.toFixed(2)}
              subtitle="Passive regeneration rate without potions"
              icon={<Timer className="w-8 h-8" style={{ color: THEME_COLOR }} />}
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

export default StaminaRegen;