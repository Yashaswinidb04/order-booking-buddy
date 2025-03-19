
import { useState } from "react";
import { Clock, Utensils, Tag, Coffee, Heart, Leaf } from "lucide-react";
import ResponseCard from "./ResponseCard";

const COMMON_QUESTIONS = [
  "What vegetarian options do you have?",
  "Do you have any gluten-free items?",
  "Can you recommend a meal combo?",
  "How long will my order take?",
];

const RestaurantMode = () => {
  const [_, setSelectedQuestion] = useState<string | null>(null);
  
  const handleQuestionClick = (question: string) => {
    console.log("Selected question:", question);
    setSelectedQuestion(question);
    // In a real app, this would trigger the chat to send the question
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <section className="space-y-3">
        <h2 className="text-2xl font-medium text-center md:text-left">Restaurant Menu &amp; Ordering</h2>
        <p className="text-muted-foreground text-center md:text-left">
          Ask our AI assistant about our menu, get recommendations, or place an order
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResponseCard
          title="Today's Specials"
          icon={<Heart className="h-4 w-4 text-rose-500" />}
          category="Menu Highlights"
          className="md:col-span-2 lg:col-span-1"
        >
          <p className="mb-2">Our chef has prepared special dishes for today:</p>
          <ul className="space-y-1.5">
            <li className="flex justify-between">
              <span>Truffle Pasta</span>
              <span className="font-medium">$22.99</span>
            </li>
            <li className="flex justify-between">
              <span>Grilled Sea Bass</span>
              <span className="font-medium">$28.99</span>
            </li>
            <li className="flex justify-between">
              <span>Seasonal Risotto</span>
              <span className="font-medium">$19.99</span>
            </li>
          </ul>
        </ResponseCard>
        
        <ResponseCard
          title="Dietary Options"
          icon={<Leaf className="h-4 w-4 text-green-500" />}
          category="Health & Dietary"
        >
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-green-100 text-green-800">Vegetarian</span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-yellow-100 text-yellow-800">Gluten-Free</span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800">Vegan</span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-800">Dairy-Free</span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-orange-100 text-orange-800">Nut-Free</span>
          </div>
          <p className="mt-2">We accommodate all dietary preferences. Ask our AI about specific requirements.</p>
        </ResponseCard>
        
        <ResponseCard
          title="Current Wait Time"
          icon={<Clock className="h-4 w-4 text-blue-500" />}
          category="Order Status"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Standard Orders: ~15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span>Special Orders: ~25 minutes</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Times are approximate and may vary based on current demand
            </p>
          </div>
        </ResponseCard>
        
        <ResponseCard
          title="Popular Categories"
          icon={<Utensils className="h-4 w-4 text-amber-500" />}
          category="Menu"
          className="md:col-span-2"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-amber-700 text-sm text-center">
              Appetizers
            </button>
            <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-amber-700 text-sm text-center">
              Main Courses
            </button>
            <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-amber-700 text-sm text-center">
              Pasta & Risotto
            </button>
            <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-amber-700 text-sm text-center">
              Seafood
            </button>
            <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-amber-700 text-sm text-center">
              Desserts
            </button>
            <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-amber-700 text-sm text-center">
              Beverages
            </button>
          </div>
        </ResponseCard>
        
        <ResponseCard
          title="Current Promotions"
          icon={<Tag className="h-4 w-4 text-indigo-500" />}
          category="Offers"
        >
          <div className="space-y-2">
            <p className="font-medium text-indigo-600">Happy Hour: 4-6 PM</p>
            <p className="text-xs">All appetizers 30% off and select drinks at special prices</p>
            <p className="font-medium text-indigo-600 mt-3">Family Special</p>
            <p className="text-xs">Order for 4+ people and get a free dessert</p>
          </div>
        </ResponseCard>
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

export default RestaurantMode;
