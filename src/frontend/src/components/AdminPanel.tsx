import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, FolderOpen, Phone, Settings, User, Zap } from "lucide-react";
import CertificationsTab from "./admin/CertificationsTab";
import ContactTab from "./admin/ContactTab";
import ProfileTab from "./admin/ProfileTab";
import ProjectsTab from "./admin/ProjectsTab";
import SkillsTab from "./admin/SkillsTab";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col"
        data-ocid="admin.sheet"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <Settings className="w-4 h-4 text-primary" /> Settings Panel
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            Edit your portfolio content. Changes are saved to the blockchain.
          </p>
        </SheetHeader>
        <Tabs defaultValue="profile" className="flex flex-col flex-1 min-h-0">
          <TabsList className="mx-6 mt-4 mb-0 grid grid-cols-5 h-9 flex-shrink-0">
            <TabsTrigger
              value="profile"
              className="text-xs gap-1"
              data-ocid="admin.tab"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-xs gap-1"
              data-ocid="admin.tab"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="text-xs gap-1"
              data-ocid="admin.tab"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className="text-xs gap-1"
              data-ocid="admin.tab"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Certs</span>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="text-xs gap-1"
              data-ocid="admin.tab"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1 min-h-0">
            <div className="px-6 py-5">
              <TabsContent value="profile" className="mt-0">
                <ProfileTab />
              </TabsContent>
              <TabsContent value="projects" className="mt-0">
                <ProjectsTab />
              </TabsContent>
              <TabsContent value="skills" className="mt-0">
                <SkillsTab />
              </TabsContent>
              <TabsContent value="certifications" className="mt-0">
                <CertificationsTab />
              </TabsContent>
              <TabsContent value="contact" className="mt-0">
                <ContactTab />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
