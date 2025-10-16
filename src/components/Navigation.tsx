import { Link, useLocation } from "react-router-dom";
import { Swords, FlaskConical, Timer, TrendingUp, User, PawPrint, Menu } from "lucide-react";
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
      icon: Swords,
    },
    {
      path: "/damage-per-fsp",
      label: "FSP Damage",
      icon: Swords,
    },
    {
      path: "/fsp-needed",
      label: "FSP Needed",
      icon: FlaskConical,
    },
    {
      path: "/stamina-regen",
      label: "Stamina Regen",
      icon: Timer,
    },
    {
      path: "/level-calculator",
      label: "Level Progression",
      icon: TrendingUp,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img 
                src="/void2.png" 
                alt="VOID Game Tools" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h1 className="text-xl font-orbitron font-bold tracking-wider">
              VOID <span className="text-primary">TOOLS</span>
            </h1>
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
          <div className="hidden sm:flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-secondary hover:shadow-glow-sm",
                    isActive && "bg-secondary shadow-glow-sm border border-primary/30"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium text-sm",
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
