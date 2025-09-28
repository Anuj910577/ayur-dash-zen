import { 
  Bell, 
  AlertCircle,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    type: "followup",
    title: "Follow-up Check-in",
    message: "How are you feeling after your recent Abhyanga therapy session? We'd love to hear about your progress and...",
    time: "Dec 21, 10:00 AM",
    priority: "low" as const,
    unread: true,
  },
  {
    id: 2,
    type: "instructions",
    title: "Pre-Treatment Instructions - Abhyanga Session",
    message: "Please remember to follow these instructions before your Abhyanga session tomorrow: - Avoid heavy meals...",
    time: "Dec 20, 8:00 AM",
    priority: "high" as const,
    unread: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Session Reminder",
    message: "Your Shirodhara session is scheduled for tomorrow at 10:00 AM in Room 2.",
    time: "Dec 20, 6:00 PM",
    priority: "medium" as const,
    unread: true,
  },
];

const getNotificationIcon = (type: string, priority: string) => {
  if (priority === "high") return AlertCircle;
  if (type === "followup") return CheckCircle;
  if (type === "reminder") return Clock;
  return Bell;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "text-destructive";
    case "medium": return "text-warning";
    default: return "text-muted-foreground";
  }
};

interface NotificationsPanelProps {
  onViewAll?: () => void;
}

export function NotificationsPanel({ onViewAll }: NotificationsPanelProps) {
  return (
    <div className="card-wellness">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Pending Notifications</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={onViewAll}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = getNotificationIcon(notification.type, notification.priority);
          
          return (
            <div 
              key={notification.id} 
              className={`flex items-start gap-4 p-4 rounded-lg border transition-colors hover:border-primary/20 ${
                notification.unread ? 'bg-primary/5 border-primary/10' : 'border-border/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                notification.priority === 'high' ? 'bg-destructive/10' :
                notification.priority === 'medium' ? 'bg-warning/10' :
                'bg-muted'
              }`}>
                <IconComponent className={`h-4 w-4 ${getPriorityColor(notification.priority)}`} />
              </div>
              
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground text-sm leading-tight">
                    {notification.title}
                  </h3>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {notification.message}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  Sent at: {notification.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/5">
          View All Notifications
        </Button>
      </div>
    </div>
  );
}