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

// Generate experience table using the formula (levels 0-MAX_PET_LEVEL)
const generateExpTable = (): number[] => {
  const table = [0]; // Level 0 requires 0 EXP
  for (let level = 0; level < MAX_PET_LEVEL; level++) {
    table.push(calculateExpForNextLevel(level));
  }
  return table;
};

// Pet EXP requirements (levels 0-MAX_PET_LEVEL)
const EXP_TABLE = generateExpTable();

// Food types with their EXP values
const FOOD_TYPES = [
  { id: "s", name: "Arcane Treat S", exp: 300 },
  { id: "m", name: "Arcane Treat M", exp: 9000 },
  { id: "xl", name: "Arcane Treat XL", exp: 100000 }
];

const PetCalculator = () => {
  // Pet state
  const [petLevel, setPetLevel] = useState("");
  const [petExp, setPetExp] = useState("");
  const [petFoods, setPetFoods] = useState("");
  const [foodType, setFoodType] = useState("s"); // Default to Arcane Treat S
  const [petResult, setPetResult] = useState<{ level: number; exp: number } | null>(null);
  const [detailedCalculation, setDetailedCalculation] = useState<Array<{ level: number; expRequired: number; expRemaining: number }> | null>(null);

  const calculatePetLevel = () => {
    const currentLevel = parseInt(petLevel) || 0;
    const currentExp = parseInt(petExp) || 0;
    const petFoodsValue = parseInt(petFoods) || 0;
    
    // Get selected food EXP value
    const selectedFood = FOOD_TYPES.find(food => food.id === foodType);
    const foodExp = selectedFood ? selectedFood.exp : 300; // Default to 300 if not found

    if (currentLevel < 0) return;

    const gainedExp = petFoodsValue * foodExp;
    let totalExp = currentExp + gainedExp;
    let newLevel = currentLevel;
    const calculationSteps: Array<{ level: number; expRequired: number; expRemaining: number }> = [];

    // Level up while we have enough EXP and haven't reached max level
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

    setPetResult({ level: newLevel, exp: totalExp });
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
            
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Pet Level Progression Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate how much your Pet will level up based on pet foods used with detailed breakdown
            </p>
          </div>

          <div className="grid gap-8">
            {/* Pet Level-Up Calculator */}
            <GlassCard glowColor="hsl(270, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <PawPrint className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Pet Level-Up</h2>
                </div>

                <CalculatorInput
                  label="Current Pet Level"
                  value={petLevel}
                  onChange={setPetLevel}
                  placeholder="Enter current level"
                  type="number"
                />

                <CalculatorInput
                  label="Current Pet EXP (Optional)"
                  value={petExp}
                  onChange={setPetExp}
                  placeholder="Enter current EXP"
                  type="number"
                />

                <div className="space-y-2">
                  <label className="text-sm font-orbitron text-foreground">Food Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {FOOD_TYPES.map((food) => (
                      <button
                        key={food.id}
                        onClick={() => setFoodType(food.id)}
                        className={`p-3 rounded-lg border transition-all ${
                          foodType === food.id
                            ? "border-purple-500 bg-purple-500/20 text-purple-500 font-orbitron font-semibold"
                            : "border-primary/30 bg-secondary/50 text-muted-foreground hover:bg-secondary/70"
                        }`}
                      >
                        <div className="text-sm">{food.name}</div>
                        <div className="text-xs text-muted-foreground">{food.exp.toLocaleString()} EXP</div>
                      </button>
                    ))}
                  </div>
                </div>

                <CalculatorInput
                  label={`Number of ${FOOD_TYPES.find(f => f.id === foodType)?.name || "Pet Foods"}`}
                  value={petFoods}
                  onChange={setPetFoods}
                  placeholder="Enter pet foods used"
                  type="number"
                />

                <Button
                  onClick={calculatePetLevel}
                  className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-glow transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Pet Level
                </Button>

                {/* Pet Result */}
                {petResult !== null && (
                  <ResultCard
                    title="New Pet Level"
                    value={petResult.level.toString()}
                    subtitle={`Remaining EXP: ${petResult.exp.toLocaleString()}`}
                    icon={<PawPrint className="w-8 h-8 text-purple-500" />}
                    glowColor="hsl(270, 100%, 70%)"
                  />
                )}
              </div>
            </GlassCard>

            {/* Detailed Calculation */}
            {detailedCalculation !== null && detailedCalculation.length > 0 && (
              <GlassCard glowColor="hsl(270, 100%, 70%)" className="animate-in fade-in slide-in-from-bottom duration-700">
                <div className="space-y-4">
                  <h3 className="text-xl font-orbitron font-bold text-foreground flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-500" />
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
                        <div className="font-orbitron font-semibold text-purple-500">Level {step.level}</div>
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
                <h4 className="font-orbitron font-semibold text-purple-500 mb-2 flex items-center gap-2">
                  <PawPrint className="w-4 h-4" />
                  Pet Level-Up Process
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>1. Enter your current pet level (0-{MAX_PET_LEVEL - 1})</li>
                  <li>2. Add your current EXP (optional, useful for mid-level progress)</li>
                  <li>3. Select the type of pet food you will use</li>
                  <li>4. Enter the number of pet foods you will use</li>
                  <li>5. The calculator determines how many levels you'll gain</li>
                  <li>6. Shows remaining EXP after leveling up</li>
                  <li>7. Detailed breakdown shows each level gained step-by-step</li>
                  <li>8. Maximum pet level is {MAX_PET_LEVEL}</li>
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

export default PetCalculator;
