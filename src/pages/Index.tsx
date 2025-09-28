import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentSessions } from "@/components/RecentSessions";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { PatientManagement } from "@/components/PatientManagement";
import { ScheduleView } from "@/components/ScheduleView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "patients":
        return <PatientManagement />;
      case "schedule":
        return <ScheduleView />;
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with patient activities and reminders</p>
              </div>
            </div>
            <NotificationsPanel />
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>

            {/* Stats */}
            <DashboardStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RecentSessions />
              </div>
              <div>
                <NotificationsPanel />
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
    </div>
  );
};

export default Index;
