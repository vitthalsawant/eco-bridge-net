
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 pt-16 pb-8">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-foreground text-2xl font-display font-semibold flex items-center gap-2 mb-4">
              <span className="text-primary text-2xl">Eco</span>Relay
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Connecting individuals, organizations, and recyclers 
              to promote responsible e-waste management and environmental sustainability.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="h-4 w-4" />, href: "#" },
                { icon: <Facebook className="h-4 w-4" />, href: "#" },
                { icon: <Instagram className="h-4 w-4" />, href: "#" },
                { icon: <Linkedin className="h-4 w-4" />, href: "#" },
                { icon: <Youtube className="h-4 w-4" />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="h-8 w-8 rounded-full bg-background flex items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Recycling Centers', href: '/recycling-centers' },
                { name: 'Education', href: '/education' },
                { name: 'Community', href: '/community' },
                { name: 'Contact', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { name: 'Schedule Pickup', href: '/services/pickup' },
                { name: 'Donate Devices', href: '/services/donate' },
                { name: 'Track E-Waste', href: '/services/track' },
                { name: 'Business Solutions', href: '/services/business' },
                { name: 'Certification', href: '/services/certification' },
                { name: 'Educational Programs', href: '/services/education' },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-medium text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates on e-waste management.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email address" 
                className="bg-background focus-visible:ring-primary" 
              />
              <Button size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-sm text-muted-foreground">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              © {currentYear} EcoRelay. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 sm:justify-end">
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
