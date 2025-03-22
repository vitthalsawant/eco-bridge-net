
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Recycling Centers', path: '/recycling-centers' },
  { name: 'Education', path: '/education' },
  { 
    name: 'Services', 
    path: '#',
    dropdown: [
      { name: 'Schedule Pickup', path: '/services/pickup' },
      { name: 'Donate Devices', path: '/services/donate' },
      { name: 'Track E-Waste', path: '/services/track' }
    ]
  },
  { name: 'Community', path: '/community' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 ease-in-out",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-foreground text-xl font-display font-semibold flex items-center gap-2"
          >
            <span className="text-primary text-2xl">Eco</span>Relay
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary",
                          activeDropdown === link.name ? "text-primary" : "text-foreground/80"
                        )}
                      >
                        {link.name}
                        <ChevronDown size={16} className="ml-1" />
                      </button>
                      
                      {activeDropdown === link.name && (
                        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg glass-panel origin-top-left animate-fade-in">
                          <div className="py-1">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary/50 hover:text-foreground transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary",
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-foreground/80"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center ml-6 space-x-3">
              <Button variant="outline" size="sm" className="h-9">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in
              </Button>
              <Button size="sm" className="h-9">
                <User className="h-4 w-4 mr-2" />
                Sign up
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3 animate-fade-in">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-secondary"
                      >
                        {link.name}
                        <ChevronDown size={16} />
                      </button>
                      
                      {activeDropdown === link.name && (
                        <div className="pl-4 space-y-1 mt-1 animate-fade-in">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="block px-3 py-2 rounded-md text-sm text-foreground/80 hover:bg-secondary"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-foreground/80 hover:bg-secondary"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-3 px-3">
              <Button variant="outline" className="justify-center">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in
              </Button>
              <Button className="justify-center">
                <User className="h-4 w-4 mr-2" />
                Sign up
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
