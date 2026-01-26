import { motion } from "framer-motion";
import { Users, Smile, Heart, LifeBuoy } from "lucide-react";
import Counter from "@/components/shared/Counter";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "Verified Workers",
    },
    {
      icon: Smile,
      value: 10000,
      suffix: "+",
      label: "Happy Households",
    },
    {
      icon: Heart,
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
    },
    {
      icon: LifeBuoy,
      value: 24,
      suffix: "/7",
      label: "Support Available",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <stat.icon className="w-12 h-12 mx-auto text-primary mb-4" />
              </motion.div>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                <Counter from={0} to={stat.value} />
                {stat.suffix}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
