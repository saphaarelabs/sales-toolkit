import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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
import PromptTemplates from "./pages/PromptTemplates";
import WinProbability from "./pages/WinProbability";
import PipelineHealth from "./pages/PipelineHealth";
import QuotaTracker from "./pages/QuotaTracker";
import SalesVelocity from "./pages/SalesVelocity";
import LinkedInHeadline from "./pages/LinkedInHeadline";
import ConnectionRequest from "./pages/ConnectionRequest";
import LinkedInPost from "./pages/LinkedInPost";
import SocialSequence from "./pages/SocialSequence";
import PricingTable from "./pages/PricingTable";
import ProposalOutline from "./pages/ProposalOutline";
import SOWGenerator from "./pages/SOWGenerator";
import BattleCard from "./pages/BattleCard";
import EmailTemplateLibrary from "./pages/EmailTemplateLibrary";
import SkillsLibrary from "./pages/SkillsLibrary";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
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
                <Route path="/prompts" element={<PromptTemplates />} />
                <Route path="/win-probability" element={<WinProbability />} />
                <Route path="/pipeline-health" element={<PipelineHealth />} />
                <Route path="/quota-tracker" element={<QuotaTracker />} />
                <Route path="/sales-velocity" element={<SalesVelocity />} />
                <Route path="/linkedin-headline" element={<LinkedInHeadline />} />
                <Route path="/connection-request" element={<ConnectionRequest />} />
                <Route path="/linkedin-post" element={<LinkedInPost />} />
                <Route path="/social-sequence" element={<SocialSequence />} />
                <Route path="/pricing-table" element={<PricingTable />} />
                <Route path="/proposal-outline" element={<ProposalOutline />} />
                <Route path="/sow-generator" element={<SOWGenerator />} />
                <Route path="/battle-card" element={<BattleCard />} />
                <Route path="/email-templates" element={<EmailTemplateLibrary />} />
                <Route path="/skills" element={<SkillsLibrary />} />
                <Route path="/ai" element={<AIAssistant />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
