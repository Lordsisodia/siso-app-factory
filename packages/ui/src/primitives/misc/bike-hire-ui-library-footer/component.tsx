import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export interface QuickLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  quickLinks?: QuickLink[];
  contactInfo?: ContactInfo;
  socialLinks?: SocialLinks;
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'Brand',
  brandDescription = 'Your trusted service provider',
  quickLinks = [],
  contactInfo,
  socialLinks,
  showNewsletter = true,
  onNewsletterSubmit,
  className
}) => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNewsletterSubmit && newsletterEmail) {
      onNewsletterSubmit(newsletterEmail);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className={`bg-primary text-primary-foreground pt-16 pb-8 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Information */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center mb-6">
              {brandName}
            </Link>
            <p className="text-primary-foreground/80 mb-6">
              {brandDescription}
            </p>
            {socialLinks && (
              <div className="flex space-x-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="text-primary-foreground/80 hover:text-accent transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="text-primary-foreground/80 hover:text-accent transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    className="text-primary-foreground/80 hover:text-accent transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          {contactInfo && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                {contactInfo.address && (
                  <li className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/80">{contactInfo.address}</span>
                  </li>
                )}
                {contactInfo.phone && (
                  <li className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-accent" />
                    <span className="text-primary-foreground/80">{contactInfo.phone}</span>
                  </li>
                )}
                {contactInfo.email && (
                  <li className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-accent" />
                    <span className="text-primary-foreground/80">{contactInfo.email}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Newsletter */}
          {showNewsletter && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
              <p className="text-primary-foreground/80 mb-4">
                Subscribe for exclusive offers and updates.
              </p>
              <form className="flex flex-col space-y-3" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
