import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, MapPin, CreditCard, RefreshCw, CheckCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero-employers.jpg";

const Employers = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Verified & Background Checked",
      description: "Every worker undergoes thorough background checks, skills assessment, and reference verification."
    },
    {
      icon: MapPin,
      title: "GPS Tracking & Attendance",
      description: "Real-time location tracking and digital attendance logs for transparency and security."
    },
    {
      icon: CreditCard,
      title: "Secure Digital Payments",
      description: "Automated salary processing with payment history and digital receipts for your records."
    },
    {
      icon: RefreshCw,
      title: "Easy Replacement Guarantee",
      description: "If a worker doesn't work out, we'll help you find a replacement at no extra cost."
    },
    {
      icon: CheckCircle,
      title: "Legal Contracts",
      description: "Professionally drafted contracts that protect both parties and ensure clear expectations."
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Read reviews from other employers and share your own experiences to help the community."
    }
  ];

  const faqs = [
    {
      question: "How does the verification process work?",
      answer: "All workers undergo background checks, skills assessment, reference verification, and training before joining our platform. We verify their identity, check their work history, and ensure they meet our quality standards."
    },
    {
      question: "What if I'm not satisfied with a worker?",
      answer: "We offer a 30-day replacement guarantee. If you're not satisfied with your worker within the first month, we'll help you find a replacement at no additional cost. We also provide ongoing support to resolve any issues."
    },
    {
      question: "How much does HouseAid cost?",
      answer: "We charge a small monthly platform fee for access to verified workers, GPS tracking, and payment processing. The worker's salary is negotiated between you and the worker, with guidelines for fair wages provided by our platform."
    },
    {
      question: "How does GPS tracking work?",
      answer: "Workers use our mobile app to clock in and out. The app records their location when they arrive and leave, providing you with a transparent attendance log. This feature respects privacy while ensuring accountability."
    },
    {
      question: "Are the contracts legally binding?",
      answer: "Yes, all contracts are drafted by legal professionals and comply with Kenyan employment law. They clearly outline job duties, working hours, salary, benefits, and termination conditions to protect both parties."
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Verified, Trustworthy Domestic Workers
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with professional domestic workers who have been background-checked, trained, and certified. 
                GPS tracking, digital contracts, and secure payments for peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="gradient-primary text-primary-foreground w-full sm:w-auto">
                    Register as Employer
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Happy family using HouseAid app" 
                className="rounded-2xl shadow-medium w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Employers Choose HouseAid</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional features designed to make hiring and managing domestic workers simple and secure
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Demo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Features You'll Love</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">GPS Tracking & Digital Attendance</h3>
              <p className="text-muted-foreground mb-6">
                Know exactly when your worker arrives and leaves. Our GPS tracking system provides 
                real-time updates and maintains a complete attendance history for your records.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>Real-time arrival and departure notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>Complete attendance history and reports</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>Privacy-respecting location tracking</span>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-muted">
              <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-24 w-24 text-primary-foreground opacity-50" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Pay workers fairly and directly. HouseAid charges a small platform fee for verification, 
              tracking, and payment processing services.
            </p>
            <Card className="p-8">
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  <span className="gradient-primary bg-clip-text text-transparent">Coming Soon</span>
                </div>
                <p className="text-muted-foreground">
                  Flexible pricing plans for families of all sizes
                </p>
              </div>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>Verified worker profiles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>GPS tracking and attendance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span>Legal contracts and support</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
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

      {/* CTA */}
      <section className="py-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Find Your Perfect Worker?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of families who trust HouseAid for verified, professional domestic workers
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Employers;