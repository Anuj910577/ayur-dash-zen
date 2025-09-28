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
import { 
  Search, 
  Filter,
  User, 
  Clock, 
  MapPin,
  Calendar,
  Eye,
  Edit
} from "lucide-react";

interface AllSessionsViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSessionView?: (session: any) => void;
}

const allSessions = [
  {
    id: 1,
    patientName: "Amit Patel",
    therapy: "Abhyanga",
    date: "2024-12-21",
    time: "10:00 AM",
    duration: 90,
    room: "Room 1",
    status: "upcoming",
    therapist: "Dr. Smith",
    notes: "Follow-up session for stress management"
  },
  {
    id: 2,
    patientName: "Priya Sharma",
    therapy: "Shirodhara",
    date: "2024-12-21",
    time: "2:00 PM",
    duration: 60,
    room: "Room 2",
    status: "upcoming",
    therapist: "Dr. Patel",
    notes: "First session - assess tolerance"
  },
  {
    id: 3,
    patientName: "Rajesh Kumar",
    therapy: "Consultation",
    date: "2024-12-20",
    time: "4:00 PM",
    duration: 45,
    room: "Office",
    status: "completed",
    therapist: "Dr. Smith",
    notes: "Progress review completed successfully"
  },
  {
    id: 4,
    patientName: "Unknown Patient",
    therapy: "Swedana",
    date: "2024-12-19",
    time: "11:00 AM",
    duration: 45,
    room: "Room 3",
    status: "completed",
    therapist: "Dr. Patel",
    notes: "Good detoxification response observed"
  },
  {
    id: 5,
    patientName: "Amit Patel",
    therapy: "Abhyanga",
    date: "2024-12-18",
    time: "6:11 PM",
    duration: 90,
    room: "Room 1",
    status: "completed",
    therapist: "Dr. Smith",
    notes: "Excellent response to treatment"
  }
];

export function AllSessionsView({ open, onOpenChange, onSessionView }: AllSessionsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [therapyFilter, setTherapyFilter] = useState("all");

  const filteredSessions = allSessions.filter(session => {
    const matchesSearch = session.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.therapy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    const matchesTherapy = therapyFilter === "all" || session.therapy === therapyFilter;
    
    return matchesSearch && matchesStatus && matchesTherapy;
  });

  const therapyTypes = [...new Set(allSessions.map(s => s.therapy))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            All Sessions
          </DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 pb-4 border-b">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or therapy type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={therapyFilter} onValueChange={setTherapyFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Therapy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Therapies</SelectItem>
              {therapyTypes.map(therapy => (
                <SelectItem key={therapy} value={therapy}>{therapy}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary/20 transition-colors"
              >
                {/* Time & Date */}
                <div className="text-center min-w-[100px]">
                  <div className="text-sm font-semibold text-foreground">
                    {session.date}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </div>
                </div>

                {/* Patient & Therapy */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{session.patientName}</h3>
                      <p className="text-sm text-primary font-medium">{session.therapy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{session.room}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{session.duration} min</span>
                    </div>
                    <span>Therapist: {session.therapist}</span>
                  </div>

                  {session.notes && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {session.notes}
                    </p>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={
                      session.status === 'completed' ? 'default' :
                      session.status === 'ongoing' ? 'secondary' : 'outline'
                    }
                    className={`${
                      session.status === 'upcoming' ? 'status-upcoming' :
                      session.status === 'ongoing' ? 'status-ongoing' :
                      session.status === 'completed' ? 'status-completed' : 'status-rescheduled'
                    } border-0`}
                  >
                    {session.status}
                  </Badge>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSessionView?.(session)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSessions.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sessions found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSessions.length} of {allSessions.length} sessions
          </p>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}