import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Clock, 
  MapPin,
  FileText,
  CheckCircle,
  Calendar,
  Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SessionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: any;
  onSessionUpdate?: (updatedSession: any) => void;
}

const protocolChecklist = [
  "Pre-session consultation completed",
  "Patient medical history reviewed",
  "Room prepared and sterilized",
  "Oils/medicines prepared according to protocol",
  "Patient comfort and privacy ensured",
  "Vital signs recorded (if applicable)",
  "Therapy administered as per guidelines",
  "Post-therapy instructions provided",
  "Next session scheduled",
  "Session notes documented"
];

export function SessionDetailsModal({ 
  open, 
  onOpenChange, 
  session,
  onSessionUpdate 
}: SessionDetailsModalProps) {
  const [sessionNotes, setSessionNotes] = useState(session?.notes || "");
  const [patientFeedback, setPatientFeedback] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [sessionRating, setSessionRating] = useState(0);
  
  if (!session) return null;

  const handleCompleteSession = () => {
    const updatedSession = {
      ...session,
      status: "completed",
      notes: sessionNotes,
      patientFeedback,
      checkedItems,
      rating: sessionRating,
      completedAt: new Date().toISOString()
    };

    onSessionUpdate?.(updatedSession);
    
    toast({
      title: "Session Completed",
      description: `${session.therapy} session for ${session.patient || session.patientName} has been marked as completed.`,
    });
    
    onOpenChange(false);
  };

  const handleReschedule = () => {
    toast({
      title: "Reschedule Session",
      description: "Reschedule functionality would be implemented here.",
    });
  };

  const handleStartSession = () => {
    const updatedSession = {
      ...session,
      status: "ongoing",
      startedAt: new Date().toISOString()
    };

    onSessionUpdate?.(updatedSession);
    
    toast({
      title: "Session Started",
      description: `${session.therapy} session for ${session.patient || session.patientName} has been started.`,
    });
  };

  const toggleChecklistItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setSessionRating(star)}
            className="transition-colors"
          >
            <Star 
              className={`h-5 w-5 ${
                star <= sessionRating 
                  ? 'text-warning fill-warning' 
                  : 'text-muted-foreground'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Session Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Header */}
          <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-primary/5 to-primary-soft/10 rounded-lg">
            <div className="p-3 bg-primary/20 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">
                  {session.patient || session.patientName}
                </h2>
                <Badge 
                  variant={
                    session.status === 'completed' ? 'default' :
                    session.status === 'ongoing' ? 'secondary' : 'outline'
                  }
                >
                  {session.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{session.date || 'Today'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{session.time} ({session.duration || 60} min)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{session.room}</span>
                </div>
              </div>
              
              <div className="text-primary font-medium">
                {session.therapy || session.therapyType}
              </div>
            </div>
          </div>

          {/* Protocol Checklist */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Protocol Checklist
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {protocolChecklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`checklist-${index}`}
                    checked={checkedItems.includes(item)}
                    onCheckedChange={() => toggleChecklistItem(item)}
                  />
                  <Label 
                    htmlFor={`checklist-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Session Notes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Session Notes
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionNotes">Therapist Notes</Label>
                <Textarea
                  id="sessionNotes"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Document observations, patient response, any modifications to protocol..."
                  rows={4}
                />
              </div>

              {session.status === 'completed' && (
                <>
                  <div>
                    <Label htmlFor="patientFeedback">Patient Feedback</Label>
                    <Textarea
                      id="patientFeedback"
                      value={patientFeedback}
                      onChange={(e) => setPatientFeedback(e.target.value)}
                      placeholder="Record patient's feedback about the session..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Session Rating</Label>
                    <div className="flex items-center gap-3 mt-2">
                      {renderStarRating()}
                      <span className="text-sm text-muted-foreground">
                        {sessionRating > 0 ? `${sessionRating}/5` : 'No rating'}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          {session.specialInstructions && (
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Special Instructions</h4>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm">
                {session.specialInstructions}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            {session.status === 'upcoming' && (
              <>
                <Button
                  variant="outline"
                  onClick={handleReschedule}
                  className="flex-1"
                >
                  Reschedule
                </Button>
                <Button
                  onClick={handleStartSession}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Start Session
                </Button>
              </>
            )}
            
            {session.status === 'ongoing' && (
              <Button
                onClick={handleCompleteSession}
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              >
                Mark as Completed
              </Button>
            )}

            {session.status === 'completed' && (
              <Button
                onClick={() => toast({
                  title: "Session Completed",
                  description: "This session has already been completed."
                })}
                variant="outline"
                className="flex-1"
                disabled
              >
                Session Completed
              </Button>
            )}
            
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}