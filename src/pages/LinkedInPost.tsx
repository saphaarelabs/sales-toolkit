import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check } from "lucide-react";

type PostType = "story" | "insight" | "contrarian" | "carousel";

const postLabels: Record<PostType, string> = {
  story: "Personal Story",
  insight: "Industry Insight",
  contrarian: "Contrarian Take",
  carousel: "Carousel Outline",
};

const LinkedInPost = () => {
  const [postType, setPostType] = useState<PostType>("story");
  const [topic, setTopic] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [copied, setCopied] = useState(false);

  const t = topic || "[your topic]";
  const points = keyPoints.split("\n").filter(Boolean);
  const bullets = points.length > 0 ? points : ["Point 1", "Point 2", "Point 3"];

  const posts: Record<PostType, string> = {
    story: `I almost gave up on ${t}.\n\nHere's what happened:\n\n${bullets.map((p) => `→ ${p}`).join("\n")}\n\nThe lesson? ${t} isn't about talent — it's about consistency.\n\nIf you're struggling with this, keep going.\n\n♻️ Repost if this resonates.\n💬 What's your experience with ${t}?`,
    insight: `${t} is changing faster than most people realize.\n\nHere are ${bullets.length} things I've learned:\n\n${bullets.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nThe companies adapting to this will win the next 5 years.\n\nThe ones ignoring it? They'll be playing catch-up.\n\n👇 Which of these surprises you most?`,
    contrarian: `Unpopular opinion: ${t} is overrated.\n\nI know, I know — everyone says it's essential.\n\nBut here's what nobody talks about:\n\n${bullets.map((p) => `• ${p}`).join("\n")}\n\nThe real answer isn't more ${t.toLowerCase()}.\nIt's doing less, better.\n\nAgree or disagree? 👇`,
    carousel: `📌 CAROUSEL: ${t}\n\n🔹 Slide 1 (Cover): "${t} — A Complete Guide"\n\n${bullets.map((p, i) => `🔹 Slide ${i + 2}: ${p}`).join("\n\n")}\n\n🔹 Slide ${bullets.length + 2} (CTA): "Follow me for more ${t.toLowerCase()} insights. ♻️ Repost to help your network."\n\n---\nCaption: I just broke down everything I know about ${t} into ${bullets.length + 2} slides.\n\nSave this for later. 🔖`,
  };

  const post = posts[postType];

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="LinkedIn Post Generator" description="Generate formatted LinkedIn posts with hooks, body, and CTA." accentColor="bg-linkedin">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Post Type</Label>
            <Select value={postType} onValueChange={(v) => setPostType(v as PostType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.keys(postLabels) as PostType[]).map((t) => (
                  <SelectItem key={t} value={t}>{postLabels[t]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Topic</Label>
            <Input placeholder="Cold outreach in 2025" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div>
            <Label>Key Points (one per line)</Label>
            <Textarea placeholder={"Personalization beats volume\nMulti-channel wins\nFollow-up is everything"} rows={5} value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} />
          </div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Generated Post</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <><Check className="h-4 w-4 mr-1 text-green-600" /> Copied!</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{post}</pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default LinkedInPost;
