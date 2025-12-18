import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { PawPrint, ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const MAX_PET_LEVEL = 100;

// Experience calculation function using the quadratic formula
const calculateExpForNextLevel = (level: number): number => {
  // Exp(L) = ⌊6.25 × (L+1)^2 + 100⌋
  return Math.floor(6.25 * Math.pow(level + 1, 2) + 100);
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

// Food types with their EXP values
const FOOD_TYPES = [
  { id: "s", name: "Arcane Treat S", exp: 300 },
  { id: "m", name: "Arcane Treat M", exp: 9000 },
  { id: "xl", name: "Arcane Treat XL", exp: 100000 }
];

const FoodToLevelCalculator = () => {
  const [currentLevel, setCurrentLevel] = useState("");
  const [targetLevel, setTargetLevel] = useState("");
  const [results, setResults] = useState<Array<{ name: string; count: number; expPerFood: number }> | null>(null);

  const calculateFoodNeeded = () => {
    const current = parseInt(currentLevel) || 0;
    const target = parseInt(targetLevel) || 0;
    
    if (target <= current || current < 0 || target > MAX_PET_LEVEL) {
      setResults([]);
      return;
    }
    
    const expNeeded = calculateExpDifference(current, target);
    
    const foodResults = FOOD_TYPES.map(food => {
      const count = Math.ceil(expNeeded / food.exp);
      return {
        name: food.name,
        count,
        expPerFood: food.exp
      };
    });
    
    setResults(foodResults);
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
            
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pet Food Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate how much food you need to level up your pet to a specific level
            </p>
          </div>

          <div className="grid gap-8">
            {/* Food Calculator */}
            <GlassCard glowColor="hsl(270, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <PawPrint className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Food Calculation</h2>
                </div>

                <CalculatorInput
                  label="Current Pet Level"
                  value={currentLevel}
                  onChange={setCurrentLevel}
                  placeholder={`Enter current pet level (0-${MAX_PET_LEVEL - 1})`}
                  type="number"
                />

                <CalculatorInput
                  label="Target Pet Level"
                  value={targetLevel}
                  onChange={setTargetLevel}
                  placeholder={`Enter target pet level (0-${MAX_PET_LEVEL})`}
                  type="number"
                />

                <Button
                  onClick={calculateFoodNeeded}
                  className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-glow transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Food Needed
                </Button>

                {/* Results */}
                {results !== null && results.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-orbitron font-bold text-foreground">Food Requirements</h3>
                    <div className="grid gap-4">
                      {results.map((result, index) => (
                        <ResultCard
                          key={index}
                          title={result.name}
                          value={result.count.toString()}
                          subtitle={`Provides ${result.expPerFood.toLocaleString()} EXP per food`}
                          icon={<PawPrint className="w-8 h-8 text-purple-500" />}
                          glowColor="hsl(270, 100%, 70%)"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {results !== null && results.length === 0 && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-500 font-orbitron font-semibold">
                      Invalid input: Target level must be higher than current level and within 0-{MAX_PET_LEVEL} range
                    </p>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Information Section */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom duration-700">
              <h3 className="text-xl font-orbitron font-bold mb-4 text-foreground">How It Works</h3>
              <div>
                <h4 className="font-orbitron font-semibold text-purple-500 mb-2 flex items-center gap-2">
                  <PawPrint className="w-4 h-4" />
                  Food Calculation Process
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>1. Enter your current pet level (0-{MAX_PET_LEVEL - 1})</li>
                  <li>2. Enter your target pet level (maximum {MAX_PET_LEVEL})</li>
                  <li>3. The calculator determines how much food you need of each type</li>
                  <li>4. Results show the minimum number of each food type needed</li>
                </ul>
              </div>
              
              {/* Food Types Information */}
              <div className="mt-6 pt-6 border-t border-primary/20">
                <h4 className="font-orbitron font-semibold text-foreground mb-2">Pet Food Types</h4>
                <div className="grid gap-3 mt-3">
                  {FOOD_TYPES.map((food, index) => (
                    <div key={index} className="flex justify-between items-center bg-secondary/50 p-3 rounded-lg">
                      <span className="font-orbitron font-semibold text-purple-500">{food.name}</span>
                      <span className="text-muted-foreground">{food.exp.toLocaleString()} EXP per food</span>
                    </div>
                  ))}
                </div>
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

export default FoodToLevelCalculator;
