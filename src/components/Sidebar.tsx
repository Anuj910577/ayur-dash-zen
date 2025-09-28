import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Bell, 
  TrendingUp, 
  Activity,
  Leaf 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "patients", label: "Patients", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "progress", label: "Progress Tracking", icon: TrendingUp },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border min-h-screen p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary rounded-lg">
          <Leaf className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">PanchakarmaManager</h1>
          <p className="text-xs text-muted-foreground">Ayurvedic Wellness Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Navigation
        </div>
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "sidebar-item w-full text-left",
              activeTab === item.id && "active"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-primary/5 to-primary-soft/10 rounded-lg p-4 border border-primary/10">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Quick Stats
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              Active Patients
            </span>
            <span className="font-semibold text-success">0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning" />
              Today's Sessions
            </span>
            <span className="font-semibold text-warning-foreground">0</span>
          </div>
        </div>
      </div>

      {/* Practitioner Info */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">P</span>
          </div>
          <div>
            <p className="font-medium text-foreground">Practitioner</p>
            <p className="text-xs text-muted-foreground">Ayurveda Specialist</p>
          </div>
        </div>
      </div>
    </div>
  );
}