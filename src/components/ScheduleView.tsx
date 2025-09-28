import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

const today = new Date();
const scheduleData = [
  {
    id: 1,
    time: "09:00 AM",
    duration: "90 min",
    patient: "Priya Sharma",
    therapy: "Shirodhara",
    room: "Room 2",
    status: "upcoming" as const,
    notes: "First session - assess tolerance",
  },
  {
    id: 2,
    time: "11:00 AM",
    duration: "60 min",
    patient: "Amit Patel",
    therapy: "Abhyanga",
    room: "Room 1",
    status: "upcoming" as const,
    notes: "Follow-up session",
  },
  {
    id: 3,
    time: "02:00 PM",
    duration: "45 min",
    patient: "Rajesh Kumar",
    therapy: "Consultation",
    room: "Office",
    status: "upcoming" as const,
    notes: "Progress review and next steps",
  },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentWeek = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() - today.getDay() + i);
  return date;
});

interface ScheduleViewProps {
  onScheduleSession?: () => void;
  onViewSession?: (session: any) => void;
}

export function ScheduleView({ onScheduleSession, onViewSession }: ScheduleViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Manage daily and weekly therapy sessions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onScheduleSession}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="card-wellness">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Week View</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-4">
              {currentWeek[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
              {currentWeek[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="grid grid-cols-7 gap-2">
          {currentWeek.map((date, index) => {
            const isToday = date.toDateString() === today.toDateString();
            const hasEvents = index === today.getDay(); // Only today has events for demo
            
            return (
              <div 
                key={date.toISOString()}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  isToday 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <div className="text-center">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {weekDays[index]}
                  </p>
                  <p className={`text-lg font-semibold ${
                    isToday ? 'text-primary' : 'text-foreground'
                  }`}>
                    {date.getDate()}
                  </p>
                  {hasEvents && (
                    <div className="mt-2 space-y-1">
                      <div className="w-full h-1 bg-primary rounded-full" />
                      <p className="text-xs text-muted-foreground">{scheduleData.length} sessions</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="card-wellness">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{today.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {scheduleData.length === 0 ? (
          <div className="text-center py-8">
            <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No sessions scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduleData.map((session) => (
              <div 
                key={session.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
              >
                <div className="text-center min-w-[80px]">
                  <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </div>
                  <p className="text-xs text-muted-foreground">{session.duration}</p>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{session.patient}</h3>
                      <p className="text-sm text-primary font-medium">{session.therapy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{session.room}</span>
                    </div>
                    <span>•</span>
                    <span>{session.notes}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`status-badge status-${session.status}`}>
                    {session.status}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => onViewSession?.(session)}>
                    Start Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}