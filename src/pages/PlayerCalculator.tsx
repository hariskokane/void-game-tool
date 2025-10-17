import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

// Experience calculation function using the quadratic formula
const calculateExpForNextLevel = (level: number): number => {
  // Exp(L) = ⌊6.25 × (L+1)^2 + 100⌋
  return Math.floor(6.25 * Math.pow(level + 1, 2) + 100);
};

// Generate experience table using the formula (levels 0-10000)
const generateExpTable = (): number[] => {
  const table = [0]; // Level 0 requires 0 EXP
  for (let level = 0; level < 10000; level++) {
    table.push(calculateExpForNextLevel(level));
  }
  return table;
};

// Character EXP requirements (levels 0-10000)
const EXP_TABLE = generateExpTable();

const PlayerCalculator = () => {
  // Character state
  const [characterLevel, setCharacterLevel] = useState("");
  const [characterExp, setCharacterExp] = useState("");
  const [gainedExp, setGainedExp] = useState("");
  const [characterResult, setCharacterResult] = useState<{ level: number; exp: number } | null>(null);
  const [detailedCalculation, setDetailedCalculation] = useState<Array<{ level: number; expRequired: number; expRemaining: number }> | null>(null);

  const calculateCharacterLevel = () => {
    const currentLevel = parseInt(characterLevel) || 0;
    const currentExp = parseInt(characterExp) || 0;
    const gainedExpValue = parseInt(gainedExp) || 0;

    if (currentLevel < 0) return;

    let totalExp = currentExp + gainedExpValue;
    let newLevel = currentLevel;
    const calculationSteps: Array<{ level: number; expRequired: number; expRemaining: number }> = [];

    // Level up while we have enough EXP
    // Continue until we can't level up anymore or reach max level
    while (newLevel + 1 < EXP_TABLE.length && totalExp >= EXP_TABLE[newLevel + 1]) {
      const expRequired = EXP_TABLE[newLevel + 1];
      totalExp -= expRequired;
      newLevel++;
      
      calculationSteps.push({
        level: newLevel,
        expRequired,
        expRemaining: totalExp
      });
      
      // Limit detailed steps to prevent performance issues
      if (calculationSteps.length > 50) {
        calculationSteps.push({
          level: newLevel,
          expRequired: 0,
          expRemaining: totalExp
        });
        break;
      }
    }

    setCharacterResult({ level: newLevel, exp: totalExp });
    setDetailedCalculation(calculationSteps);
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
              Player Level Progression Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate how much your Character will level up based on gained EXP with detailed breakdown
            </p>
          </div>

          <div className="grid gap-8">
            {/* Character Level-Up Calculator */}
            <GlassCard glowColor="hsl(210, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Character Level-Up</h2>
                </div>

                <CalculatorInput
                  label="Current Character Level"
                  value={characterLevel}
                  onChange={setCharacterLevel}
                  placeholder="Enter current level"
                  type="number"
                />

                <CalculatorInput
                  label="Current Character EXP (Optional)"
                  value={characterExp}
                  onChange={setCharacterExp}
                  placeholder="Enter current EXP"
                  type="number"
                />

                <CalculatorInput
                  label="Gained EXP"
                  value={gainedExp}
                  onChange={setGainedExp}
                  placeholder="Enter gained EXP"
                  type="number"
                />

                <Button
                  onClick={calculateCharacterLevel}
                  className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-glow transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Character Level
                </Button>

                {/* Character Result */}
                {characterResult !== null && (
                  <ResultCard
                    title="New Character Level"
                    value={characterResult.level.toString()}
                    subtitle={`Remaining EXP: ${characterResult.exp.toLocaleString()}`}
                    icon={<User className="w-8 h-8 text-blue-500" />}
                    glowColor="hsl(210, 100%, 70%)"
                  />
                )}
              </div>
            </GlassCard>

            {/* Detailed Calculation */}
            {detailedCalculation !== null && detailedCalculation.length > 0 && (
              <GlassCard glowColor="hsl(210, 100%, 70%)" className="animate-in fade-in slide-in-from-bottom duration-700">
                <div className="space-y-4">
                  <h3 className="text-xl font-orbitron font-bold text-foreground flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-500" />
                    Detailed Calculation Breakdown
                  </h3>
                  
                  <div className="bg-secondary/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4 font-orbitron text-sm font-semibold text-muted-foreground border-b border-primary/20 pb-2 mb-2">
                      <div>Level</div>
                      <div>EXP Required</div>
                      <div>EXP Remaining</div>
                    </div>
                    
                    {detailedCalculation.map((step, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-primary/10 last:border-0">
                        <div className="font-orbitron font-semibold text-blue-500">Level {step.level}</div>
                        <div>{step.expRequired.toLocaleString()} EXP</div>
                        <div>{step.expRemaining.toLocaleString()} EXP</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Information Section */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom duration-700">
              <h3 className="text-xl font-orbitron font-bold mb-4 text-foreground">How It Works</h3>
              <div>
                <h4 className="font-orbitron font-semibold text-blue-500 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Character Level-Up Process
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>1. Enter your current character level (0-9999)</li>
                  <li>2. Add your current EXP (optional, useful for mid-level progress)</li>
                  <li>3. Enter the EXP you will gain</li>
                  <li>4. The calculator determines how many levels you'll gain</li>
                  <li>5. Shows remaining EXP after leveling up</li>
                  <li>6. Detailed breakdown shows each level gained step-by-step</li>
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

export default PlayerCalculator;