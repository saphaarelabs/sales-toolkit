import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import OverviewTab from "./tabs/OverviewTab";
import AudienceTab from "./tabs/AudienceTab";
import PitchTab from "./tabs/PitchTab";
import B2BTab from "./tabs/B2BTab";
import B2CTab from "./tabs/B2CTab";
import KeywordsTab from "./tabs/KeywordsTab";
import ObjectionsTab from "./tabs/ObjectionsTab";
import ExportBar from "./ExportBar";
import type { SalesKitResult } from "./types";

export default function ResultsDashboard({ data }: { data: SalesKitResult }) {
  const showB2B = data.marketType === "B2B" || data.marketType === "Both";
  const showB2C = data.marketType === "B2C" || data.marketType === "Both";

  return (
    <div className="space-y-4">
      <ExportBar data={data} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="audience" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Audience <Badge variant="secondary" className="ml-1 text-[10px] h-4">{data.audience.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pitch" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Pitches
          </TabsTrigger>
          {showB2B && (
            <TabsTrigger value="b2b" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              B2B Outreach
            </TabsTrigger>
          )}
          {showB2C && (
            <TabsTrigger value="b2c" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              B2C Outreach
            </TabsTrigger>
          )}
          <TabsTrigger value="keywords" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Keywords
          </TabsTrigger>
          <TabsTrigger value="objections" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Objections <Badge variant="secondary" className="ml-1 text-[10px] h-4">{data.objections.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview"><OverviewTab data={data} /></TabsContent>
        <TabsContent value="audience"><AudienceTab data={data} /></TabsContent>
        <TabsContent value="pitch"><PitchTab data={data} /></TabsContent>
        {showB2B && <TabsContent value="b2b"><B2BTab data={data} /></TabsContent>}
        {showB2C && <TabsContent value="b2c"><B2CTab data={data} /></TabsContent>}
        <TabsContent value="keywords"><KeywordsTab data={data} /></TabsContent>
        <TabsContent value="objections"><ObjectionsTab data={data} /></TabsContent>
      </Tabs>
    </div>
  );
}
