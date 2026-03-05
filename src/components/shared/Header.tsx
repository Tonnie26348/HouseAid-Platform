import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScroll } from "@/hooks/useScroll";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const scrolled = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "How it Works", path: "/how-it-works" },
    { name: "For Employers", path: "/employers" },
    { name: "For Workers", path: "/workers" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8 py-4",
        scrolled
          ? "top-2"
          : "top-0"
      )}
    >
      <div className={cn(
        "container mx-auto transition-all duration-500 rounded-2xl",
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-lg border border-white/20 py-2 px-6" 
          : "bg-transparent py-4 px-4"
      )}>
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Logo />
            </div>
            <span className="font-bold text-2xl tracking-tight text-primary">HouseAid</span>
          </Link>

          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  isActive(link.path) ? "text-primary" : "text-gray-600"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-primary/5">Login</Button>
            </Link>
            <Link to="/join">
              <Button className="shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden mt-4 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-gray-100"
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium p-2 rounded-lg transition-colors",
                      isActive(link.path) ? "bg-primary/10 text-primary" : "text-gray-600"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Join Now</Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
