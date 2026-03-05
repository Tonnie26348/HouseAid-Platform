import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, TrendingUp, CreditCard, FileText, Award, CheckCircle, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import heroImage from "@/assets/hero-workers.jpg";
import { motion } from "framer-motion";

const Workers = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Skills Academy",
      description: "Access free, certified training in childcare, culinary arts, and professional etiquette.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: ShieldCheck,
      title: "Work with Dignity",
      description: "We partner only with verified households who respect your professional boundaries.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: CreditCard,
      title: "Fair, Fast Pay",
      description: "Digital salary processing ensures you are paid on time, every time, via M-Pesa.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: FileText,
      title: "Legal Protection",
      description: "Transparent digital contracts that protect your rights and outline clear terms.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Build a professional history with reviews that help you earn higher wages over time.",
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn recognized badges that showcase your expertise to premium employers.",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <Award className="w-4 h-4" />
                <span>Elevate Your Professional Career</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-gray-900">
                Dignity, Growth, <br /> 
                <span className="text-primary">& Better Pay.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-xl">
                Join Kenya's first professional network for domestic specialists. 
                Get certified, find verified employers, and build the career you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-16 px-10 text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  <Link to="/join">Apply as Professional</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl rounded-2xl border-2 hover:bg-gray-50 transition-all">
                  <Link to="/how-it-works">Learn the Process</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src={heroImage} alt="Professional worker" className="w-full h-[600px] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-gray-900">
              Your Career, Reimagined.
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              We provide the tools and support you need to succeed as a modern domestic professional.
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
                <Card className="group p-8 h-full border-none shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2.5rem] bg-gray-50/50 hover:bg-white border border-gray-100/50">
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

      {/* Success Stories - Premium Layout */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Real Stories, Real Impact.</h2>
            <p className="text-xl text-gray-400 font-medium">Hear from professionals who have transformed their lives through HouseAid.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mary Njeri", role: "Childcare Specialist", text: "HouseAid gave me more than a job; they gave me a profession. I now have health insurance and a stable future for my kids." },
              { name: "Grace Akinyi", role: "Executive Housekeeper", text: "The certification I earned changed everything. Employers now respect my expertise and pay me what I'm truly worth." },
              { name: "Mercy Wambui", role: "Professional Chef", text: "I love the M-Pesa payments. No more chasing salaries. It's safe, professional, and I feel valued every single day." }
            ].map((story, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-[2.5rem] p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{story.name}</h4>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed italic">"{story.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Start Your Journey Today.</h2>
               <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 font-medium">
                 Ready to build a career with respect, safety, and growth? 
                 Apply to join the HouseAid professional network now.
               </p>
               <Button asChild size="lg" variant="secondary" className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-105">
                 <Link to="/join">Create Worker Account <ArrowRight className="ml-3 w-6 h-6" /></Link>
               </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Workers;
