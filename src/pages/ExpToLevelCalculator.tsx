import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

// Experience calculation function using the quadratic formula
const calculateExpForNextLevel = (level: number): number => {
  // Exp(L) = ⌊6.25 × (L+1)^2 + 100⌋
  return Math.floor(6.25 * Math.pow(level + 1, 2) + 100);
};

// Calculate total EXP needed to reach a specific level from level 0
const calculateTotalExpToLevel = (targetLevel: number): number => {
  if (targetLevel <= 0) return 0;
  
  let totalExp = 0;
  for (let level = 0; level < targetLevel; level++) {
    totalExp += calculateExpForNextLevel(level);
  }
  return totalExp;
};

// Calculate EXP needed to reach target level from current level
const calculateExpDifference = (currentLevel: number, targetLevel: number): number => {
  if (targetLevel <= currentLevel) return 0;
  
  let totalExp = 0;
  for (let level = currentLevel; level < targetLevel; level++) {
    totalExp += calculateExpForNextLevel(level);
  }
  return totalExp;
};

const ExpToLevelCalculator = () => {
  const [currentLevel, setCurrentLevel] = useState("");
  const [targetLevel, setTargetLevel] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [totalExpResult, setTotalExpResult] = useState<number | null>(null);

  const calculateExpNeeded = () => {
    const current = parseInt(currentLevel) || 0;
    const target = parseInt(targetLevel) || 0;
    
    if (target <= current) {
      setResult(0);
      return;
    }
    
    const expNeeded = calculateExpDifference(current, target);
    const totalExp = calculateTotalExpToLevel(target);
    
    setResult(expNeeded);
    setTotalExpResult(totalExp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-primary/30 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              EXP to Level Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate how much EXP you need to reach a specific level
            </p>
          </div>

          <div className="grid gap-8">
            {/* EXP Calculator */}
            <GlassCard glowColor="hsl(210, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">EXP Calculation</h2>
                </div>

                <CalculatorInput
                  label="Current Level"
                  value={currentLevel}
                  onChange={setCurrentLevel}
                  placeholder="Enter your current level"
                  type="number"
                />

                <CalculatorInput
                  label="Target Level"
                  value={targetLevel}
                  onChange={setTargetLevel}
                  placeholder="Enter target level"
                  type="number"
                />

                <Button
                  onClick={calculateExpNeeded}
                  className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-glow transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate EXP Needed
                </Button>

                {/* Results */}
                {result !== null && (
                  <div className="space-y-4">
                    <ResultCard
                      title="EXP Needed"
                      value={result.toLocaleString()}
                      subtitle="Total EXP required to reach target level"
                      icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
                      glowColor="hsl(210, 100%, 70%)"
                    />
                    
                    {totalExpResult !== null && (
                      <ResultCard
                        title="Total EXP to Target Level"
                        value={totalExpResult.toLocaleString()}
                        subtitle="Cumulative EXP from level 0 to target level"
                        icon={<Calculator className="w-8 h-8 text-cyan-500" />}
                        glowColor="hsl(180, 100%, 70%)"
                      />
                    )}
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Information Section */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom duration-700">
              <h3 className="text-xl font-orbitron font-bold mb-4 text-foreground">How It Works</h3>
              <div>
                <h4 className="font-orbitron font-semibold text-blue-500 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  EXP Calculation Process
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>1. Enter your current character level</li>
                  <li>2. Enter your target level</li>
                  <li>3. The calculator determines how much EXP you need to reach that level</li>
                  <li>4. Shows both the EXP needed from your current level and total EXP to reach the target level</li>
                </ul>
              </div>
              
              {/* Formula Information */}
              <div className="mt-6 pt-6 border-t border-primary/20">
                <h4 className="font-orbitron font-semibold text-foreground mb-2">Experience Formula</h4>
                <p className="text-muted-foreground text-sm">
                  EXP required for next level: Exp(L) = ⌊6.25 × (L+1)² + 100⌋
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  This quadratic formula means each level requires progressively more EXP than the previous one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground pb-8">
        <p>VOID Tools — calculations based on quadratic formula</p>
      </footer>
    </div>
  );
};

export default ExpToLevelCalculator;