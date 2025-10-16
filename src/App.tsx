import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import FspDamage from "./pages/FspDamage";
import FspNeeded from "./pages/FspNeeded";
import StaminaRegen from "./pages/StaminaRegen";
import Home from "./pages/Home";
import LevelCalculator from "./pages/LevelCalculator";
import PlayerCalculator from "./pages/PlayerCalculator";
import PetCalculator from "./pages/PetCalculator";
import ExpPerStam from "./pages/ExpPerStam";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/damage-per-fsp" element={<FspDamage />} />
            <Route path="/fsp-needed" element={<FspNeeded />} />
            <Route path="/stamina-regen" element={<StaminaRegen />} />
            <Route path="/level-calculator" element={<LevelCalculator />} />
            <Route path="/player-calculator" element={<PlayerCalculator />} />
            <Route path="/pet-calculator" element={<PetCalculator />} />
            <Route path="/exp-per-stam" element={<ExpPerStam />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
