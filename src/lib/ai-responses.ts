
import { Mode } from "@/pages/Index";

interface RestaurantQuestion {
  type: 'vegetarian' | 'gluten-free' | 'recommendation' | 'time' | 'other';
}

interface ClinicQuestion {
  type: 'availability' | 'booking' | 'fee' | 'other';
}

type Question = RestaurantQuestion | ClinicQuestion;

export const categorizeQuestion = (question: string, mode: Mode): Question => {
  question = question.toLowerCase();
  
  if (mode === "restaurant") {
    if (question.includes('vegetarian') || question.includes('vegan')) {
      return { type: 'vegetarian' };
    } else if (question.includes('gluten-free') || question.includes('gluten free')) {
      return { type: 'gluten-free' };
    } else if (question.includes('recommend') || question.includes('suggestions') || question.includes('popular')) {
      return { type: 'recommendation' };
    } else if (question.includes('time') || question.includes('long') || question.includes('wait') || question.includes('ready')) {
      return { type: 'time' };
    } else {
      return { type: 'other' };
    }
  } else {
    // Clinic mode
    if (question.includes('available') || question.includes('schedule')) {
      return { type: 'availability' };
    } else if (question.includes('book') || question.includes('appointment')) {
      return { type: 'booking' };
    } else if (question.includes('fee') || question.includes('cost') || question.includes('price')) {
      return { type: 'fee' };
    } else {
      return { type: 'other' };
    }
  }
};

export const generateResponse = (question: string, mode: Mode) => {
  const questionType = categorizeQuestion(question, mode);
  
  if (mode === "restaurant") {
    const type = (questionType as RestaurantQuestion).type;
    
    switch (type) {
      case 'vegetarian':
        return {
          text: "We offer several vegetarian options including our Seasonal Vegetable Risotto, Mushroom Linguine, Mediterranean Salad, and Veggie Burger. Would you like more details about any of these dishes?",
          items: [
            { name: "Seasonal Vegetable Risotto", price: "$14.99", description: "Creamy arborio rice with seasonal vegetables and parmesan" },
            { name: "Mushroom Linguine", price: "$13.99", description: "Linguine pasta with wild mushrooms in a garlic cream sauce" },
            { name: "Mediterranean Salad", price: "$10.99", description: "Mixed greens with feta, olives, tomatoes, and lemon dressing" },
            { name: "Veggie Burger", price: "$12.99", description: "House-made vegetable patty with avocado and special sauce" }
          ]
        };
        
      case 'gluten-free':
        return {
          text: "Yes, we have several gluten-free options including our Grilled Salmon, Quinoa Bowl, Steak with Roasted Vegetables, and most of our salads can be prepared gluten-free.",
          items: [
            { name: "Grilled Salmon", price: "$18.99", description: "Wild-caught salmon with lemon herb sauce" },
            { name: "Quinoa Bowl", price: "$13.99", description: "Protein-rich quinoa with roasted vegetables and tahini dressing" },
            { name: "Steak with Roasted Vegetables", price: "$22.99", description: "Grass-fed beef with seasonal vegetables" },
            { name: "Garden Salad (GF)", price: "$9.99", description: "Fresh greens with seasonal toppings and vinaigrette" }
          ]
        };
        
      case 'recommendation':
        return {
          text: "Based on our popular items today, I'd recommend our Chef's Special Pasta, Signature Burger, or the Seasonal Fish. Our Chocolate Lava Cake is the most popular dessert right now.",
          items: [
            { name: "Chef's Special Pasta", price: "$16.99", description: "House-made pasta with today's special sauce and fresh ingredients" },
            { name: "Signature Burger", price: "$15.99", description: "Premium beef patty with special sauce and artisanal cheese" },
            { name: "Seasonal Fish", price: "$19.99", description: "Catch of the day prepared with seasonal ingredients" },
            { name: "Chocolate Lava Cake", price: "$8.99", description: "Warm chocolate cake with a molten center, served with vanilla ice cream" }
          ]
        };
        
      case 'time':
        return {
          text: "Most orders are ready within 15-20 minutes. During peak hours (12:00-2:00 PM and 6:00-8:00 PM), it might take 25-30 minutes. Would you like to place an order now?",
          currentWait: "Approximately 15 minutes"
        };
        
      default:
        return {
          text: "I'd be happy to help with your question about our restaurant. You can ask about our menu, dietary options, recommendations, preparation time, or place an order."
        };
    }
  } else {
    // Clinic mode
    const type = (questionType as ClinicQuestion).type;
    
    switch (type) {
      case 'availability':
        return {
          text: "We have several doctors available this week. Dr. Smith is available on Monday and Wednesday, Dr. Johnson on Tuesday and Thursday, and Dr. Williams on Friday. Would you like to book an appointment with any of them?",
          availableDoctors: [
            { name: "Dr. Sarah Smith", specialty: "General Medicine", availability: "Monday, Wednesday: 9 AM - 4 PM" },
            { name: "Dr. Michael Johnson", specialty: "Cardiology", availability: "Tuesday, Thursday: 10 AM - 6 PM" },
            { name: "Dr. Emily Williams", specialty: "Pediatrics", availability: "Friday: 8 AM - 3 PM" }
          ]
        };
        
      case 'booking':
        return {
          text: "I'd be happy to help you book an appointment. Could you please specify which doctor and what time would work for you? Also, please let me know the reason for your visit so I can allocate the appropriate time slot.",
          nextSteps: [
            "Select a doctor from our available physicians",
            "Choose a date and time that works for you",
            "Briefly describe the reason for your visit",
            "Provide your contact information for confirmation"
          ]
        };
        
      case 'fee':
        return {
          text: "The consultation fee varies depending on the type of visit and specialist. General consultation is $75, specialist consultation ranges from $100 to $150. Some insurance plans may cover part or all of these costs.",
          consultationFees: [
            { type: "General Consultation", fee: "$75" },
            { type: "Specialist Consultation", fee: "$100-$150" },
            { type: "Follow-up Visit", fee: "$50" },
            { type: "Diagnostic Tests", fee: "Varies by procedure" }
          ]
        };
        
      default:
        return {
          text: "I'd be happy to help with your question about our clinic. You can ask about doctor availability, booking appointments, consultation fees, or any other clinic-related inquiries."
        };
    }
  }
};
