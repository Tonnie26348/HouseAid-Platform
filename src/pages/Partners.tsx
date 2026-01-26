import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, GraduationCap, Handshake, Building, Heart, Users } from "lucide-react";

const Partners = () => {
  const opportunities = [
    {
      icon: Code,
      title: "Developers & Engineers",
      description: "Help us build the platform that's transforming domestic work in Kenya.",
      skills: ["React", "Node.js", "Mobile Development", "UI/UX Design"]
    },
    {
      icon: GraduationCap,
      title: "Trainers & Mentors",
      description: "Share your expertise to train and certify domestic workers in various skills.",
      skills: ["Childcare", "Cooking", "Professional Etiquette", "Life Skills"]
    },
    {
      icon: Building,
      title: "NGO & Corporate Partners",
      description: "Partner with us to expand our reach and impact across Kenya.",
      skills: ["CSR Programs", "Funding", "Distribution", "Community Outreach"]
    },
    {
      icon: Handshake,
      title: "Investors & Advisors",
      description: "Join us in scaling a social enterprise that makes a real difference.",
      skills: ["Strategic Guidance", "Funding", "Network Access", "Business Development"]
    }
  ];

  const benefits = [
    "Work on a mission-driven project with real social impact",
    "Flexible remote and part-time opportunities",
    "Be part of Kenya's growing tech-for-good ecosystem",
    "Build your portfolio with meaningful work",
    "Connect with like-minded professionals and social entrepreneurs"
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero */}
      <section className="pt-24 pb-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Join the HouseAid Movement</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Be part of a mission to transform domestic work in Kenya. 
            We're looking for passionate individuals and organizations to help us grow.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Join HouseAid?</h2>
              <p className="text-lg text-muted-foreground">
                More than a job or partnership – it's an opportunity to create lasting social impact
              </p>
            </div>
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Make a Real Difference</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                HouseAid is addressing a critical need in Kenya's informal economy. 
                By joining us, you'll directly contribute to:
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How You Can Contribute</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're looking for talented individuals and organizations in various roles
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-medium transition-shadow">
                  <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{opportunity.title}</h3>
                  <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-muted text-sm rounded-full border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Partnership Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're open to various types of partnerships
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Volunteer Programs</h3>
              <p className="text-muted-foreground">
                Contribute your time and skills on a flexible basis
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategic Partnerships</h3>
              <p className="text-muted-foreground">
                Long-term collaboration with NGOs and corporations
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Investment & Advisory</h3>
              <p className="text-muted-foreground">
                Help us scale with funding and strategic guidance
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Interested in joining us? Fill out the form below and we'll get back to you within 48 hours.
              </p>
            </div>
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input placeholder="+254 700 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">I'm interested in</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>Select an option</option>
                    <option>Volunteering (Developer/Engineer)</option>
                    <option>Volunteering (Trainer/Mentor)</option>
                    <option>NGO Partnership</option>
                    <option>Corporate Partnership</option>
                    <option>Investment Opportunity</option>
                    <option>Advisory Role</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tell us about yourself</label>
                  <Textarea 
                    placeholder="Share your background, skills, and why you want to join HouseAid..." 
                    rows={6}
                  />
                </div>
                <Button className="w-full gradient-primary text-primary-foreground" size="lg">
                  Submit Application
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Us in Creating Change</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Together, we can transform domestic work in Kenya and improve thousands of lives
          </p>
        </div>
      </section>
    </div>
  );
};

export default Partners;
