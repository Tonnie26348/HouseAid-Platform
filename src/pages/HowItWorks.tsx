import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, UserCheck, FileSignature, CreditCard, BarChart, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Talent",
      description: "Access Kenya's most elite pool of domestic professionals.",
      details: [
        "Advanced filtering by neighborhood & expertise",
        "Detailed professional history & verification badges",
        "Direct chat with candidates before hiring",
        "Real-time availability calendars"
      ],
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: UserCheck,
      title: "Vetting & Matching",
      description: "We handle the rigorous background work so you don't have to.",
      details: [
        "Identity & Police Clearance verification",
        "Previous employer reference checks",
        "In-person skills and etiquette assessment",
        "Compatibility matching algorithms"
      ],
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: FileSignature,
      title: "Smart Contracts",
      description: "Legal protection made simple for the modern home.",
      details: [
        "Standardized professional agreements",
        "Customizable duties and work schedules",
        "In-app digital signing & secure storage",
        "Compliance with Kenyan Labor Laws"
      ],
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: CreditCard,
      title: "Seamless Management",
      description: "Process payments and track work with absolute clarity.",
      details: [
        "GPS-verified check-ins & check-outs",
        "Automated payroll via M-Pesa integration",
        "Detailed attendance & performance reports",
        "One-click contract renewals"
      ],
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-primary/20 text-primary border-none mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Platform Guide</Badge>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
              A New Standard for <br /> 
              <span className="text-primary">Household Management.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              We've redesigned the hiring process from the ground up to prioritize 
              safety, dignity, and world-class efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`w-16 h-16 rounded-[1.5rem] ${step.bg} ${step.color} flex items-center justify-center shadow-sm`}>
                          <step.icon className="w-8 h-8" />
                       </div>
                       <span className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Step 0{index + 1}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">{step.title}</h2>
                    <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">{step.description}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                       {step.details.map((detail, di) => (
                         <div key={di} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 font-medium">{detail}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className={`relative ${isEven ? '' : 'lg:order-1'}`}>
                     <div className="absolute inset-0 bg-gray-50 rounded-[3rem] -rotate-3 scale-105" />
                     <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden relative z-10 aspect-video flex items-center justify-center bg-white group">
                        <div className={`w-32 h-32 rounded-full ${step.bg} ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-700`}>
                           <step.icon className="w-16 h-16 opacity-40" />
                        </div>
                        {/* Abstract Mockup Element */}
                        <div className="absolute bottom-8 right-8 bg-gray-900 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                           <Zap className="w-6 h-6 text-primary" />
                        </div>
                     </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* World-Class FAQ Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">Common Inquiries</h2>
            <p className="text-xl text-gray-500 font-medium">Everything you need to know about the HouseAid experience.</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "How long does verification take?", a: "Standard verification takes 24-48 hours. Premium expedited vetting can be completed in under 12 hours." },
              { q: "Can I hire for a one-time event?", a: "Yes, our 'Gig' contract type is perfect for one-day events, deep cleaning sessions, or temporary relief help." },
              { q: "How are disputes handled?", a: "HouseAid provides an integrated mediation portal. Our staff reviews GPS logs and contract terms to ensure a fair resolution for both parties." },
              { q: "Is M-Pesa the only payment method?", a: "Currently, we prioritize M-Pesa for its speed and reliability in Kenya, but we are expanding to card payments soon." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white rounded-[2rem] px-8 shadow-sm">
                <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline text-gray-900">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-500 pb-6 font-medium leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">Ready to experience the difference?</h2>
             <p className="text-xl text-gray-500 mb-12 font-medium">
               Join thousands of modern households and professional workers today.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button asChild size="lg" className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                 <Link to="/join">Get Started Now</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl text-xl font-black border-2 hover:bg-gray-50 transition-all">
                 <Link to="/contact">Contact Support</Link>
               </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

