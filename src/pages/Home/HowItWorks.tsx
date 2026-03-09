import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, UserCheck, FileSignature, CreditCard, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  const steps = [
    { 
      icon: Search,
      title: "Discover Talent", 
      description: "Browse verified professionals with detailed histories and skill ratings.",
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    { 
      icon: ShieldCheck,
      title: "Verify & Match", 
      description: "Our multi-layer vetting ensures only the most reliable talent enters your home.",
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    { 
      icon: FileSignature,
      title: "Secure Contract", 
      description: "Sign digital agreements that protect both parties and ensure legal compliance.",
      color: "bg-orange-600",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    { 
      icon: CreditCard,
      title: "Manage & Pay", 
      description: "Track attendance via GPS and process secure payments via M-Pesa instantly.",
      color: "bg-green-600",
      lightColor: "bg-green-50",
      textColor: "text-green-600"
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
         <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="bg-primary/10 text-primary border-none mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">The HouseAid Journey</Badge>
          <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight text-gray-900 leading-[1.1]">
            How We Revolutionize <br />
            <span className="text-primary">Household Staffing.</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            A simple, secure four-step process designed to bring peace of mind 
            and professional standards to every Kenyan household.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 ${step.lightColor} ${step.textColor} rounded-3xl flex items-center justify-center mx-auto shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-sm text-gray-900 shadow-lg border border-gray-50">
                      0{index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{step.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6">{step.description}</p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 w-full">
                     <div className="flex justify-center items-center gap-2 text-primary font-bold text-sm">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                     </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-20">
          <Link to="/how-it-works">
            <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
              See Full Guide <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
             </div>
             <div className="text-sm font-bold text-gray-600">
                <span className="text-primary">5,000+</span> Trust Us
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


