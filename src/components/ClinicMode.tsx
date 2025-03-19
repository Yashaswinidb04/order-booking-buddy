
import { useState } from "react";
import { Calendar, User, Clock, DollarSign, ArrowRight, Stethoscope, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ResponseCard from "./ResponseCard";

const COMMON_QUESTIONS = [
  "Which doctors are available tomorrow?",
  "Can I book an appointment with Dr. Smith?",
  "What is the consultation fee?",
  "Do you have specialists available?",
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    specialty: "General Medicine",
    availability: "Mon, Wed: 9 AM - 4 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=300&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. Michael Johnson",
    specialty: "Cardiology",
    availability: "Tue, Thu: 10 AM - 6 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Pediatrics",
    availability: "Fri: 8 AM - 3 PM",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop"
  }
];

const ClinicMode = () => {
  const [_, setSelectedQuestion] = useState<string | null>(null);
  
  const handleQuestionClick = (question: string) => {
    console.log("Selected question:", question);
    setSelectedQuestion(question);
    // In a real app, this would trigger the chat to send the question
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <section className="space-y-3">
        <h2 className="text-2xl font-medium text-center md:text-left">Clinic Appointment Booking</h2>
        <p className="text-muted-foreground text-center md:text-left">
          Ask our AI assistant about doctor availability, book appointments, or inquire about services
        </p>
      </section>
      
      <section className="space-y-3">
        <h3 className="text-lg font-medium">Our Doctors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOCTORS.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow glass glass-hover">
              <div className="aspect-video relative bg-gradient-to-b from-blue-50 to-blue-100">
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/70 backdrop-blur-sm">
                  <h4 className="font-medium text-sm">{doctor.name}</h4>
                  <p className="text-xs text-blue-600">{doctor.specialty}</p>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{doctor.availability}</span>
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors">
                  <span>Book Appointment</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResponseCard
          title="Consultation Fees"
          icon={<DollarSign className="h-4 w-4 text-green-500" />}
          category="Pricing"
        >
          <ul className="space-y-1.5">
            <li className="flex justify-between">
              <span>General Consultation</span>
              <span className="font-medium">$75</span>
            </li>
            <li className="flex justify-between">
              <span>Specialist Consultation</span>
              <span className="font-medium">$100-$150</span>
            </li>
            <li className="flex justify-between">
              <span>Follow-up Visit</span>
              <span className="font-medium">$50</span>
            </li>
            <li className="text-xs text-muted-foreground mt-1">
              *Insurance coverage may apply
            </li>
          </ul>
        </ResponseCard>
        
        <ResponseCard
          title="Booking Process"
          icon={<Calendar className="h-4 w-4 text-blue-500" />}
          category="Appointments"
        >
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Select your preferred doctor and specialty</li>
            <li>Choose a date and time slot</li>
            <li>Provide your information</li>
            <li>Confirm your appointment</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-2">
            You'll receive a confirmation email with your appointment details
          </p>
        </ResponseCard>
        
        <ResponseCard
          title="Patient Information"
          icon={<User className="h-4 w-4 text-indigo-500" />}
          category="Requirements"
          className="lg:col-span-1"
        >
          <p className="mb-2">Please bring the following for your appointment:</p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
              <span>Photo ID</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
              <span>Insurance card (if applicable)</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
              <span>Medical history</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
              <span>List of current medications</span>
            </li>
          </ul>
        </ResponseCard>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-medium">Specialties Available</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-white rounded-full mb-2">
              <Heart className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-center">Cardiology</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-white rounded-full mb-2">
              <Stethoscope className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-center">General Medicine</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-white rounded-full mb-2">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-center">Pediatrics</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
            <div className="p-2 bg-white rounded-full mb-2">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-center">Dermatology</span>
          </div>
        </div>
      </section>
      
      <section className="space-y-3">
        <h3 className="text-lg font-medium">Common Questions</h3>
        <div className="flex flex-wrap gap-2">
          {COMMON_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClinicMode;
