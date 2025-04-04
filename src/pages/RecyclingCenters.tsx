
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Filter, Search, Navigation, Phone, Clock, CheckCircle, Award } from 'lucide-react';

// Mock data for recycling centers
const centers = [
  {
    id: 1,
    name: 'GreenTech Recycling Center',
    address: '123 Eco Street, San Francisco, CA 94103',
    phone: '(415) 555-1234',
    hours: 'Mon-Fri: 8am-6pm, Sat: 9am-4pm',
    distance: '1.2 miles',
    certifications: ['e-Stewards', 'R2'],
    acceptedItems: ['Computers', 'Phones', 'Tablets', 'TVs', 'Printers'],
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: 'Circular Electronics',
    address: '456 Recycle Ave, San Francisco, CA 94105',
    phone: '(415) 555-5678',
    hours: 'Mon-Sat: 9am-7pm',
    distance: '2.8 miles',
    certifications: ['R2'],
    acceptedItems: ['Computers', 'Phones', 'Batteries', 'Cables'],
    rating: 4.5,
    reviews: 78
  },
  {
    id: 3,
    name: 'EcoSystems Recovery',
    address: '789 Sustainable Blvd, Oakland, CA 94612',
    phone: '(510) 555-9012',
    hours: 'Mon-Fri: 7am-8pm, Sat-Sun: 10am-4pm',
    distance: '5.4 miles',
    certifications: ['e-Stewards', 'ISO 14001'],
    acceptedItems: ['All Electronics', 'Batteries', 'Light Bulbs'],
    rating: 4.9,
    reviews: 210
  },
  {
    id: 4,
    name: 'Bay Area Electronics Recycling',
    address: '321 Green Ave, Berkeley, CA 94710',
    phone: '(510) 555-3456',
    hours: 'Mon-Fri: 9am-5pm',
    distance: '7.1 miles',
    certifications: ['ISO 14001'],
    acceptedItems: ['Computers', 'Monitors', 'Printers', 'Small Appliances'],
    rating: 4.3,
    reviews: 42
  },
  {
    id: 5,
    name: 'Sustainable Solutions Inc',
    address: '555 Recycler Lane, San Jose, CA 95112',
    phone: '(408) 555-7890',
    hours: 'Mon-Sat: 10am-8pm',
    distance: '12.8 miles',
    certifications: ['e-Stewards', 'R2', 'ISO 14001'],
    acceptedItems: ['All Electronics', 'Batteries', 'Light Bulbs', 'Appliances'],
    rating: 4.7,
    reviews: 186
  }
];

export default function RecyclingCenters() {
  const [selectedCenter, setSelectedCenter] = useState(centers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCenters = centers.filter(center => 
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="mb-10">
            <h1 className="text-4xl font-display font-semibold mb-4">
              Find Recycling Centers
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Locate certified e-waste recycling facilities in your area. These centers properly handle electronic waste to minimize environmental impact.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5">
              <div className="glass-panel rounded-2xl p-6 mb-6">
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by name or location" 
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground mb-2">
                  {filteredCenters.length} centers found
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredCenters.map((center) => (
                    <div 
                      key={center.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedCenter.id === center.id
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => setSelectedCenter(center)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{center.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-amber-500">★</span> {center.rating}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /> 
                        <span>{center.address}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-primary font-medium">
                          <Navigation className="h-3 w-3" /> {center.distance}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {center.certifications.slice(0, 2).map((cert, i) => (
                            <span 
                              key={i}
                              className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                            >
                              {cert}
                            </span>
                          ))}
                          {center.certifications.length > 2 && (
                            <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                              +{center.certifications.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="glass-panel rounded-2xl overflow-hidden h-full">
                <div className="relative bg-gray-200 h-[300px] animate-pulse">
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Interactive Map (Placeholder)
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-display font-medium">{selectedCenter.name}</h2>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>★</span>
                      <span>{selectedCenter.rating}</span>
                      <span className="text-muted-foreground text-sm">({selectedCenter.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-medium">Address</div>
                          <div className="text-muted-foreground">{selectedCenter.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-muted-foreground">{selectedCenter.phone}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-medium">Operating Hours</div>
                          <div className="text-muted-foreground">{selectedCenter.hours}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Award className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-medium">Certifications</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedCenter.certifications.map((cert, index) => (
                              <span 
                                key={index}
                                className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Accepted Items</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCenter.acceptedItems.map((item, index) => (
                        <div 
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                        >
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button className="flex items-center gap-2">
                      Schedule Pickup
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
