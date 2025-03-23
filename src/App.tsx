
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RecyclingCenters from "./pages/RecyclingCenters";
import Education from "./pages/Education";
import SimpleAuthPage from "./pages/SimpleAuthPage";
import NotFound from "./pages/NotFound";
import AddDevicePage from "./pages/AddDevicePage";
import DevicesPage from "./pages/DevicesPage";
import SchedulePickupPage from "./pages/SchedulePickupPage";
import DonateDevicePage from "./pages/DonateDevicePage";
import TrackImpactPage from "./pages/TrackImpactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recycling-centers" element={<RecyclingCenters />} />
          <Route path="/education" element={<Education />} />
          <Route path="/auth" element={<SimpleAuthPage />} />
          <Route path="/add-device" element={<AddDevicePage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/schedule-pickup" element={<SchedulePickupPage />} />
          <Route path="/donate-device" element={<DonateDevicePage />} />
          <Route path="/track-impact" element={<TrackImpactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
