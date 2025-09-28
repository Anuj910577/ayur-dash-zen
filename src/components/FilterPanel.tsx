import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFiltersApply: (filters: any) => void;
}

export function FilterPanel({ open, onOpenChange, onFiltersApply }: FilterPanelProps) {
  const [filters, setFilters] = useState({
    therapyTypes: [] as string[],
    status: "all",
    progressRange: [0, 100],
    ageRange: [18, 80],
    gender: "all",
    treatmentStage: "all",
    lastSessionDays: 30,
    showActiveOnly: false
  });

  const therapyOptions = [
    "Panchakarma Detox",
    "Stress Relief Program", 
    "Joint Pain Treatment",
    "Abhyanga Therapy",
    "Shirodhara Treatment",
    "Swedana Therapy"
  ];

  const handleTherapyToggle = (therapy: string) => {
    setFilters(prev => ({
      ...prev,
      therapyTypes: prev.therapyTypes.includes(therapy)
        ? prev.therapyTypes.filter(t => t !== therapy)
        : [...prev.therapyTypes, therapy]
    }));
  };

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    const resetFilters = {
      therapyTypes: [],
      status: "all",
      progressRange: [0, 100],
      ageRange: [18, 80],
      gender: "all",
      treatmentStage: "all",
      lastSessionDays: 30,
      showActiveOnly: false
    };
    setFilters(resetFilters);
    onFiltersApply(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.therapyTypes.length > 0) count++;
    if (filters.status !== "all") count++;
    if (filters.progressRange[0] !== 0 || filters.progressRange[1] !== 100) count++;
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 80) count++;
    if (filters.gender !== "all") count++;
    if (filters.treatmentStage !== "all") count++;
    if (filters.lastSessionDays !== 30) count++;
    if (filters.showActiveOnly) count++;
    return count;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
            Advanced Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Therapy Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Therapy Types</Label>
            <div className="grid grid-cols-2 gap-3">
              {therapyOptions.map((therapy) => (
                <div key={therapy} className="flex items-center space-x-2">
                  <Checkbox
                    id={`therapy-${therapy}`}
                    checked={filters.therapyTypes.includes(therapy)}
                    onCheckedChange={() => handleTherapyToggle(therapy)}
                  />
                  <Label 
                    htmlFor={`therapy-${therapy}`}
                    className="text-sm cursor-pointer"
                  >
                    {therapy}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Patient Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Patient Status</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Progress Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Treatment Progress ({filters.progressRange[0]}% - {filters.progressRange[1]}%)
            </Label>
            <Slider
              value={filters.progressRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, progressRange: value }))}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <Separator />

          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Age Range ({filters.ageRange[0]} - {filters.ageRange[1]} years)
              </Label>
              <Slider
                value={filters.ageRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, ageRange: value }))}
                max={80}
                min={18}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Gender</Label>
              <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Treatment Stage */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Treatment Stage</Label>
            <Select value={filters.treatmentStage} onValueChange={(value) => setFilters(prev => ({ ...prev, treatmentStage: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select treatment stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="week-1">Week 1</SelectItem>
                <SelectItem value="week-2">Week 2</SelectItem>
                <SelectItem value="week-3">Week 3</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Last Session */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Last Session Within (days): {filters.lastSessionDays}
            </Label>
            <Slider
              value={[filters.lastSessionDays]}
              onValueChange={(value) => setFilters(prev => ({ ...prev, lastSessionDays: value[0] }))}
              max={365}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active-only"
                checked={filters.showActiveOnly}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showActiveOnly: !!checked }))}
              />
              <Label htmlFor="active-only" className="text-sm cursor-pointer">
                Show only patients with upcoming sessions
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}