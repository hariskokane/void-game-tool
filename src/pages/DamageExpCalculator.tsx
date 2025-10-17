import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sword, ArrowLeft, Calculator, TrendingUp, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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

// Predefined damage milestones
const DAMAGE_MILESTONES = [
  { id: "500m", name: "500M", value: 500000000 },
  { id: "1b", name: "1B", value: 1000000000 },
  { id: "2b", name: "2B", value: 2000000000 },
  { id: "custom", name: "Custom", value: 0 }
];

const DamageExpCalculator = () => {
  // State for user inputs
  const [playerLevel, setPlayerLevel] = useState("");
  const [damagePerSlash, setDamagePerSlash] = useState("");
  const [staminaStat, setStaminaStat] = useState("");
  const [desiredDamage, setDesiredDamage] = useState("");
  const [expPerMob, setExpPerMob] = useState("0.01");
  const [selectedDamageOption, setSelectedDamageOption] = useState("custom");
  
  // State for results
  const [totalExp, setTotalExp] = useState<number | null>(null);
  const [newLevel, setNewLevel] = useState<number | null>(null);
  const [fspNeeded, setFspNeeded] = useState<number | null>(null);
  const [expRemaining, setExpRemaining] = useState<number | null>(null);

  // Handle damage option selection
  const handleDamageOptionSelect = (optionId: string) => {
    setSelectedDamageOption(optionId);
    const option = DAMAGE_MILESTONES.find(opt => opt.id === optionId);
    if (option && optionId !== "custom") {
      setDesiredDamage(option.value.toString());
    }
  };

  const calculateDamageExp = () => {
    const level = parseInt(playerLevel) || 0;
    const dmgPerSlash = parseFloat(damagePerSlash) || 0;
    const stamina = parseInt(staminaStat) || 0;
    const desiredDmg = parseFloat(desiredDamage) || 0;
    const expPerMobValue = parseFloat(expPerMob) || 0.01;
    
    if (level < 0 || dmgPerSlash <= 0 || stamina <= 0 || desiredDmg <= 0) {
      return;
    }
    
    // Calculate total EXP based on desired damage and EXP from mob
    // Formula: Total EXP = EXP from mob × Desired damage
    const totalExpValue = expPerMobValue * desiredDmg;
    setTotalExp(totalExpValue);
    
    // Calculate new level after gaining EXP (using the same logic as PlayerCalculator)
    let totalExp = totalExpValue; // Start with the gained EXP
    let newLevelValue = level; // Start with current level
    
    // Level up while we have enough EXP
    // Continue until we can't level up anymore or reach max level
    while (newLevelValue + 1 < EXP_TABLE.length && totalExp >= EXP_TABLE[newLevelValue + 1]) {
      const expRequired = EXP_TABLE[newLevelValue + 1];
      totalExp -= expRequired;
      newLevelValue++;
    }
    
    setNewLevel(newLevelValue);
    setExpRemaining(totalExp);
    
    // Calculate FSP needed (using the same formula as FSP Needed calculator)
    // FSP Needed = Desired Damage / (Damage per Slash × Stamina)
    const fspNeededValue = Math.ceil(desiredDmg / (dmgPerSlash * stamina));
    setFspNeeded(fspNeededValue);
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
            
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              One for All Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate EXP gain, level progression, and FSP needed based on damage output
            </p>
          </div>

          <div className="grid gap-8">
            {/* Calculator */}
            <GlassCard glowColor="hsl(15, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Sword className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">One for All Calculation</h2>
                </div>

                <CalculatorInput
                  label="Player Level"
                  value={playerLevel}
                  onChange={setPlayerLevel}
                  placeholder="Enter your current level"
                  type="number"
                />

                <CalculatorInput
                  label="Damage per Slash"
                  value={damagePerSlash}
                  onChange={setDamagePerSlash}
                  placeholder="Enter damage per slash"
                  type="number"
                />

                <CalculatorInput
                  label="Stamina Stat"
                  value={staminaStat}
                  onChange={setStaminaStat}
                  placeholder="Enter your stamina stat"
                  type="number"
                />

                {/* Damage Options */}
                <div className="space-y-3">
                  <label className="text-sm font-orbitron text-foreground">Damage Goal</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {DAMAGE_MILESTONES.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleDamageOptionSelect(option.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-orbitron transition-all ${
                          selectedDamageOption === option.id
                            ? "bg-red-500 text-white shadow-glow"
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary/70"
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Damage Input */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/90">Desired Total Damage</Label>
                  <Input
                    type="number"
                    value={desiredDamage}
                    onChange={(e) => {
                      setDesiredDamage(e.target.value);
                      if (selectedDamageOption !== "custom") {
                        setSelectedDamageOption("custom");
                      }
                    }}
                    placeholder="Enter desired total damage"
                    className={cn(
                      "bg-input/50 border-border/50 text-foreground",
                      "focus:border-2 focus:bg-input/70 transition-all duration-300",
                      "font-mono text-lg h-12"
                    )}
                    disabled={selectedDamageOption !== "custom"}
                  />
                </div>

                <CalculatorInput
                  label="EXP from Mob (Default: 0.01)"
                  value={expPerMob}
                  onChange={setExpPerMob}
                  placeholder="0.01"
                  type="number"
                />

                <Button
                  onClick={calculateDamageExp}
                  className="w-full h-14 text-lg font-orbitron font-semibold bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-glow transition-all duration-300"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate One for All
                </Button>

                {/* Results */}
                {totalExp !== null && (
                  <div className="space-y-4">
                    <ResultCard
                      title="Total EXP Gained"
                      value={totalExp.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      subtitle="Based on damage output and EXP from mob"
                      icon={<Calculator className="w-8 h-8 text-red-500" />}
                      glowColor="hsl(15, 100%, 70%)"
                    />
                    
                    {newLevel !== null && expRemaining !== null && (
                      <ResultCard
                        title="New Player Level"
                        value={newLevel.toString()}
                        subtitle={`Remaining EXP: ${expRemaining.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                        icon={<TrendingUp className="w-8 h-8 text-orange-500" />}
                        glowColor="hsl(30, 100%, 70%)"
                      />
                    )}
                    
                    {fspNeeded !== null && (
                      <ResultCard
                        title="FSP Needed"
                        value={fspNeeded.toString()}
                        subtitle="Based on stamina consumption"
                        icon={<FlaskConical className="w-8 h-8 text-yellow-500" />}
                        glowColor="hsl(45, 100%, 70%)"
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
                <h4 className="font-orbitron font-semibold text-red-500 mb-2 flex items-center gap-2">
                  <Sword className="w-4 h-4" />
                  One for All Calculation Process
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>1. Enter your current player level</li>
                  <li>2. Enter your damage per slash</li>
                  <li>3. Enter your stamina stat</li>
                  <li>4. Select a damage goal or enter custom damage</li>
                  <li>5. Enter EXP received from mob (default 0.01)</li>
                  <li>6. The calculator determines total EXP gained from damage</li>
                  <li>7. Calculates new level after gaining that EXP</li>
                  <li>8. Estimates FSP needed based on stamina consumption</li>
                </ul>
              </div>
              
              {/* Formula Information */}
              <div className="mt-6 pt-6 border-t border-primary/20">
                <h4 className="font-orbitron font-semibold text-foreground mb-2">Calculation Details</h4>
                <p className="text-muted-foreground text-sm">
                  Total EXP = EXP from mob × Desired damage
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  FSP Needed = ⌈Desired damage ÷ (Damage per slash × Stamina)⌉
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Level progression uses the standard VOID EXP formula: Exp(L) = ⌊6.25 × (L+1)² + 100⌋
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground pb-8">
        <p>VOID Tools — calculations based on game formulas</p>
      </footer>
    </div>
  );
};

export default DamageExpCalculator;