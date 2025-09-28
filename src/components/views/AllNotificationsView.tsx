import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Bell, 
  AlertCircle,
  Clock,
  CheckCircle,
  Trash2,
  Eye,
  Archive
} from "lucide-react";

interface AllNotificationsViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const allNotifications = [
  {
    id: 1,
    type: "followup",
    title: "Follow-up Check-in",
    message: "How are you feeling after your recent Abhyanga therapy session? We'd love to hear about your progress and any changes in your symptoms.",
    patient: "Amit Patel",
    time: "Dec 21, 10:00 AM",
    priority: "low",
    unread: true,
    category: "patient_care"
  },
  {
    id: 2,
    type: "instructions",
    title: "Pre-Treatment Instructions - Abhyanga Session",
    message: "Please remember to follow these instructions before your Abhyanga session tomorrow: - Avoid heavy meals 2 hours before treatment - Wear comfortable, loose clothing - Arrive 15 minutes early for consultation",
    patient: "Priya Sharma",
    time: "Dec 20, 8:00 AM",
    priority: "high",
    unread: false,
    category: "instructions"
  },
  {
    id: 3,
    type: "reminder",
    title: "Session Reminder",
    message: "Your Shirodhara session is scheduled for tomorrow at 10:00 AM in Room 2. Please confirm your attendance.",
    patient: "Rajesh Kumar",
    time: "Dec 20, 6:00 PM",
    priority: "medium",
    unread: true,
    category: "appointments"
  },
  {
    id: 4,
    type: "alert",
    title: "Missed Appointment Alert",
    message: "Patient did not show up for scheduled Swedana session. Please follow up and reschedule if needed.",
    patient: "Unknown Patient",
    time: "Dec 19, 2:15 PM",
    priority: "high",
    unread: false,
    category: "alerts"
  },
  {
    id: 5,
    type: "feedback",
    title: "Session Feedback Received",
    message: "Patient has provided feedback for their recent Abhyanga session. Rating: 5/5 stars. 'Excellent service and very relaxing experience.'",
    patient: "Amit Patel",
    time: "Dec 18, 7:30 PM",
    priority: "low",
    unread: false,
    category: "feedback"
  },
  {
    id: 6,
    type: "system",
    title: "Weekly Report Available",
    message: "Your weekly patient progress and therapy effectiveness report is ready for review. 15 sessions completed this week with 94% satisfaction rate.",
    patient: null,
    time: "Dec 18, 9:00 AM",
    priority: "medium",
    unread: true,
    category: "reports"
  }
];

export function AllNotificationsView({ open, onOpenChange }: AllNotificationsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const filteredNotifications = allNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.patient && notification.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || notification.category === categoryFilter;
    const matchesUnread = !showUnreadOnly || notification.unread;
    
    return matchesSearch && matchesPriority && matchesCategory && matchesUnread;
  });

  const categories = [...new Set(allNotifications.map(n => n.category))];

  const getNotificationIcon = (type: string, priority: string) => {
    if (priority === "high") return AlertCircle;
    if (type === "followup" || type === "feedback") return CheckCircle;
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

  const toggleNotificationSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nid => nid !== id)
        : [...prev, id]
    );
  };

  const selectAllNotifications = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            All Notifications
          </DialogTitle>
        </DialogHeader>

        {/* Filters and Actions */}
        <div className="space-y-4 pb-4 border-b">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="unread-only"
                checked={showUnreadOnly}
                onCheckedChange={(checked) => setShowUnreadOnly(!!checked)}
              />
              <label htmlFor="unread-only" className="text-sm cursor-pointer">
                Unread only
              </label>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedNotifications.length === filteredNotifications.length}
                onCheckedChange={selectAllNotifications}
              />
              <span className="text-sm text-muted-foreground">
                Select all ({selectedNotifications.length} selected)
              </span>
            </div>
            
            {selectedNotifications.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as Read
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type, notification.priority);
              
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors hover:border-primary/20 ${
                    notification.unread ? 'bg-primary/5 border-primary/10' : 'border-border/50'
                  }`}
                >
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={() => toggleNotificationSelection(notification.id)}
                  />

                  <div className={`p-2 rounded-lg ${
                    notification.priority === 'high' ? 'bg-destructive/10' :
                    notification.priority === 'medium' ? 'bg-warning/10' :
                    'bg-muted'
                  }`}>
                    <IconComponent className={`h-4 w-4 ${getPriorityColor(notification.priority)}`} />
                  </div>
                  
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground text-sm leading-tight">
                            {notification.title}
                          </h3>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        {notification.patient && (
                          <p className="text-xs text-primary font-medium">
                            Patient: {notification.patient}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            notification.priority === 'high' ? 'destructive' :
                            notification.priority === 'medium' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {notification.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {notification.category.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {filteredNotifications.length} of {allNotifications.length} notifications
            ({allNotifications.filter(n => n.unread).length} unread)
          </p>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}