import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, MapPin, CreditCard, RefreshCw, CheckCircle, Star, ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import heroImage from "@/assets/hero-employers.jpg";
import { motion } from "framer-motion";

const Employers = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Vetted & Verified",
      description: "Rigorous background checks and identity verification for every professional.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Smart attendance and location updates through our mobile interface.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Automated M-Pesa processing with full transaction transparency.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: RefreshCw,
      title: "Replacement Guarantee",
      description: "Not a perfect match? We provide immediate replacement assistance.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Users,
      title: "Legal Protection",
      description: "Comprehensive digital contracts compliant with Kenyan labor laws.",
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    {
      icon: Star,
      title: "Performance History",
      description: "Review detailed feedback and ratings from previous employers.",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Premium Household Staffing</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-gray-900">
                Peace of Mind <br /> 
                <span className="text-primary">At Your Doorstep.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-xl">
                Hire professional, background-checked domestic help with confidence. 
                Manage attendance, contracts, and payments all in one secure place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  <Link to="/join">Start Hiring Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-2xl border-2 hover:bg-gray-50 transition-all">
                  <Link to="/how-it-works">See How it Works</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src={heroImage} alt="Happy household" className="w-full h-[600px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 hidden md:block">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                       <CheckCircle className="w-7 h-7" />
                    </div>
                    <div>
                       <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Trust Score</p>
                       <p className="text-lg font-black text-gray-900">100% Verified</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-gray-900">
              Built for Modern Households
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              We've redesigned the hiring experience to be safe, transparent, and completely stress-free.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group p-8 h-full border-none shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2.5rem] bg-white">
                  <div className={cn("inline-flex p-4 rounded-2xl mb-6", benefit.bg, benefit.color)}>
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* World-Class FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Got Questions?</h2>
            <p className="text-lg text-gray-500 font-medium">Everything you need to know about hiring through HouseAid.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How do you verify the domestic workers?",
                a: "Our vetting process includes government-issued ID verification, police clearance certificates (Good Conduct), background checks with previous employers, and in-person skills assessments."
              },
              {
                q: "What happens if a worker leaves or is a poor match?",
                a: "HouseAid provides a 30-day replacement guarantee. If the placement isn't successful for any reason, our team will match you with a new professional at no additional platform cost."
              },
              {
                q: "Is the payment secure?",
                a: "Absolutely. All payments are processed through our secure M-Pesa gateway. Funds are only released to the worker once attendance is verified, providing security for both parties."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none bg-gray-50 rounded-[2rem] px-8">
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
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to hire your next pro?</h2>
               <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 font-medium">
                 Join thousands of Kenyan homes already experiencing the HouseAid difference. 
                 Safe, professional, and world-class.
               </p>
               <Button asChild size="lg" variant="secondary" className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-105">
                 <Link to="/join">Create Employer Account <ArrowRight className="ml-3 w-6 h-6" /></Link>
               </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Employers;

