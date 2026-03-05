import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, GraduationCap, Handshake, Building, Heart, Users, ShieldCheck, Globe, Zap, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Partners = () => {
  const opportunities = [
    {
      icon: Code,
      title: "Tech For Good",
      description: "Help us build the next generation of domestic staffing technology.",
      skills: ["React", "Node.js", "AI/ML", "Mobile"],
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: GraduationCap,
      title: "Skills Trainers",
      description: "Share your expertise to certify professionals in specialized home care.",
      skills: ["Childcare", "Culinary", "Etiquette"],
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Building,
      title: "Corporate ESG",
      description: "Partner with us to drive social impact within your corporate ecosystem.",
      skills: ["CSR", "Funding", "Scale"],
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Handshake,
      title: "Strategic Advisory",
      description: "Guide a high-growth social enterprise toward pan-African expansion.",
      skills: ["Strategy", "Network", "Growth"],
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-primary/20 text-primary border-none mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Global Ecosystem</Badge>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
              Let's Build the <span className="text-primary">Future</span> <br /> 
              of Work Together.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Join Kenya's fastest-growing domestic network as a strategic partner, 
              investor, or technical collaborator.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Partner - Impact Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
               <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                 Scale Your <span className="text-primary">Social Impact</span> <br /> 
                 With HouseAid.
               </h2>
               <div className="space-y-8">
                  <div className="flex gap-6">
                     <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary flex-shrink-0">
                        <Globe className="w-7 h-7" />
                     </div>
                     <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Pan-African Vision</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          We are building a scalable model starting in Nairobi, designed to professionalize 
                          the informal economy across the continent.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-green-600 flex-shrink-0">
                        <ShieldCheck className="w-7 h-7" />
                     </div>
                     <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Verified Trust</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          Partner with an organization that prioritizes safety and legal protection 
                          above all else. Our standards are the highest in the market.
                        </p>
                     </div>
                  </div>
               </div>
             </motion.div>

             <div className="relative">
                <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden relative z-10">
                   <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" className="h-[500px] w-full object-cover" alt="Partnerships" />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="text-3xl font-black mb-2">2,000+</div>
                      <p className="font-bold opacity-80 uppercase tracking-widest text-xs">Direct Lives Impacted</p>
                   </div>
                </Card>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 p-8 bg-white group h-full">
                  <div className={`w-14 h-14 rounded-2xl ${opp.bg} ${opp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <opp.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{opp.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6 text-sm">{opp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {opp.skills.map((skill, si) => (
                      <Badge key={si} className="bg-gray-50 text-gray-400 border-none rounded-lg px-2 py-0.5 text-[10px] font-black uppercase">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form - World Class Design */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gray-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
             
             <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <div>
                   <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-white">Inquiry <br /> <span className="text-primary">Portal.</span></h2>
                   <p className="text-lg text-gray-400 font-medium mb-10 leading-relaxed">
                     Ready to collaborate? Submit your proposal or partnership request and 
                     our strategic team will get back to you within 48 hours.
                   </p>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 text-gray-300 font-bold">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary"><Mail className="w-5 h-5" /></div>
                         <span>partnerships@houseaid.com</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-300 font-bold">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary"><Zap className="w-5 h-5" /></div>
                         <span>Fast-track response for NGO/Govt</span>
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 text-gray-900 shadow-2xl">
                   <form className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                         <Input placeholder="John Doe" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Organization</label>
                         <Input placeholder="NGO, Startup, Corp" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Partnership Type</label>
                         <select className="w-full h-12 px-4 rounded-xl border-gray-100 bg-gray-50 text-sm font-medium">
                            <option>Technical Volunteer</option>
                            <option>NGO Partnership</option>
                            <option>Investment Inquiry</option>
                            <option>Other</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                         <Textarea placeholder="Briefly describe your proposal..." className="min-h-[120px] rounded-xl border-gray-100 bg-gray-50 focus:bg-white p-4" />
                      </div>
                      <Button className="w-full h-14 rounded-xl text-lg font-black shadow-xl shadow-primary/20">
                         Submit Proposal <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                   </form>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;

export default Partners;
