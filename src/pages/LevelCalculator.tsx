import { useState } from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import CalculatorInput from "@/components/CalculatorInput";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { User, PawPrint, ArrowLeft, TrendingUp, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

// Experience calculation function using the quadratic formula
const calculateExpForNextLevel = (level: number): number => {
  // Exp(L) = ⌊6.25 × (L+1)^2 + 100⌋
  return Math.floor(6.25 * Math.pow(level + 1, 2) + 100);
};

// Generate experience table using the formula (levels 0-100)
const generateExpTable = (): number[] => {
  const table = [0]; // Level 0 requires 0 EXP
  for (let level = 0; level < 100; level++) {
    table.push(calculateExpForNextLevel(level));
  }
  return table;
};

// Character and Pet EXP requirements (levels 0-100)
const EXP_TABLE = generateExpTable();

const LevelCalculator = () => {
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
            
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Level Progression Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate how much your Character and Pet will level up with detailed breakdowns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Player Calculator Card */}
            <GlassCard glowColor="hsl(210, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Player Calculator</h2>
                </div>

                <p className="text-muted-foreground">
                  Calculate character level progression based on gained EXP with detailed step-by-step breakdown.
                </p>

                <Link 
                  to="/player-calculator"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-orbitron font-semibold transition-all duration-300 hover:shadow-glow"
                >
                  Open Player Calculator
                </Link>
              </div>
            </GlassCard>

            {/* Pet Calculator Card */}
            <GlassCard glowColor="hsl(270, 100%, 70%)" className="animate-in fade-in slide-in-from-right duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <PawPrint className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Pet Calculator</h2>
                </div>

                <p className="text-muted-foreground">
                  Calculate pet level progression based on pet foods used with detailed step-by-step breakdown.
                </p>

                <Link 
                  to="/pet-calculator"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-orbitron font-semibold transition-all duration-300 hover:shadow-glow"
                >
                  Open Pet Calculator
                </Link>
              </div>
            </GlassCard>
            
            {/* EXP to Level Calculator Card */}
            <GlassCard glowColor="hsl(120, 100%, 70%)" className="animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">EXP to Level Calculator</h2>
                </div>

                <p className="text-muted-foreground">
                  Calculate how much EXP you need to reach a specific level from your current level.
                </p>

                <Link 
                  to="/exp-to-level"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-orbitron font-semibold transition-all duration-300 hover:shadow-glow"
                >
                  Open EXP Calculator
                </Link>
              </div>
            </GlassCard>
            
            {/* Food to Level Calculator Card */}
            <GlassCard glowColor="hsl(330, 100%, 70%)" className="animate-in fade-in slide-in-from-right duration-700">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/20">
                    <Calculator className="w-6 h-6 text-pink-500" />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Food to Level Calculator</h2>
                </div>

                <p className="text-muted-foreground">
                  Calculate how much food you need to level up your pet to a specific level.
                </p>

                <Link 
                  to="/food-to-level"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-orbitron font-semibold transition-all duration-300 hover:shadow-glow"
                >
                  Open Food Calculator
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* Information Section */}
          <div className="bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom duration-700">
            <h3 className="text-xl font-orbitron font-bold mb-4 text-foreground">How Level Progression Works</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-orbitron font-semibold text-blue-500 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Player Progression
                </h4>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Enter your current character level</li>
                  <li>• Add current EXP (optional)</li>
                  <li>• Enter gained EXP</li>
                  <li>• See detailed level-by-level progression</li>
                </ul>
              </div>
              <div>
                <h4 className="font-orbitron font-semibold text-purple-500 mb-2 flex items-center gap-2">
                  <PawPrint className="w-4 h-4" />
                  Pet Progression
                </h4>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Enter your current pet level</li>
                  <li>• Add current EXP (optional)</li>
                  <li>• Enter number of pet foods used</li>
                  <li>• Select food type (S, M, XL)</li>
                  <li>• See detailed level-by-level progression</li>
                </ul>
              </div>
            </div>
            
            {/* Formula Information */}
            <div className="mt-6 pt-6 border-t border-primary/20">
              <h4 className="font-orbitron font-semibold text-foreground mb-2">Experience Formula</h4>
              <p className="text-muted-foreground text-sm">
                EXP required for next level: Exp(L) = ⌊6.25 × (L+1)² + 100⌋
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                This quadratic formula applies to both character and pet progression, meaning each level requires progressively more EXP.
              </p>
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

export default LevelCalculator;