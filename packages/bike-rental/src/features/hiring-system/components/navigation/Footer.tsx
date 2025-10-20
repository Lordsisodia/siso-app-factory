
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Information */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center mb-6">
              <span className="mr-1">FIVE STAR</span>
              <span className="text-accent font-light">RIDES</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6">
              Experience luxury on wheels with our premium car rental service. Choose from our exclusive collection of high-performance vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-all-medium">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Luxury Drive, Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">info@fivestarsrides.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-all-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Five Star Rides. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
