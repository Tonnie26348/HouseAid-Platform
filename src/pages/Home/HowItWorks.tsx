import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Search & Browse", description: "Find verified workers based on your needs and location." },
    { number: "02", title: "Match & Verify", description: "Review profiles, ratings, and certifications to find the perfect match." },
    { number: "03", title: "Contract & Hire", description: "Create a digital contract with clear terms and conditions." },
    { number: "04", title: "Track & Pay", description: "Monitor attendance and make secure payments through the platform." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent process from search to hire
          </p>
        </motion.div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <motion.div
            className="grid md:grid-cols-4 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center bg-white p-6 rounded-lg"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

