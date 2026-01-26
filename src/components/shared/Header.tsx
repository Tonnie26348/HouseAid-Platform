import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScroll } from "@/hooks/useScroll";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const Header = () => {
  const scrolled = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileMenuOpen
          ? "bg-white shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-xl">HouseAid</span>
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
            <Link to="/employers" className="text-gray-600 hover:text-gray-900">For Employers</Link>
            <Link to="/workers" className="text-gray-600 hover:text-gray-900">For Workers</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link to="/join">
              <Button>Join Now</Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
              <Link to="/employers" className="text-gray-600 hover:text-gray-900">For Employers</Link>
              <Link to="/workers" className="text-gray-600 hover:text-gray-900">For Workers</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/join">
                <Button className="w-full">Join Now</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
