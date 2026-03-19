import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  FolderOpen,
  Layout,
  Palette,
  Phone,
  Settings,
  User,
  Zap,
} from "lucide-react";
import AppearanceTab from "./admin/AppearanceTab";
import CertificationsTab from "./admin/CertificationsTab";
import ContactTab from "./admin/ContactTab";
import CustomSectionsTab from "./admin/CustomSectionsTab";
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
          <div className="px-4 mt-3 mb-0 flex-shrink-0 overflow-x-auto">
            <TabsList className="flex w-max gap-0.5 h-9 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger
                value="profile"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Projects</span>
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Skills</span>
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certs</span>
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact</span>
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Looks</span>
              </TabsTrigger>
              <TabsTrigger
                value="sections"
                className="text-xs gap-1 px-2.5 whitespace-nowrap"
                data-ocid="admin.tab"
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Sections</span>
              </TabsTrigger>
            </TabsList>
          </div>
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
              <TabsContent value="appearance" className="mt-0">
                <AppearanceTab />
              </TabsContent>
              <TabsContent value="sections" className="mt-0">
                <CustomSectionsTab />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
