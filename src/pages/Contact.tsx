import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      info: "hello@houseaid.co.ke",
      description: "Response within 2 hours",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+254 700 000 000",
      description: "Mon-Fri, 8am-6pm",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: MapPin,
      title: "Visit Office",
      info: "Kilimani, Nairobi",
      description: "Main HQ Office",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: Globe,
      title: "Global Inquiries",
      info: "partners@houseaid.com",
      description: "For international partners",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight">How can we <span className="text-primary">Help?</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Our world-class support team is dedicated to providing you with the 
              fastest, most reliable assistance in Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, i) => (
              <Card key={i} className="rounded-[2rem] border-none shadow-xl shadow-gray-200/50 p-8 text-center bg-white hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${method.bg} ${method.color} flex items-center justify-center mx-auto mb-6`}>
                  <method.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-primary font-bold mb-1">{method.info}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{method.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Area */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-10">
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Send a Message</h2>
                <p className="text-lg text-gray-500 font-medium">Fill out the form below and we'll be in touch shortly.</p>
              </div>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-gray-50 p-8 md:p-10">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                      <Input placeholder="John Doe" className="h-12 rounded-xl border-gray-200 bg-white focus:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl border-gray-200 bg-white focus:ring-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                    <Input placeholder="How can we help?" className="h-12 rounded-xl border-gray-200 bg-white focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                    <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px] rounded-xl border-gray-200 bg-white focus:ring-primary" />
                  </div>
                  <Button className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Locate Us</h2>
                <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden border border-gray-100">
                  <div className="p-8 space-y-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">Nairobi Headquarters</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">
                          12th Floor, Western Heights <br />
                          Karuna Road, Westlands, Nairobi
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">Working Hours</h4>
                        <p className="text-gray-500 font-medium">Monday — Friday: 08:00 - 18:00</p>
                        <p className="text-gray-500 font-medium">Saturday: 09:00 - 13:00</p>
                      </div>
                    </div>
                  </div>
                  {/* Visual Placeholder for Map */}
                  <div className="h-64 bg-gray-100 flex items-center justify-center relative group cursor-pointer">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700" />
                     <div className="relative z-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/50 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-bold text-gray-900 text-sm">Open in Google Maps</span>
                     </div>
                  </div>
                </Card>
              </div>

              <Card className="rounded-[2rem] border-none shadow-xl shadow-primary/5 bg-primary p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck className="w-20 h-20" />
                </div>
                <h3 className="text-2xl font-black mb-4 relative z-10">Trust & Safety</h3>
                <p className="text-primary-foreground/80 leading-relaxed font-medium mb-6 relative z-10">
                  For urgent safety concerns or to report an incident, please use our 
                  dedicated 24/7 emergency line.
                </p>
                <Button variant="secondary" className="w-full h-12 rounded-xl font-bold relative z-10">
                  Report an Incident
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

export default Contact;
