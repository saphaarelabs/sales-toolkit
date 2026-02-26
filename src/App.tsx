import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CommissionCalculator from "./pages/CommissionCalculator";
import ROICalculator from "./pages/ROICalculator";
import ColdEmailGenerator from "./pages/ColdEmailGenerator";
import SequenceBuilder from "./pages/SequenceBuilder";
import ICPBuilder from "./pages/ICPBuilder";
import ObjectionHandler from "./pages/ObjectionHandler";
import EmailSignatureGenerator from "./pages/EmailSignatureGenerator";
import DiscountCalculator from "./pages/DiscountCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/commission" element={<CommissionCalculator />} />
          <Route path="/roi" element={<ROICalculator />} />
          <Route path="/cold-email" element={<ColdEmailGenerator />} />
          <Route path="/sequence" element={<SequenceBuilder />} />
          <Route path="/icp" element={<ICPBuilder />} />
          <Route path="/objections" element={<ObjectionHandler />} />
          <Route path="/signature" element={<EmailSignatureGenerator />} />
          <Route path="/discount" element={<DiscountCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
