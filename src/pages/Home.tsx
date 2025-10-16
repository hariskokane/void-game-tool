import { Link } from "react-router-dom";
import { FlaskConical, Swords, Timer, ChevronRight, TrendingUp, User, PawPrint } from "lucide-react";
import Navigation from "@/components/Navigation";

const Home = () => {
  const tools = [
    {
      id: "damage",
      title: "Damage per FSP",
      description: "Calculate total damage from one Full Stamina Potion based on your stats.",
      icon: <Swords className="w-8 h-8" />,
      path: "/damage-per-fsp",
      color: "from-violet-500 to-purple-600",
      glow: "shadow-violet-500/50"
    },
    {
      id: "fsp",
      title: "FSP Needed",
      description: "Estimate how many potions you need to reach damage milestones (500M-2B).",
      icon: <FlaskConical className="w-8 h-8" />,
      path: "/fsp-needed",
      color: "from-red-500 to-orange-600",
      glow: "shadow-red-500/50"
    },
    {
      id: "stamina",
      title: "Stamina Regen",
      description: "Check how much stamina you regenerate per hour based on your stats.",
      icon: <Timer className="w-8 h-8" />,
      path: "/stamina-regen",
      color: "from-teal-500 to-cyan-600",
      glow: "shadow-teal-500/50"
    },
    {
      id: "level",
      title: "Level Progression",
      description: "Calculate character and pet level progression with detailed breakdowns.",
      icon: <TrendingUp className="w-8 h-8" />,
      path: "/level-calculator",
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/50"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 animate-in fade-in slide-in-from-top duration-700 bg-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-600 bg-clip-text text-transparent">
            VOID Game Tools
          </h1>
          <img 
            src="/void2.png" 
            alt="VOID Game Tools" 
            className="w-64 h-64 mx-auto object-contain rounded-2xl"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            Plan your raid strategy with our suite of calculators including Damage per FSP, FSP Needed, Stamina Regen, and Level Progression tools. Each tool provides fast, accurate calculations based on in-game formulas with no critical hits considered, pure stats only.
          </p>
        </div>

        {/* Tool Buttons Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="group relative bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03]"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10 space-y-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg ${tool.glow}`}>
                  {tool.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
                
                <Link 
                  to={tool.path}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${tool.color} text-white font-orbitron font-semibold transition-all duration-300 hover:shadow-lg ${tool.glow.replace('shadow', 'hover:shadow')}`}
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
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/damage-per-fsp" className="text-muted-foreground hover:text-foreground transition-colors">
                Damage
              </Link>
              <Link to="/fsp-needed" className="text-muted-foreground hover:text-foreground transition-colors">
                FSP Planner
              </Link>
              <Link to="/stamina-regen" className="text-muted-foreground hover:text-foreground transition-colors">
                Stamina Regen
              </Link>
              <Link to="/level-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                Level Progression
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