
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { communityEvents } from '@/data/education-data';
import { toast } from "sonner";

export default function Community() {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  const handleRegisterEvent = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      toast.error('You are already registered for this event');
      return;
    }
    
    setRegisteredEvents([...registeredEvents, eventId]);
    toast.success('Successfully registered for the event!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="mb-10">
            <h1 className="text-4xl font-display font-semibold mb-4">
              E-Waste Community Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Join collection drives, educational workshops, and social events focused on responsible e-waste management in the Mumbai region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                    {event.category}
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} / {event.capacity} registered</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    onClick={() => handleRegisterEvent(event.id)} 
                    disabled={registeredEvents.includes(event.id)}
                  >
                    {registeredEvents.includes(event.id) ? 'Registered' : 'Register'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    Details <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 glass-panel rounded-2xl">
            <h2 className="text-2xl font-display font-semibold mb-4">
              Start Your Own E-Waste Initiative
            </h2>
            <p className="text-muted-foreground mb-6">
              Want to organize your own e-waste collection drive or awareness event? We can help you get started.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>Create Event</Button>
              <Button variant="outline">Contact Organizers</Button>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
