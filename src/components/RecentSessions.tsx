import { 
  User, 
  Clock, 
  MapPin,
  ArrowRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sessions = [
  {
    id: 1,
    patientName: "Amit Patel",
    date: "Sep 13, 2025",
    time: "6:11 PM",
    room: "Room 1",
    therapy: "Abhyanga",
    status: "completed" as const,
    notes: "Excellent response to treatment. Patient reported significant stress reduction.",
  },
  {
    id: 2,
    patientName: "Unknown Patient",
    date: "Dec 19, 2024",
    time: "4:00 PM",
    room: "Room 3",
    therapy: "Swedana",
    status: "completed" as const,
    notes: "Swedana therapy completed. Good detoxification response observed.",
  },
  {
    id: 3,
    patientName: "Priya Sharma",
    date: "Dec 21, 2024",
    time: "10:00 AM",
    room: "Room 2",
    therapy: "Shirodhara",
    status: "upcoming" as const,
    notes: "",
  },
];

export function RecentSessions() {
  return (
    <div className="card-wellness">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Sessions</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          <span>View All</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className="flex items-start justify-between p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors group"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="p-2 bg-muted rounded-lg">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-foreground">{session.patientName}</h3>
                  <span className={`status-badge status-${session.status}`}>
                    {session.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{session.date}</span>
                    <span>•</span>
                    <span>{session.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{session.room}</span>
                  </div>
                </div>
                
                <p className="text-sm font-medium text-primary">{session.therapy}</p>
                
                {session.notes && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {session.notes}
                  </p>
                )}
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}