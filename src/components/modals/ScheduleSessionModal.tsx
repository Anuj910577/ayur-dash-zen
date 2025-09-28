import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ScheduleSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSessionScheduled: (session: any) => void;
  patients?: any[];
}

const therapyTypes = [
  { value: "abhyanga", label: "Abhyanga (Oil Massage)", duration: 90 },
  { value: "shirodhara", label: "Shirodhara (Oil Pouring)", duration: 60 },
  { value: "swedana", label: "Swedana (Steam Therapy)", duration: 45 },
  { value: "basti", label: "Basti (Medicated Enema)", duration: 120 },
  { value: "nasya", label: "Nasya (Nasal Administration)", duration: 30 },
  { value: "consultation", label: "Consultation", duration: 45 },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const rooms = ["Room 1", "Room 2", "Room 3", "Office"];

export function ScheduleSessionModal({ 
  open, 
  onOpenChange, 
  onSessionScheduled,
  patients = []
}: ScheduleSessionModalProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    therapyType: "",
    date: undefined as Date | undefined,
    time: "",
    duration: "",
    room: "",
    notes: "",
    specialInstructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.therapyType || !formData.date || !formData.time || !formData.room) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const selectedTherapy = therapyTypes.find(t => t.value === formData.therapyType);
    
    const newSession = {
      id: Date.now(),
      patientId: formData.patientId || Date.now().toString(),
      patientName: formData.patientName,
      therapyType: selectedTherapy?.label || formData.therapyType,
      date: formData.date,
      time: formData.time,
      duration: formData.duration || selectedTherapy?.duration || 60,
      room: formData.room,
      notes: formData.notes,
      specialInstructions: formData.specialInstructions,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };

    onSessionScheduled(newSession);
    
    toast({
      title: "Session Scheduled Successfully",
      description: `${selectedTherapy?.label} session scheduled for ${formData.patientName} on ${format(formData.date, "PPP")} at ${formData.time}.`,
    });

    // Reset form
    setFormData({
      patientId: "",
      patientName: "",
      therapyType: "",
      date: undefined,
      time: "",
      duration: "",
      room: "",
      notes: "",
      specialInstructions: "",
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTherapyChange = (therapyValue: string) => {
    const therapy = therapyTypes.find(t => t.value === therapyValue);
    setFormData(prev => ({
      ...prev,
      therapyType: therapyValue,
      duration: therapy?.duration.toString() || ""
    }));
  };

  const handlePatientChange = (patientId: string) => {
    const patient = patients.find(p => p.id.toString() === patientId);
    setFormData(prev => ({
      ...prev,
      patientId: patientId,
      patientName: patient?.name || ""
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Schedule Therapy Session
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Session Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="patient">Patient *</Label>
                {patients.length > 0 ? (
                  <Select onValueChange={handlePatientChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    placeholder="Enter patient name"
                    required
                  />
                )}
              </div>

              <div>
                <Label htmlFor="therapyType">Therapy Type *</Label>
                <Select onValueChange={handleTherapyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select therapy" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapyTypes.map((therapy) => (
                      <SelectItem key={therapy.value} value={therapy.value}>
                        {therapy.label} ({therapy.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="60"
                />
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      initialFocus
                      className="pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="time">Time *</Label>
                <Select onValueChange={(value) => handleInputChange("time", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="room">Room *</Label>
                <Select onValueChange={(value) => handleInputChange("room", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Additional Information</h3>
            
            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                placeholder="Pre-session preparation, dietary restrictions, etc."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Session Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes or observations"
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Schedule Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}