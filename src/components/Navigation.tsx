import { Link, useLocation } from "react-router-dom";
import { Swords, FlaskConical, Timer, TrendingUp, Zap, Menu, Home, Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: Home,
    },
    {
      path: "/damage-per-fsp",
      label: "FSP Dmg",
      icon: Swords,
    },
    {
      path: "/fsp-needed",
      label: "FSP Need",
      icon: FlaskConical,
    },
    {
      path: "/stamina-regen",
      label: "Stamina",
      icon: Timer,
    },
    {
      path: "/exp-per-stam",
      label: "EXP/Stam",
      icon: Zap,
    },
    {
      path: "/damage-exp",
      label: "One for All",
      icon: Calculator,
    },
    {
      path: "/level-calculator",
      label: "Levels",
      icon: TrendingUp,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* Make the logo link to home */}
            <Link to="/" className="w-8 h-8 rounded-full flex items-center justify-center">
              <img 
                src="/void2.png" 
                alt="VOID Game Tools" 
                className="w-full h-full object-contain rounded-full"
              />
            </Link>
            {/* Make the text link to home */}
            <Link to="/" className="text-xl font-orbitron font-bold tracking-wider">
              VOID <span className="text-primary">TOOLS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm",
                    "hover:bg-secondary hover:shadow-glow-sm",
                    isActive && "bg-secondary shadow-glow-sm border border-primary/30"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
            
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border py-2">
          <div className="container mx-auto px-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                    "hover:bg-secondary hover:shadow-glow-sm",
                    isActive && "bg-secondary shadow-glow-sm border border-primary/30"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
            
            {/* Leveling sub-items for mobile */}
            <div className="px-4 py-2 text-muted-foreground font-orbitron text-sm uppercase tracking-wider mt-2">
              Leveling Tools
            </div>
            <Link
              to="/player-calculator"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-secondary hover:shadow-glow-sm"
            >
              <span className="font-medium text-muted-foreground">
                Player EXP Calculator
              </span>
            </Link>
            <Link
              to="/pet-calculator"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-secondary hover:shadow-glow-sm"
            >
              <span className="font-medium text-muted-foreground">
                Pet Food Calculator
              </span>
            </Link>
            <Link
              to="/exp-to-level"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-secondary hover:shadow-glow-sm"
            >
              <span className="font-medium text-muted-foreground">
                EXP to Level Calculator
              </span>
            </Link>
            <Link
              to="/food-to-level"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-secondary hover:shadow-glow-sm"
            >
              <span className="font-medium text-muted-foreground">
                Food to Level Calculator
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;