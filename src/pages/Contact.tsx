import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      info: "info@houseaid.co.ke",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+254798121497",
      description: "Mon-Fri, 8am-6pm EAT"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Nairobi, Kenya",
      description: "Head office location"
    },
    {
      icon: Clock,
      title: "Support Hours",
      info: "8am - 6pm EAT",
      description: "Monday to Friday"
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero */}
      <section className="pt-24 pb-16 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-primary font-semibold mb-1">{method.info}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input placeholder="+254 700 000 000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                      <option>Select a subject</option>
                      <option>General Inquiry</option>
                      <option>Employer Support</option>
                      <option>Worker Support</option>
                      <option>Partnership Opportunity</option>
                      <option>Technical Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us how we can help..." 
                      rows={6}
                    />
                  </div>
                  <Button className="w-full gradient-primary text-primary-foreground" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Info & Map */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Find Us</h2>
              <Card className="p-8 mb-6">
                <h3 className="font-semibold text-xl mb-4">HouseAid Headquarters</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+254798121497</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@houseaid.co.ke</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 8am - 6pm EAT</p>
                      <p className="text-muted-foreground">Saturday: 9am - 2pm EAT</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                {/* Map Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-6 gradient-hero text-primary-foreground">
                <h3 className="font-semibold text-lg mb-2">Need Urgent Help?</h3>
                <p className="opacity-90 mb-4">
                  For urgent issues or emergencies, please call our support hotline
                </p>
                <Button variant="secondary" className="w-full">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Support Hotline
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Link */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Looking for Answers?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check out our frequently asked questions or contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              View FAQs
            </Button>
            <Button size="lg">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
