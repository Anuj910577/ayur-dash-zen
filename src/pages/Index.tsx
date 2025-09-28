import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentSessions } from "@/components/RecentSessions";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { PatientManagement } from "@/components/PatientManagement";
import { ScheduleView } from "@/components/ScheduleView";
import { AddPatientModal } from "@/components/modals/AddPatientModal";
import { ScheduleSessionModal } from "@/components/modals/ScheduleSessionModal";
import { PatientProfileModal } from "@/components/modals/PatientProfileModal";
import { SessionDetailsModal } from "@/components/modals/SessionDetailsModal";
import { AllSessionsView } from "@/components/views/AllSessionsView";
import { AllNotificationsView } from "@/components/views/AllNotificationsView";
import { FilterPanel } from "@/components/FilterPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Modal states
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showScheduleSession, setShowScheduleSession] = useState(false);
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // Selected items for modals
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  
  // Data states
  const [patients, setPatients] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  // Handlers
  const handlePatientAdded = (newPatient: any) => {
    setPatients(prev => [...prev, newPatient]);
  };

  const handleSessionScheduled = (newSession: any) => {
    setSessions(prev => [...prev, newSession]);
  };

  const handleViewPatientProfile = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientProfile(true);
  };

  const handleViewSessionDetails = (session: any) => {
    setSelectedSession(session);
    setShowSessionDetails(true);
  };

  const handleSessionUpdate = (updatedSession: any) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === updatedSession.id ? updatedSession : session
      )
    );
  };

  const handleFiltersApply = (filters: any) => {
    // Filter logic would be implemented here
    console.log("Filters applied:", filters);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "patients":
        return (
          <PatientManagement 
            onAddPatient={() => setShowAddPatient(true)}
            onViewProfile={handleViewPatientProfile}
            onScheduleSession={() => setShowScheduleSession(true)}
            onShowFilters={() => setShowFilterPanel(true)}
          />
        );
      case "schedule":
        return (
          <ScheduleView 
            onScheduleSession={() => setShowScheduleSession(true)}
            onViewSession={handleViewSessionDetails}
          />
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with patient activities and reminders</p>
              </div>
            </div>
            <NotificationsPanel 
              onViewAll={() => setShowAllNotifications(true)}
            />
          </div>
        );
      case "progress":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Progress Tracking</h1>
                <p className="text-muted-foreground">Monitor patient progress and therapy effectiveness</p>
              </div>
            </div>
            <div className="card-wellness text-center py-12">
              <p className="text-muted-foreground mb-4">Progress tracking features coming soon</p>
              <p className="text-sm text-muted-foreground">Charts, graphs, and milestone tracking will be available here</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome to your Panchakarma management center</p>
              </div>
              <Button 
                onClick={() => setShowScheduleSession(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>

            {/* Stats */}
            <DashboardStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RecentSessions 
                  onViewAll={() => setShowAllSessions(true)}
                  onViewSession={handleViewSessionDetails}
                />
              </div>
              <div>
                <NotificationsPanel 
                  onViewAll={() => setShowAllNotifications(true)}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>

      {/* Modals */}
      <AddPatientModal
        open={showAddPatient}
        onOpenChange={setShowAddPatient}
        onPatientAdded={handlePatientAdded}
      />
      
      <ScheduleSessionModal
        open={showScheduleSession}
        onOpenChange={setShowScheduleSession}
        onSessionScheduled={handleSessionScheduled}
        patients={patients}
      />
      
      <PatientProfileModal
        open={showPatientProfile}
        onOpenChange={setShowPatientProfile}
        patient={selectedPatient}
      />
      
      <SessionDetailsModal
        open={showSessionDetails}
        onOpenChange={setShowSessionDetails}
        session={selectedSession}
        onSessionUpdate={handleSessionUpdate}
      />
      
      <AllSessionsView
        open={showAllSessions}
        onOpenChange={setShowAllSessions}
        onSessionView={handleViewSessionDetails}
      />
      
      <AllNotificationsView
        open={showAllNotifications}
        onOpenChange={setShowAllNotifications}
      />
      
      <FilterPanel
        open={showFilterPanel}
        onOpenChange={setShowFilterPanel}
        onFiltersApply={handleFiltersApply}
      />
    </div>
  );
};

export default Index;
