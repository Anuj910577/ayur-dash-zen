import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Star,
  TrendingUp,
  Clock
} from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "3",
    change: "+3 registered",
    changeType: "positive" as const,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Today's Sessions",
    value: "0",
    change: "0 in progress",
    changeType: "neutral" as const,
    icon: Calendar,
    color: "bg-primary",
  },
  {
    title: "Completion Rate",
    value: "100%",
    change: "4 completed",
    changeType: "positive" as const,
    icon: CheckCircle,
    color: "bg-success",
  },
  {
    title: "Avg. Rating",
    value: "4.3",
    change: "3 reviews",
    changeType: "positive" as const,
    icon: Star,
    color: "bg-warning",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="metric-card">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.color}/10`}>
              <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className={`h-3 w-3 ${
                stat.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'
              }`} />
              <span className={`${
                stat.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}