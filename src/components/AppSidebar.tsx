import {
  Calculator, TrendingUp, Mail, ListOrdered, Target, ShieldCheck, AtSign, Percent,
  Sparkles, Trophy, BarChart3, Gauge, Zap, User, UserPlus, FileText, CalendarDays,
  DollarSign, ClipboardList, ScrollText, Swords, Brain, Bot, BookOpen, Home,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const aiTools = [
  { title: "AI Sales Assistant", url: "/ai", icon: Bot },
  { title: "AI Prompt Templates", url: "/prompts", icon: Sparkles },
  { title: "AI Skills Library", url: "/skills", icon: Brain },
];

const contentTools = [
  { title: "Email Templates", url: "/email-templates", icon: BookOpen },
  { title: "Cold Email Generator", url: "/cold-email", icon: Mail },
  { title: "Sequence Builder", url: "/sequence", icon: ListOrdered },
  { title: "Email Signature", url: "/signature", icon: AtSign },
];

const prospectingTools = [
  { title: "ICP Builder", url: "/icp", icon: Target },
  { title: "Objection Handler", url: "/objections", icon: ShieldCheck },
  { title: "Battle Card Creator", url: "/battle-card", icon: Swords },
];

const pipelineTools = [
  { title: "Win Probability", url: "/win-probability", icon: Trophy },
  { title: "Pipeline Health", url: "/pipeline-health", icon: BarChart3 },
  { title: "Quota Tracker", url: "/quota-tracker", icon: Gauge },
  { title: "Sales Velocity", url: "/sales-velocity", icon: Zap },
];

const calculatorTools = [
  { title: "Commission Calculator", url: "/commission", icon: Calculator },
  { title: "ROI Calculator", url: "/roi", icon: TrendingUp },
  { title: "Discount Calculator", url: "/discount", icon: Percent },
];

const linkedinTools = [
  { title: "LinkedIn Headline", url: "/linkedin-headline", icon: User },
  { title: "Connection Request", url: "/connection-request", icon: UserPlus },
  { title: "LinkedIn Post", url: "/linkedin-post", icon: FileText },
  { title: "Social Sequence", url: "/social-sequence", icon: CalendarDays },
];

const proposalTools = [
  { title: "Pricing Table", url: "/pricing-table", icon: DollarSign },
  { title: "Proposal Outline", url: "/proposal-outline", icon: ClipboardList },
  { title: "SOW Generator", url: "/sow-generator", icon: ScrollText },
];

const groups = [
  { label: "AI-Powered", items: aiTools },
  { label: "Email & Outreach", items: contentTools },
  { label: "Prospecting", items: prospectingTools },
  { label: "Pipeline", items: pipelineTools },
  { label: "Calculators", items: calculatorTools },
  { label: "LinkedIn", items: linkedinTools },
  { label: "Proposals & Docs", items: proposalTools },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-3 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors">
          <Home className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="font-display font-bold text-base">CloserKit</span>}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => {
          const isGroupActive = group.items.some((i) => currentPath === i.url);
          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className="hover:bg-muted/50"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <item.icon className="mr-2 h-4 w-4 shrink-0" />
                          {!collapsed && <span className="truncate">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-2">
        {!collapsed && (
          <p className="text-[10px] text-muted-foreground">Free &amp; open-source</p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
