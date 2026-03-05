import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">HouseAid</h2>
            <p className="text-gray-400 leading-relaxed font-medium">
              Revolutionizing domestic work in Kenya through transparency, 
              safety, and world-class technology.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Platform</h3>
            <ul className="space-y-4 font-medium">
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link to="/employers" className="hover:text-primary transition-colors">For Employers</Link></li>
              <li><Link to="/workers" className="hover:text-primary transition-colors">For Workers</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Get in Touch</h3>
            <ul className="space-y-4 font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@houseaid.co.ke</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4 font-medium">Join 5,000+ others receiving our updates.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-white/5 border-white/10 rounded-xl focus:ring-primary h-12" 
              />
              <Button size="icon" className="h-12 w-12 rounded-xl flex-shrink-0">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
          <p>&copy; {new Date().getFullYear()} HouseAid Kenya. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export default Footer;
