import { Card } from "@/components/ui/card";
import { Shield, FileText, MapPin, Smartphone, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Every professional on HouseAid undergoes a rigorous background check and identity verification.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "Legal Protection",
      description: "Our digital contracts are legally binding, protecting both households and domestic workers.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Smartphone,
      title: "Instant Payments",
      description: "Direct M-Pesa integration ensures safe, transparent, and immediate salary processing.",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Award,
      title: "Certified Skills",
      description: "We partner with top institutions to certify domestic skills from culinary to elderly care.",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: MapPin,
      title: "Local Excellence",
      description: "Find the best talent in your neighborhood, from Kilimani to Nyali and beyond.",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Empowering workers with financial history and professional reviews to build their future.",
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold mb-4"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>The HouseAid Advantage</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-gray-900">
            Why the best homes <br /> 
            <span className="text-primary">Choose HouseAid</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            We've combined Kenyan hospitality with world-class technology to create 
            a platform that prioritizes safety, dignity, and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group p-8 h-full border-none bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2.5rem]">
                  <div className={cn("inline-flex p-4 rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", feature.bg, feature.color)}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

export default Features;

