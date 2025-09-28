import React, { useState } from "react";
import { Users, User, Calendar, Search, Activity, TrendingUp, BarChart3, PieChart, Download, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ProgressTracking: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("patients");

  // Hardcoded demo data
  const stats = [
    { title: "Total Patients", value: "245", change: "+12%", icon: Users, color: "text-primary" },
    { title: "Therapists", value: "12", change: "+2%", icon: User, color: "text-success" },
    { title: "Last 30 Days", value: "156", change: "+28%", icon: Calendar, color: "text-warning" },
    { title: "Search", value: "", icon: Search, color: "text-muted-foreground", isSearch: true },
  ];

  const therapyData = [
    { name: "Green Therapy", value: 60, color: "var(--chart-green)" },
    { name: "Other", value: 40, color: "#e5e7eb" },
  ];

  const ratingData = [
    { name: "1", rating: 10 },
    { name: "2", rating: 20 },
    { name: "3", rating: 30 },
    { name: "4", rating: 25 },
    { name: "5", rating: 15 },
  ];

  const chartConfig = {
    green: { label: "Green Therapy", color: "hsl(var(--chart-green))" },
    other: { label: "Other", color: "hsl(0 0% 92%)" },
    rating1: { label: "1 Star", color: "hsl(var(--chart-accent))" },
    rating2: { label: "2 Stars", color: "hsl(var(--chart-accent))" },
    rating3: { label: "3 Stars", color: "hsl(var(--chart-green))" },
    rating4: { label: "4 Stars", color: "hsl(var(--chart-green))" },
    rating5: { label: "5 Stars", color: "hsl(var(--chart-green))" },
  };

  const comparisonData = [
    { patient: "John Doe", progress: "75%", status: "Good" },
    { patient: "Jane Smith", progress: "60%", status: "Moderate" },
    { patient: "Bob Johnson", progress: "90%", status: "Excellent" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panchakarma Manager Progress Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor patient outcomes and effectiveness</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border">
        <Button variant={activeFilter === "patients" ? "default" : "outline"} onClick={() => setActiveFilter("patients")}>
          Patients
        </Button>
        <Button variant={activeFilter === "therapists" ? "default" : "outline"} onClick={() => setActiveFilter("therapists")}>
          Therapists
        </Button>
        <Button variant={activeFilter === "last30" ? "default" : "outline"} onClick={() => setActiveFilter("last30")}>
          Last 30 Days
        </Button>
        <Input placeholder="Search patient cases..." className="max-w-sm" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <Badge className={stat.change ? "text-xs" : "hidden"} variant="secondary">
                {stat.change}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
              {stat.isSearch && (
                <Input placeholder="Search..." className="mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Individual Progress */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Individual Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={75} className="w-full [&>div]:bg-primary" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">75%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Effectiveness */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                Treatment Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-success">4.5</div>
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>

          {/* Patient Comparison */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-accent" />
                Patient Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.patient}</TableCell>
                      <TableCell>{item.progress}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Excellent" ? "default" : item.status === "Good" ? "secondary" : "outline"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Therapy Distribution Pie Chart */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-primary" />
              Therapy Distribution
            </CardTitle>
            <CardDescription>Breakdown of therapy types</CardDescription>
          </CardHeader>
          <CardContent className="aspect-square">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPie
                    data={therapyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {therapyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Patient Rating Bar Chart */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-success" />
              Patient Rating Distribution
            </CardTitle>
            <CardDescription>Average ratings across patients</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={ratingData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <RechartsBar dataKey="rating" radius={4}>
                    {ratingData.map((_, index) => (
                      <Cell key={`bar-${index}`} fill={index < 2 ? "hsl(var(--chart-accent))" : "hsl(var(--chart-green))"} />
                    ))}
                  </RechartsBar>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking;
