import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Activity,
  FileText,
  Clock,
  MapPin,
  Star
} from "lucide-react";

interface PatientProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: any;
}

// Mock session history for the patient
const getSessionHistory = (patientName: string) => [
  {
    id: 1,
    date: "2024-12-20",
    time: "10:00 AM",
    therapy: "Abhyanga",
    room: "Room 1",
    duration: 90,
    status: "completed",
    notes: "Excellent response to treatment. Patient reported significant stress reduction.",
    rating: 5
  },
  {
    id: 2,
    date: "2024-12-18",
    time: "2:00 PM",
    therapy: "Shirodhara",
    room: "Room 2",
    duration: 60,
    status: "completed",
    notes: "Good relaxation response. Continue with current protocol.",
    rating: 4
  },
  {
    id: 3,
    date: "2024-12-22",
    time: "11:00 AM",
    therapy: "Swedana",
    room: "Room 3",
    duration: 45,
    status: "upcoming",
    notes: "Steam therapy to enhance detoxification process."
  }
];

export function PatientProfileModal({ open, onOpenChange, patient }: PatientProfileModalProps) {
  if (!patient) return null;

  const sessionHistory = getSessionHistory(patient.name);
  const completedSessions = sessionHistory.filter(s => s.status === 'completed');
  const avgRating = completedSessions.length > 0 
    ? (completedSessions.reduce((sum, s) => sum + (s.rating || 0), 0) / completedSessions.length).toFixed(1)
    : 'N/A';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Patient Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Header */}
          <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-primary/5 to-primary-soft/10 rounded-lg">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
                <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                  {patient.status || 'Active'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{patient.email || 'email@example.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{patient.phone || '+1 (555) 123-4567'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Age: {patient.age || '35'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{patient.gender || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-primary">{patient.progress}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-warning fill-warning" />
                <span className="text-sm font-medium">{avgRating}</span>
              </div>
            </div>
          </div>

          {/* Therapy Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Current Therapy
              </h3>
              <div className="p-4 border rounded-lg space-y-3">
                <div>
                  <div className="font-medium text-primary">{patient.therapy}</div>
                  <div className="text-sm text-muted-foreground">{patient.stage}</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${patient.progress}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Started: December 10, 2024
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Medical Information
              </h3>
              <div className="p-4 border rounded-lg space-y-3">
                <div>
                  <div className="text-sm font-medium text-foreground">Current Conditions</div>
                  <div className="text-sm text-muted-foreground">
                    {patient.currentConditions || 'Chronic stress, sleep disorders, digestive issues'}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium text-foreground">Therapy Goals</div>
                  <div className="text-sm text-muted-foreground">
                    {patient.therapyGoal || 'Stress reduction, improved sleep quality, digestive health'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session History */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Sessions
            </h3>
            
            <div className="space-y-3">
              {sessionHistory.map((session) => (
                <div 
                  key={session.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary/20 transition-colors"
                >
                  <div className="text-center min-w-[80px]">
                    <div className="text-sm font-medium text-foreground">{session.date}</div>
                    <div className="text-xs text-muted-foreground">{session.time}</div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">{session.therapy}</span>
                      <Badge 
                        variant={session.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{session.room}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.duration} min</span>
                      </div>
                      {session.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning fill-warning" />
                          <span>{session.rating}/5</span>
                        </div>
                      )}
                    </div>
                    
                    {session.notes && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {session.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              Edit Profile
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              Schedule Session
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}