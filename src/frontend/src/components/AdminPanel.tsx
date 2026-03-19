import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  CheckCircle2,
  FolderOpen,
  Layout,
  Loader2,
  LogOut,
  Palette,
  Phone,
  Settings,
  ShieldAlert,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
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

function LoginGate() {
  const { login, isLoggingIn, isInitializing, loginStatus, loginError } =
    useInternetIdentity();

  const isMobile =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleLogin = () => {
    login();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center justify-center flex-1 px-8 py-12 text-center"
      data-ocid="admin.login_gate"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
        <ShieldAlert className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-2">
        Sign in to save changes
      </h2>
      <p className="text-sm text-muted-foreground mb-2 max-w-xs leading-relaxed">
        You need to sign in with Internet Identity before you can save anything
        or upload images.
      </p>

      {isMobile && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-6 max-w-xs">
          On mobile, a new tab will open for sign-in. Please allow it and
          complete the sign-in there.
        </p>
      )}
      {!isMobile && (
        <p className="text-xs text-muted-foreground mb-6 max-w-xs">
          A popup will open — make sure popups are allowed for this site.
        </p>
      )}

      {/* Login status indicator */}
      <div className="flex items-center gap-2 mb-5">
        <XCircle className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Not signed in</span>
      </div>

      <Button
        onClick={handleLogin}
        disabled={isLoggingIn || isInitializing}
        className="w-full max-w-xs h-11 font-medium gap-2"
        data-ocid="admin.login_button"
      >
        {isLoggingIn || isInitializing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShieldAlert className="w-4 h-4" />
        )}
        {isLoggingIn
          ? "Opening sign-in..."
          : isInitializing
            ? "Initializing..."
            : "Sign in with Internet Identity"}
      </Button>

      {isLoggingIn && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground mt-3 max-w-xs"
        >
          {isMobile
            ? "A new tab opened — complete sign-in there, then come back."
            : "Complete sign-in in the popup window, then return here."}
        </motion.p>
      )}

      {loginStatus === "loginError" && loginError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-destructive mt-3 max-w-xs"
        >
          Sign-in failed: {loginError.message}. Please try again.
        </motion.p>
      )}

      <p className="text-xs text-muted-foreground mt-5">
        Free & decentralized identity — no passwords needed.
      </p>
    </motion.div>
  );
}

export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const isLoggedIn = !!identity && !isInitializing;

  const principalShort = identity
    ? (() => {
        const p = identity.getPrincipal().toString();
        return p.length > 12 ? `${p.slice(0, 6)}...${p.slice(-4)}` : p;
      })()
    : null;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col bg-background"
        data-ocid="admin.sheet"
      >
        <SheetHeader className="px-5 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-base font-semibold">
              <Settings className="w-4 h-4 text-primary" />
              Settings
            </SheetTitle>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* Signed in status badge */}
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Signed in
                </span>
                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md">
                  {principalShort}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={clear}
                  title="Sign out"
                  data-ocid="admin.logout_button"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                <XCircle className="w-3 h-3" />
                Not signed in
              </span>
            )}
          </div>
          {isLoggedIn && (
            <p className="text-xs text-muted-foreground">
              Changes are saved to the blockchain.
            </p>
          )}
        </SheetHeader>
        <Separator />

        {!isLoggedIn ? (
          <LoginGate />
        ) : (
          <Tabs defaultValue="profile" className="flex flex-col flex-1 min-h-0">
            <div className="px-4 py-3 flex-shrink-0">
              <div className="overflow-x-auto w-full">
                <TabsList className="flex w-max gap-0.5 h-9 bg-muted/60 p-1 rounded-xl">
                  {[
                    { value: "profile", icon: User, label: "Profile" },
                    { value: "projects", icon: FolderOpen, label: "Projects" },
                    { value: "skills", icon: Zap, label: "Skills" },
                    { value: "certifications", icon: Award, label: "Certs" },
                    { value: "contact", icon: Phone, label: "Contact" },
                    {
                      value: "appearance",
                      icon: Palette,
                      label: "Customize UI",
                    },
                    { value: "sections", icon: Layout, label: "Sections" },
                  ].map(({ value, icon: Icon, label }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="text-xs gap-1.5 px-3 whitespace-nowrap rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      data-ocid="admin.tab"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            <Separator />
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-5 py-5">
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
        )}
      </SheetContent>
    </Sheet>
  );
}
