import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  title: string;
  icon: LucideIcon;
  href: string;
  description?: string;
}

export function NavLink({ title, icon: Icon, href, description }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn("w-full justify-start flex-col h-auto gap-1 px-4", {
        "bg-muted": isActive,
      })}
      asChild
    >
      <Link to={href}>
        <div className="flex items-center w-full">
          <Icon className="mr-2 h-4 w-4" />
          <span className="font-medium">{title}</span>
        </div>
        {description && (
          <span className="text-xs text-muted-foreground text-left w-full pl-6">
            {description}
          </span>
        )}
      </Link>
    </Button>
  );
}