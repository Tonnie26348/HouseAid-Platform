import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Users, TrendingUp, Award, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Dignity & Respect",
      description: "We believe every domestic professional deserves fair wages and professional treatment.",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: ShieldCheck,
      title: "Unwavering Trust",
      description: "Safety is our DNA. Our verification process is the most rigorous in the industry.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We use technology to simplify complex hiring and management processes.",
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      icon: Globe,
      title: "Community Impact",
      description: "We're not just a platform; we're building a sustainable ecosystem for Kenyan homes.",
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ];

  const stats = [
    { number: "2,000+", label: "Verified Workers", color: "text-primary" },
    { number: "5,000+", label: "Happy Households", color: "text-secondary" },
    { number: "KSh 15M+", label: "Processed Monthly", color: "text-green-600" },
    { number: "98%", label: "Placement Success", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-primary/10 text-primary border-none mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Our Mission</Badge>
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-tight text-gray-900">
              Revolutionizing <span className="text-primary">Domestic Work</span> <br /> 
              Across East Africa.
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
              We're bridging the gap between professional domestic talent and modern Kenyan 
              households through transparency, dignity, and world-class technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="rounded-3xl border-none shadow-xl shadow-gray-200/50 p-8 text-center bg-white">
                <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.number}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Split Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Built for Quality, <br />
                <span className="text-primary">Driven by Purpose.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                      To professionalize domestic work in Kenya by connecting verified workers with families 
                      through technology, while ensuring fair wages and career growth.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Our Vision</h3>
                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                      A future where domestic work is recognized as a professional career with 
                      unwavering dignity, respect, and fair compensation for all.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 scale-105" />
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80" 
                className="relative z-10 rounded-[3rem] shadow-2xl h-[500px] w-full object-cover" 
                alt="HouseAid Team"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">The Principles That Guide Us</h2>
            <p className="text-xl text-gray-500 font-medium">We're building more than just an app; we're creating a community of trust.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <Card key={i} className="rounded-[2rem] border-none shadow-sm p-8 bg-white hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-6`}>
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-4">{val.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{val.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* World-Class CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
             <div className="relative z-10">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Join the Movement Today.</h2>
               <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
                 Whether you're looking for help or looking for work, HouseAid is here to 
                 support your journey.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild size="lg" className="h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                   <Link to="/join">Get Started Now</Link>
                 </Button>
                 <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-2xl text-lg font-bold bg-white/5 border-white/10 text-white hover:bg-white/10">
                   <Link to="/contact">Contact Support</Link>
                 </Button>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;