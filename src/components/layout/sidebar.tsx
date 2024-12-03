import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit, FileText, Upload, History, MessageSquareText } from "lucide-react";
import { NavLink } from "./nav-link";

const sidebarNavItems = [
  {
    title: "System",
    icon: BrainCircuit,
    href: "/",
    description: "Prompt board and system settings"
  },
  {
    title: "Text",
    icon: FileText,
    href: "/text",
    description: "Text input and processing"
  },
  {
    title: "File",
    icon: Upload,
    href: "/file",
    description: "File upload and management"
  },
  {
    title: "Sessions",
    icon: History,
    href: "/sessions",
    description: "View past sessions"
  },
  {
    title: "Messages",
    icon: MessageSquareText,
    href: "/messages",
    description: "View past messages"
  }
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    foo?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-2xl font-bold tracking-tight">Bolt</h2>
          <p className="px-4 text-sm text-muted-foreground">
            AI Assistant Interface
          </p>
        </div>
        <div className="px-3 py-2">
          <ScrollArea className="h-[calc(100vh-8rem)] px-1">
            <div className="space-y-1">
              {sidebarNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                  description={item.description}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}