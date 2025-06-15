
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  studentId: z.string().min(8, "Student ID must be at least 8 characters"),
  subject: z.string().min(1, "Please select a subject"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  date: z.string().min(1, "Please select a date"),
  topics: z.string().min(10, "Please describe the topics you need help with"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const TutoringBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      studentName: "",
      studentId: "",
      subject: "",
      preferredTime: "",
      date: "",
      topics: "",
    },
  });

  const subjects = [
    "Application Development 2",
    "Business Practice 2", 
    "Communications Networks 2",
    "ICT Fundamentals 2",
    "Multimedia Foundations 2",
    "Professional Communications 2",
    "Programming 2",
    "Project 2"
  ];

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const newBooking = {
        ...data,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem("tutoringBookings") || "[]");
      existingBookings.push(newBooking);
      localStorage.setItem("tutoringBookings", JSON.stringify(existingBookings));

      setBookings(existingBookings);

      toast({
        title: "Tutoring Session Booked!",
        description: `Your tutoring session for ${data.subject} on ${data.date} at ${data.preferredTime} has been booked. You'll receive a confirmation email soon.`,
      });

      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your tutoring session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          Book Tutoring
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Book Tutoring Session
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 24839292" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      min={getMinDate()}
                      max={getMaxDate()}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topics to Cover</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the specific topics or areas you need help with..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="flex-1"
              >
                {form.formState.isSubmitting ? "Booking..." : "Book Session"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TutoringBooking;
