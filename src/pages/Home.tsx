import { Link } from "react-router-dom";
import { FlaskConical, Swords, Timer, ChevronRight, TrendingUp, User, PawPrint, Zap, Calculator, House } from "lucide-react";
import Navigation from "@/components/Navigation";

const Home = () => {
  const tools = [
    {
      id: "damage",
      title: "FSP Damage Calculator",
      description: "Calculate total damage from one Full Stamina Potion based on your stats.",
      icon: <Swords className="w-8 h-8" />,
      path: "/damage-per-fsp",
      color: "from-violet-500 to-purple-600",
      glow: "shadow-violet-500/50"
    },
    {
      id: "fsp",
      title: "FSP Needed Calculator",
      description: "Estimate how many potions you need to reach damage milestones (500M-2B).",
      icon: <FlaskConical className="w-8 h-8" />,
      path: "/fsp-needed",
      color: "from-red-500 to-orange-600",
      glow: "shadow-red-500/50"
    },
    {
      id: "stamina",
      title: "Stamina Regen Calculator",
      description: "Check how much stamina you regenerate per hour based on your stats.",
      icon: <Timer className="w-8 h-8" />,
      path: "/stamina-regen",
      color: "from-teal-500 to-cyan-600",
      glow: "shadow-teal-500/50"
    },
    {
      id: "exp-stam",
      title: "EXP per Stamina Calculator",
      description: "Calculate experience points gained per stamina point based on your level.",
      icon: <Zap className="w-8 h-8" />,
      path: "/exp-per-stam",
      color: "from-yellow-500 to-amber-600",
      glow: "shadow-yellow-500/50"
    },
    {
      id: "one-for-all",
      title: "One for All Calculator",
      description: "Calculate EXP gain, level progression, and FSP needed based on damage output.",
      icon: <Calculator className="w-8 h-8" />,
      path: "/damage-exp",
      color: "from-red-500 to-orange-500",
      glow: "shadow-red-500/50"
    },
    {
      id: "level",
      title: "Level Progression",
      description: "Overview of character and pet level progression tools.",
      icon: <TrendingUp className="w-8 h-8" />,
      path: "/level-calculator",
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50"
    },
    {
      id: "player-exp",
      title: "Player EXP Calculator",
      description: "Calculate how much EXP you need to reach specific character levels.",
      icon: <User className="w-8 h-8" />,
      path: "/player-calculator",
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50"
    },
    {
      id: "pet-food",
      title: "Pet Food Calculator",
      description: "Calculate how pet foods level up your pets with different food types.",
      icon: <PawPrint className="w-8 h-8" />,
      path: "/pet-calculator",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/50"
    },
    {
      id: "exp-level",
      title: "EXP to Level Calculator",
      description: "Calculate exact EXP needed to reach any target character level.",
      icon: <Calculator className="w-8 h-8" />,
      path: "/exp-to-level",
      color: "from-green-500 to-emerald-600",
      glow: "shadow-green-500/50"
    },
    {
      id: "food-level",
      title: "Food to Level Calculator",
      description: "Calculate exact pet foods needed to reach any target pet level.",
      icon: <PawPrint className="w-8 h-8" />,
      path: "/food-to-level",
      color: "from-pink-500 to-rose-600",
      glow: "shadow-pink-500/50"
    }
  ];

  const steps = [
    {
      id: 1,
      title: "Choose your calculator",
      icon: <Swords className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Enter your stats",
      icon: <FlaskConical className="w-5 h-5" />
    },
    {
      id: 3,
      title: "View your results instantly",
      icon: <Timer className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Save or copy your data for planning your next raid",
      icon: <ChevronRight className="w-5 h-5" />
    }
  ];

  // Function to scroll to top when navigating
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 animate-in fade-in slide-in-from-top duration-700 bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur-xl opacity-30"></div>
              <img 
                src="/void2.png" 
                alt="VOID Game Tools" 
                className="relative w-32 h-32 md:w-48 md:h-48 object-contain rounded-2xl border-4 border-primary/30 shadow-2xl shadow-primary/20"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-600 bg-clip-text text-transparent">
            VOID Game Tools
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your raid strategy with our suite of calculators. Each tool provides fast, accurate calculations based on in-game formulas with no critical hits considered, pure stats only.
          </p>
        </div>

        {/* Tool Buttons Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="group relative bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10 space-y-4">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg ${tool.glow}`}>
                  {tool.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </div>
                
                <Link 
                  to={tool.path}
                  onClick={handleNavigation}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${tool.color} text-white font-orbitron font-semibold text-sm transition-all duration-300 hover:shadow-lg ${tool.glow.replace('shadow', 'hover:shadow')}`}
                >
                  Open Calculator
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How to Use Section */}
        <div className="max-w-3xl mx-auto bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-8 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            ⚙️ How It Works
          </h2>
          
          <div className="grid gap-6">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  {step.icon}
                </div>
                <p className="text-lg text-foreground">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* New Features Section */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            🚀 New Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary/50 p-4 rounded-xl">
              <h3 className="font-orbitron font-semibold text-purple-500 mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Advanced Pet Foods
              </h3>
              <p className="text-muted-foreground text-sm">
                Calculate pet progression with new food types: Arcane Treat S (300 EXP), M (9,000 EXP), and XL (100,000 EXP).
              </p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-xl">
              <h3 className="font-orbitron font-semibold text-green-500 mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Level Planning
              </h3>
              <p className="text-muted-foreground text-sm">
                Plan your character and pet progression with our new EXP and food requirement calculators.
              </p>
            </div>
            <div className="bg-secondary/50 p-4 rounded-xl">
              <h3 className="font-orbitron font-semibold text-red-500 mb-2 flex items-center gap-2">
                <Swords className="w-5 h-5" />
                One for All
              </h3>
              <p className="text-muted-foreground text-sm">
                Calculate EXP gain, level progression, and FSP needed with our unified damage calculator.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground">
              Created by VOID guild to make raid prep easier.
            </p>
            <p className="text-lg font-orbitron bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Master your numbers — master the VOID.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                Home
              </Link>
              <Link to="/damage-per-fsp" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                FSP Damage
              </Link>
              <Link to="/fsp-needed" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                FSP Needed
              </Link>
              <Link to="/stamina-regen" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                Stamina Regen
              </Link>
              <Link to="/exp-per-stam" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                EXP per Stamina
              </Link>
              <Link to="/damage-exp" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                One for All
              </Link>
              <Link to="/level-calculator" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                Level Progression
              </Link>
              <Link to="/player-calculator" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                Player EXP
              </Link>
              <Link to="/pet-calculator" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                Pet Food
              </Link>
              <Link to="/exp-to-level" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                EXP to Level
              </Link>
              <Link to="/food-to-level" className="text-muted-foreground hover:text-foreground transition-colors" onClick={handleNavigation}>
                Food to Level
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground/60 pt-6">
              © 2025 VOID Game Tools
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;