import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Shield, TrendingUp, CreditCard, FileText, Award, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-workers.jpg";

const Workers = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Professional Training",
      description: "Free training programs in childcare, cooking, cleaning, and professional etiquette."
    },
    {
      icon: Award,
      title: "Certification & Verification",
      description: "Earn recognized certifications that increase your value and job opportunities."
    },
    {
      icon: FileText,
      title: "Legal Contracts",
      description: "Work with formal contracts that protect your rights and ensure fair treatment."
    },
    {
      icon: CreditCard,
      title: "Guaranteed Payments",
      description: "Secure, on-time digital payments with complete transaction history."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Build a professional profile, earn ratings, and advance your career."
    },
    {
      icon: Shield,
      title: "Job Security",
      description: "Work with verified employers and have support when you need it."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Apply Online",
      description: "Fill out a simple application form with your details and work experience."
    },
    {
      number: "02",
      title: "Background Verification",
      description: "We verify your identity, references, and conduct a background check."
    },
    {
      number: "03",
      title: "Free Training",
      description: "Attend our training programs to learn new skills and earn certifications."
    },
    {
      number: "04",
      title: "Get Matched",
      description: "We connect you with families looking for workers with your skills."
    },
    {
      number: "05",
      title: "Start Working",
      description: "Sign a formal contract and start your new professional career."
    }
  ];

  const testimonials = [
    {
      name: "Mary Njeri",
      role: "Childcare Specialist",
      quote: "HouseAid's training program taught me professional childcare skills. I now earn 50% more and have a formal contract with benefits!"
    },
    {
      name: "Grace Akinyi",
      role: "Domestic Worker",
      quote: "Before HouseAid, I struggled with unfair wages and no job security. Now I have a stable income, health insurance, and respect."
    },
    {
      name: "Mercy Wambui",
      role: "House Manager",
      quote: "The certification I earned through HouseAid opened doors to better job opportunities. I'm now a professional house manager earning a good salary."
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
                Build a Professional Career in Domestic Work
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get free training, earn certifications, work with verified employers, 
                and receive fair wages with formal contracts. Your professional journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="gradient-primary text-primary-foreground w-full sm:w-auto">
                    Apply as Worker
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Workers in training session" 
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Workers Choose HouseAid</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to empowering domestic workers with the tools and support for professional careers
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

      {/* Joining Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How to Join HouseAid</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, step-by-step process to start your professional career
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Certification */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Free Training & Certification Programs
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our comprehensive training programs prepare you for professional domestic work 
                and help you earn certifications that employers value.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Childcare & Early Education</h4>
                    <p className="text-sm text-muted-foreground">Learn professional childcare techniques and child development basics</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Cooking & Nutrition</h4>
                    <p className="text-sm text-muted-foreground">Master meal planning, food safety, and nutrition for families</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Professional Housekeeping</h4>
                    <p className="text-sm text-muted-foreground">Learn efficient cleaning methods and home organization</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Professional Etiquette & Communication</h4>
                    <p className="text-sm text-muted-foreground">Develop professional communication and workplace skills</p>
                  </div>
                </li>
              </ul>
            </div>
            <Card className="p-8 bg-card">
              <div className="aspect-square bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="h-32 w-32 text-primary-foreground opacity-50" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Earn Your Certificate</h3>
                <p className="text-muted-foreground">
                  Complete training programs and earn recognized certifications that boost your career
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from workers who transformed their careers with HouseAid
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 gradient-primary rounded-full mb-4" />
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Professional Career?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of workers building successful careers in domestic work with fair wages and respect
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Workers;
