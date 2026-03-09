import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, UserCheck, FileSignature, CreditCard, 
  ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2, 
  Star, Lock, MapPin, Smartphone, Fingerprint, 
  FileText, Calendar, Bell, Heart, Award,
  UserPlus, GraduationCap, Briefcase, Wallet,
  CheckCircle, Shield, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"employers" | "workers">("employers");

  const employerSteps = [
    {
      icon: Search,
      title: "Discover Elite Talent",
      description: "Access Kenya's most elite pool of domestic professionals, curated for excellence and reliability.",
      details: [
        "Advanced filtering by neighborhood & expertise",
        "Detailed professional history & verification badges",
        "Direct chat with candidates before hiring",
        "Real-time availability calendars"
      ],
      color: "text-blue-600",
      bg: "bg-blue-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-[280px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-4 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                   <UserCheck className="w-6 h-6" />
                </div>
                <div>
                   <div className="h-3 w-24 bg-gray-100 rounded-full mb-2" />
                   <div className="h-2 w-16 bg-gray-50 rounded-full" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex items-center gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                   <span className="text-[10px] font-bold text-gray-400 ml-1">4.9 (12 reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                   <Badge className="text-[8px] bg-green-50 text-green-600 border-none px-2 py-0">Verified</Badge>
                   <Badge className="text-[8px] bg-blue-50 text-blue-600 border-none px-2 py-0">Top Rated</Badge>
                </div>
             </div>
             <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
                <div className="h-3 w-12 bg-gray-100 rounded-full" />
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                   <ArrowRight className="w-4 h-4 text-primary" />
                </div>
             </div>
          </div>
          <div className="absolute top-12 right-12 w-16 h-16 bg-blue-600 rounded-2xl shadow-xl flex items-center justify-center text-white transform rotate-12 animate-pulse">
             <Search className="w-8 h-8" />
          </div>
        </div>
      )
    },
    {
      icon: ShieldCheck,
      title: "Vetting & Matching",
      description: "We handle the rigorous background work, conducting multi-layer verifications for your peace of mind.",
      details: [
        "Identity & Police Clearance verification",
        "Previous employer reference checks",
        "In-person skills and etiquette assessment",
        "Compatibility matching algorithms"
      ],
      color: "text-purple-600",
      bg: "bg-purple-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-[300px] bg-gray-900 rounded-3xl shadow-2xl p-6 space-y-6 transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
             <div className="flex justify-between items-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <Badge className="bg-primary/20 text-primary border-none">100% Verified</Badge>
             </div>
             <div className="space-y-3">
                {[
                  { label: "Identity Check", status: "Passed" },
                  { label: "Criminal Record", status: "Clean" },
                  { label: "Health Clearance", status: "Active" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-2xl">
                     <span className="text-white/60 text-xs font-medium">{item.label}</span>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">{item.status}</span>
                     </div>
                  </div>
                ))}
             </div>
             <div className="flex items-center gap-3 pt-2">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="w-[85%] h-full bg-primary" />
                </div>
                <span className="text-white/40 text-[10px] font-bold">85% Match</span>
             </div>
          </div>
        </div>
      )
    },
    {
      icon: FileSignature,
      title: "Smart Digital Contracts",
      description: "Legal protection made simple for the modern home. Professional agreements at your fingertips.",
      details: [
        "Standardized professional agreements",
        "Customizable duties and work schedules",
        "In-app digital signing & secure storage",
        "Compliance with Kenyan Labor Laws"
      ],
      color: "text-orange-600",
      bg: "bg-orange-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-[280px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-0 overflow-hidden transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
             <div className="bg-orange-50 p-4 border-b border-orange-100">
                <div className="flex items-center gap-3">
                   <FileText className="w-5 h-5 text-orange-600" />
                   <span className="text-xs font-bold text-gray-900">Nanny Contract #482</span>
                </div>
             </div>
             <div className="p-6 space-y-4">
                <div className="space-y-2">
                   <div className="h-2 w-full bg-gray-50 rounded-full" />
                   <div className="h-2 w-[90%] bg-gray-50 rounded-full" />
                   <div className="h-2 w-[80%] bg-gray-50 rounded-full" />
                </div>
                <div className="pt-4 space-y-3">
                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                         <span className="text-[8px] font-bold text-gray-400 uppercase">Employer Signature</span>
                         <div className="h-8 w-24 bg-gray-50 rounded-lg flex items-center justify-center italic text-gray-300 text-[10px]">Signed via app</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                         <Fingerprint className="w-6 h-6" />
                      </div>
                   </div>
                </div>
                <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-[10px] h-8 rounded-xl">Execute Agreement</Button>
             </div>
          </div>
        </div>
      )
    },
    {
      icon: CreditCard,
      title: "Seamless Management",
      description: "Process payments and track work with absolute clarity. One dashboard for everything you need.",
      details: [
        "GPS-verified check-ins & check-outs",
        "Automated payroll via M-Pesa integration",
        "Detailed attendance & performance reports",
        "One-click contract renewals"
      ],
      color: "text-green-600",
      bg: "bg-green-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <div className="w-full max-w-[280px] space-y-4">
              <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4 border border-gray-100 transform -translate-x-4 animate-float">
                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Smartphone className="w-5 h-5" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-gray-900">M-Pesa Payment Sent</div>
                    <div className="text-[8px] text-gray-400">Salary - Feb 2024</div>
                 </div>
                 <div className="ml-auto text-green-600 font-bold text-xs">KES 18,500</div>
              </div>
              <div className="bg-gray-900 rounded-2xl shadow-xl p-4 flex items-center gap-4 transform translate-x-4 transition-transform group-hover:translate-x-0 duration-500">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-white">Checked In</div>
                    <div className="text-[8px] text-white/40">Kilimani, Nairobi • 8:02 AM</div>
                 </div>
                 <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4 border border-gray-100 transform -translate-x-2">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="w-full h-full bg-blue-600" />
                    </div>
                    <div className="mt-2 text-[8px] font-bold text-gray-400">22 / 22 Days Worked</div>
                 </div>
              </div>
           </div>
        </div>
      )
    }
  ];

  const workerSteps = [
    {
      icon: UserPlus,
      title: "Build Your Legacy",
      description: "Create a professional profile that showcases your skills, experience, and commitment to excellence.",
      details: [
        "Showcase specialized certifications",
        "Upload professional references",
        "Set your own flexible schedule",
        "Get discovered by high-end employers"
      ],
      color: "text-blue-600",
      bg: "bg-blue-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <div className="w-full max-w-[280px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transform rotate-2 group-hover:rotate-0 transition-all duration-500">
              <div className="h-24 bg-primary/10 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-primary">
                    <UserCheck className="w-8 h-8" />
                 </div>
              </div>
              <div className="p-6 space-y-4 text-center">
                 <div>
                    <div className="h-4 w-32 bg-gray-100 rounded-full mx-auto mb-2" />
                    <div className="h-2 w-20 bg-gray-50 rounded-full mx-auto" />
                 </div>
                 <div className="flex justify-center gap-2">
                    <Badge className="bg-blue-50 text-blue-600 text-[8px] border-none px-2">Nanny</Badge>
                    <Badge className="bg-purple-50 text-purple-600 text-[8px] border-none px-2">First Aid</Badge>
                 </div>
                 <div className="pt-4 grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 rounded-xl">
                       <div className="text-[10px] font-bold text-gray-900">5+ Years</div>
                       <div className="text-[8px] text-gray-400 uppercase">Experience</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-xl">
                       <div className="text-[10px] font-bold text-gray-900">4.9/5</div>
                       <div className="text-[8px] text-gray-400 uppercase">Rating</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: GraduationCap,
      title: "Master Your Craft",
      description: "Access HouseAid Academy for specialized training and obtain the credentials you need to earn more.",
      details: [
        "Certified professional etiquette training",
        "Advanced safety and childcare modules",
        "Home management & technology skills",
        "Earn badges that boost your profile"
      ],
      color: "text-purple-600",
      bg: "bg-purple-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <div className="w-full max-w-[300px] bg-gray-900 rounded-3xl shadow-2xl p-6 space-y-6 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center">
                 <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <GraduationCap className="w-6 h-6" />
                 </div>
                 <Badge className="bg-primary/20 text-primary border-none text-[10px]">Course in Progress</Badge>
              </div>
              <div className="space-y-4">
                 <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-primary" />
                 </div>
                 <div className="grid grid-cols-1 gap-3">
                    {["Child Nutrition", "Professional Ethics", "Home Safety"].map((task, i) => (
                       <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl">
                          {i < 2 ? <CheckCircle className="w-4 h-4 text-primary" /> : <div className="w-4 h-4 rounded-full border-2 border-white/20" />}
                          <span className="text-white/80 text-xs font-medium">{task}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )
    },
    {
      icon: Briefcase,
      title: "Safe & Secure Gigs",
      description: "Enjoy the security of formal contracts, fair wages, and a system that protects your labor rights.",
      details: [
        "Automated labor law compliance",
        "Guaranteed payment protection",
        "Transparent working conditions",
        "Mediation support for all disputes"
      ],
      color: "text-orange-600",
      bg: "bg-orange-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <div className="w-full max-w-[280px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 transform rotate-1 group-hover:rotate-0 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Shield className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-gray-900">Worker Protection</div>
                    <div className="text-[8px] text-gray-400 uppercase">Verified Agreement</div>
                 </div>
              </div>
              <div className="space-y-3 mb-6">
                 <div className="flex justify-between items-center text-[10px] font-medium text-gray-600">
                    <span>Minimum Wage Compliance</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-medium text-gray-600">
                    <span>Working Hours Tracking</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-medium text-gray-600">
                    <span>Payment Escrow Protection</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                 </div>
              </div>
              <div className="h-10 w-full bg-gray-50 rounded-xl flex items-center justify-center italic text-gray-300 text-[10px]">Secure Digital Signature</div>
           </div>
        </div>
      )
    },
    {
      icon: Wallet,
      title: "Direct Payouts",
      description: "Receive your salary instantly via M-Pesa. Track your earnings and build a financial footprint.",
      details: [
        "Real-time payroll notifications",
        "Zero-delay M-Pesa payouts",
        "Electronic payslip generation",
        "Earnings history for bank loans"
      ],
      color: "text-green-600",
      bg: "bg-green-50",
      mockup: (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <div className="w-full max-w-[280px] space-y-4">
              <div className="bg-gray-900 rounded-[2rem] shadow-2xl p-6 transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                 <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                       <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Total Earnings</div>
                       <div className="text-2xl font-black text-white">KES 42,800</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                       <Wallet className="w-6 h-6" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                             <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                             <div className="text-[10px] font-bold text-white">Feb Salary</div>
                             <div className="text-[8px] text-white/40">M-Pesa Payout</div>
                          </div>
                       </div>
                       <div className="text-xs font-bold text-white">+18.5k</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )
    }
  ];

  const currentSteps = activeTab === "employers" ? employerSteps : workerSteps;

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-primary/10 text-primary border-none mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Platform Guide</Badge>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-tight text-gray-900">
              A New Standard for <br /> 
              <span className="text-primary">Household Management.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
              We've redesigned the hiring process from the ground up to prioritize 
              safety, dignity, and world-class efficiency for Kenyan homes.
            </p>

            <div className="flex justify-center mb-12">
               <div className="bg-gray-100 p-1.5 rounded-[1.5rem] flex items-center gap-1 shadow-inner">
                  <button 
                    onClick={() => setActiveTab("employers")}
                    className={`px-8 py-3 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === "employers" ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                     For Employers
                  </button>
                  <button 
                    onClick={() => setActiveTab("workers")}
                    className={`px-8 py-3 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === "workers" ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                     For Workers
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-40">
            {currentSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={isEven ? 'lg:pr-12' : 'lg:order-2 lg:pl-12'}>
                    <div className="flex items-center gap-4 mb-6">
                       <div className={`w-16 h-16 rounded-[1.5rem] ${step.bg} ${step.color} flex items-center justify-center shadow-sm`}>
                          <step.icon className="w-8 h-8" />
                       </div>
                       <span className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Step 0{index + 1}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">{step.title}</h2>
                    <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">{step.description}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                       {step.details.map((detail, di) => (
                         <div key={di} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                               <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-gray-600 font-medium text-sm leading-snug">{detail}</span>
                         </div>
                       ))}
                    </div>

                    <div className="mt-12">
                       <Button asChild variant="link" className="text-primary font-bold p-0 text-lg hover:no-underline group">
                          <Link to="/join" className="flex items-center gap-2">
                             Explore this feature <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                          </Link>
                       </Button>
                    </div>
                  </div>

                  <div className={`relative ${isEven ? '' : 'lg:order-1'}`}>
                     <div className={`absolute inset-0 bg-gray-50 rounded-[3rem] ${isEven ? '-rotate-3' : 'rotate-3'} scale-105`} />
                     <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden relative z-10 min-h-[400px] flex items-center justify-center bg-white group">
                        {step.mockup}
                     </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <Badge className="bg-primary text-gray-900 border-none mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Trust & Safety</Badge>
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight leading-tight">Your Peace of Mind is Our Priority.</h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                     {[
                        { icon: Lock, title: "Data Protection", desc: "Military-grade encryption for all personal and financial information." },
                        { icon: Award, title: "Compliance", desc: "Fully compliant with the Data Protection Act and Labor Laws." },
                        { icon: Heart, title: "Support", desc: "Dedicated 24/7 support for emergency mediation and assistance." },
                        { icon: ShieldCheck, title: "Insurance", desc: "Integrated liability coverage options for your household staff." }
                     ].map((item, i) => (
                        <div key={i} className="space-y-3">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                              <item.icon className="w-6 h-6" />
                           </div>
                           <h3 className="text-lg font-bold text-white">{item.title}</h3>
                           <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                     <Lock className="w-32 h-32 text-white/5" />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-3xl font-black text-white mb-6">Security First. Always.</h3>
                     <p className="text-gray-300 text-lg font-medium leading-relaxed mb-8">
                        At HouseAid, we understand that inviting someone into your home requires absolute trust. 
                        That's why we've built the most comprehensive vetting system in the industry.
                     </p>
                     <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                           <CheckCircle2 className="w-6 h-6 text-primary" />
                           <span className="text-white font-bold text-sm">Every worker is background-checked by the DCI</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                           <CheckCircle2 className="w-6 h-6 text-primary" />
                           <span className="text-white font-bold text-sm">Mandatory Skills & Etiquette Training</span>
                        </div>
                     </div>
                     <Button className="w-full h-14 rounded-2xl text-lg font-black">Learn More About Safety</Button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Expanded FAQ Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">Common Inquiries</h2>
            <p className="text-xl text-gray-500 font-medium">Everything you need to know about the HouseAid experience.</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "How long does verification take?", a: "Standard verification for workers takes 24-48 hours. This includes identity checks and police clearance verification. Premium expedited vetting can be completed in under 12 hours for urgent hiring needs." },
              { q: "Can I hire for a one-time event?", a: "Absolutely. Our 'Gig' contract type is designed for short-term needs such as one-day events, deep cleaning sessions, or temporary relief help while your regular staff is on leave." },
              { q: "How are disputes handled?", a: "HouseAid provides an integrated mediation portal. Our dedicated staff reviews GPS logs, communication history, and contract terms to ensure a fair and swift resolution for both employers and workers." },
              { q: "Is M-Pesa the only payment method?", a: "Currently, we prioritize M-Pesa for its speed and reliability in Kenya. However, we are in the process of integrating card payments and bank transfers to provide more flexibility for our users." },
              { q: "Who pays the worker's salary?", a: "The employer pays the worker's salary directly through the HouseAid platform. We hold the payment in a secure wallet and release it to the worker once the work period is completed and verified." },
              { q: "Are workers on HouseAid trained?", a: "Yes. All workers must complete the HouseAid Academy basic training, which covers professional etiquette, child safety (for nannies), and advanced cleaning techniques before they can be matched." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white rounded-[2rem] px-8 shadow-sm">
                <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline text-gray-900 text-left">
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
               Join thousands of modern households and professional workers today and transform how you manage your home.
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



