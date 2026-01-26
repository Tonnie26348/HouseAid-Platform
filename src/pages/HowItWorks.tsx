import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, UserCheck, FileSignature, CreditCard, BarChart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Step 1: Search & Browse",
      description: "Explore our database of verified domestic workers",
      details: [
        "Filter by location, skills, experience, and availability",
        "View detailed profiles with photos, certifications, and ratings",
        "Read reviews from other employers",
        "Check real-time availability and schedule"
      ]
    },
    {
      icon: UserCheck,
      title: "Step 2: Match & Verify",
      description: "Find your perfect match with confidence",
      details: [
        "Review background check results and certifications",
        "See complete work history and references",
        "Schedule video or in-person interviews",
        "Request additional verification if needed"
      ]
    },
    {
      icon: FileSignature,
      title: "Step 3: Digital Contract",
      description: "Sign a legal contract protecting both parties",
      details: [
        "Choose from standard contract templates",
        "Customize terms, salary, and working conditions",
        "Both parties review and sign digitally",
        "Contract stored securely in the platform"
      ]
    },
    {
      icon: CreditCard,
      title: "Step 4: Payments & Tracking",
      description: "Manage attendance and process payments seamlessly",
      details: [
        "Worker clocks in/out using GPS-enabled mobile app",
        "Track attendance in real-time with location verification",
        "Automated salary calculation based on hours worked",
        "Secure digital payments with transaction history"
      ]
    },
    {
      icon: BarChart,
      title: "Step 5: Monthly Reports",
      description: "Stay informed with detailed performance reports",
      details: [
        "Attendance summaries and punctuality reports",
        "Payment history and salary breakdowns",
        "Performance ratings and feedback",
        "Renewal reminders and contract management"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long does the verification process take?",
      answer: "The verification process typically takes 3-5 business days. This includes background checks, reference verification, and skills assessment. We prioritize thorough vetting to ensure quality and safety."
    },
    {
      question: "Can I hire a worker on a trial basis?",
      answer: "Yes! We offer a 30-day trial period for all new hires. During this time, both employers and workers can evaluate the fit. If it doesn't work out, we'll help you find a replacement at no additional cost."
    },
    {
      question: "What if there's a dispute between me and the worker?",
      answer: "HouseAid provides mediation services for any disputes. Our support team is available to help resolve issues fairly. All contracts include clear dispute resolution procedures."
    },
    {
      question: "How does the GPS tracking respect worker privacy?",
      answer: "GPS tracking is only active during work hours when the worker clocks in. Location is recorded at arrival and departure times only, not continuously tracked throughout the day. Workers have full transparency and control over when tracking is active."
    },
    {
      question: "Can I have multiple workers on the same account?",
      answer: "Yes, employers can manage multiple workers through a single account. Each worker has their own contract, attendance tracking, and payment schedule."
    },
    {
      question: "What happens if a worker is sick or needs time off?",
      answer: "Workers can request time off through the app, which requires employer approval. The platform helps manage leave requests, sick days, and vacation time according to your contract terms."
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero */}
      <section className="pt-24 pb-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">How HouseAid Works</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            A simple, transparent process from search to hire. 
            We've made it easy to find, hire, and manage domestic workers professionally.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mr-4">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{step.title}</h2>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-3 mt-6">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Card className={`p-8 bg-muted ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="h-32 w-32 text-primary-foreground opacity-50" />
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Diagram */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">The Complete Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From finding the right worker to ongoing management, we support you every step of the way
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center flex-1">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold mb-2">0{index + 1}</div>
                  <h3 className="font-semibold mb-2">{step.title.replace(/Step \d+: /, '')}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about the HouseAid process
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
