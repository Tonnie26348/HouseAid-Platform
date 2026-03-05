import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, UserCheck, FileSignature, CreditCard, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    { 
      icon: Search,
      title: "Search & Browse", 
      description: "Discover thousands of verified domestic professionals in your local area.",
      color: "bg-blue-600"
    },
    { 
      icon: UserCheck,
      title: "Match & Verify", 
      description: "Review detailed profiles, professional ratings, and background checks.",
      color: "bg-purple-600"
    },
    { 
      icon: FileSignature,
      title: "Secure Contract", 
      description: "Set clear terms and sign a digital contract that protects both parties.",
      color: "bg-orange-600"
    },
    { 
      icon: CreditCard,
      title: "Track & Pay", 
      description: "Manage attendance and process secure payments via M-Pesa.",
      color: "bg-green-600"
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-gray-900">
            How HouseAid Works
          </h2>
          <p className="text-xl text-gray-500 font-medium">
            A simple, secure four-step process designed for the modern Kenyan household.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-8">
                    <div className={`w-20 h-20 ${step.color} text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-gray-200 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-sm text-gray-400 shadow-sm border border-gray-100">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed px-4">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/join">
            <Button size="lg" className="h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

export default HowItWorks;

