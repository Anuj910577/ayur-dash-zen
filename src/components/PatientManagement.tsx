import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  User,
  Calendar,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const patients = [
  {
    id: 1,
    name: "Amit Patel",
    image: null,
    therapy: "Panchakarma Detox",
    stage: "Week 2 of 3",
    progress: 65,
    lastSession: "2 days ago",
    nextSession: "Tomorrow, 2:00 PM",
    status: "active" as const,
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: null,
    therapy: "Stress Relief Program",
    stage: "Week 1 of 2",
    progress: 30,
    lastSession: "1 week ago",
    nextSession: "Today, 10:00 AM",
    status: "active" as const,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    image: null,
    therapy: "Joint Pain Treatment",
    stage: "Completed",
    progress: 100,
    lastSession: "3 weeks ago",
    nextSession: "Follow-up needed",
    status: "completed" as const,
  },
];

interface PatientManagementProps {
  onAddPatient?: () => void;
  onViewProfile?: (patient: any) => void;
  onScheduleSession?: () => void;
  onShowFilters?: () => void;
}

export function PatientManagement({
  onAddPatient,
  onViewProfile,
  onScheduleSession,
  onShowFilters
}: PatientManagementProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patient Management</h1>
          <p className="text-muted-foreground">Manage and track patient therapies and progress</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onAddPatient}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search patients by name, therapy type..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={onShowFilters}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="card-wellness group cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{patient.stage}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Therapy Info */}
              <div>
                <p className="text-sm font-medium text-primary mb-1">{patient.therapy}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${patient.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{patient.progress}% Complete</p>
              </div>

              {/* Session Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Last: {patient.lastSession}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Activity className="h-4 w-4" />
                  <span>Next: {patient.nextSession}</span>
                </div>
                <span className={`status-badge ${
                  patient.status === 'active' ? 'status-ongoing' : 'status-completed'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => onViewProfile?.(patient)}>
                View Profile
              </Button>
              {patient.status === 'active' && (
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" onClick={onScheduleSession}>
                  Start Session
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}