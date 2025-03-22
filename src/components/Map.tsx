
import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    acceptedItems: ['Computers', 'Phones', 'Tablets', 'TVs', 'Printers']
  },
  {
    id: 2,
    name: 'Circular Electronics',
    address: '456 Recycle Ave, San Francisco, CA 94105',
    phone: '(415) 555-5678',
    hours: 'Mon-Sat: 9am-7pm',
    distance: '2.8 miles',
    certifications: ['R2'],
    acceptedItems: ['Computers', 'Phones', 'Batteries', 'Cables']
  },
  {
    id: 3,
    name: 'EcoSystems Recovery',
    address: '789 Sustainable Blvd, Oakland, CA 94612',
    phone: '(510) 555-9012',
    hours: 'Mon-Fri: 7am-8pm, Sat-Sun: 10am-4pm',
    distance: '5.4 miles',
    certifications: ['e-Stewards', 'ISO 14001'],
    acceptedItems: ['All Electronics', 'Batteries', 'Light Bulbs']
  }
];

export default function Map() {
  const [selectedCenter, setSelectedCenter] = useState(centers[0]);

  return (
    <section className="py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-6">
              Find Recycling Centers Near You
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Locate certified e-waste recycling facilities in your area. These centers properly handle electronic waste to minimize environmental impact.
            </p>

            <div className="space-y-4 mb-8">
              {centers.map((center) => (
                <div 
                  key={center.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedCenter.id === center.id
                      ? 'glass-panel shadow-md'
                      : 'hover:bg-secondary/50'
                  }`}
                  onClick={() => setSelectedCenter(center)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{center.name}</h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {center.address}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-primary">
                      <Navigation className="h-3 w-3 mr-1" /> {center.distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full justify-center">
              View All Recycling Centers
            </Button>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="relative bg-gray-200 h-[300px] animate-pulse">
              {/* This would be replaced with an actual map component */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Interactive Map (Placeholder)
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-display font-medium mb-4">{selectedCenter.name}</h3>
              
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
                
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium">Operating Hours</div>
                    <div className="text-muted-foreground">{selectedCenter.hours}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="font-medium mb-2">Accepted Items</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCenter.acceptedItems.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="font-medium mb-2">Certifications</div>
                <div className="flex flex-wrap gap-2">
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

              <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="flex gap-1">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
                <Button size="sm" className="flex gap-1">
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
