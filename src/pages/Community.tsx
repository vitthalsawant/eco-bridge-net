
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, CalendarCheck, CheckCircle2, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  isFree: boolean;
  isJoined: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: "Mumbai E-Waste Collection Drive",
    description: "Join us for a city-wide e-waste collection drive. Bring your old electronics for proper recycling and learn about sustainable disposal practices.",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0dade?q=80&w=3270&auto=format&fit=crop",
    date: "2025-05-15T10:00:00",
    location: "Andheri Sports Complex, Mumbai",
    attendees: 156,
    category: "Collection Drive",
    isFree: true,
    isJoined: false
  },
  {
    id: 2,
    title: "E-Waste Awareness Workshop",
    description: "An educational workshop about the environmental impact of electronic waste and how to properly manage it at home and in the workplace.",
    image: "https://images.unsplash.com/photo-1540317700647-ec69694d70d0?q=80&w=2940&auto=format&fit=crop",
    date: "2025-05-22T14:00:00",
    location: "Bandra Community Center, Mumbai",
    attendees: 78,
    category: "Workshop",
    isFree: true,
    isJoined: false
  },
  {
    id: 3,
    title: "Tech Repair Café",
    description: "Bring your broken electronics and learn how to repair them with the help of our volunteer technicians. Extend the life of your devices!",
    image: "https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?q=80&w=2787&auto=format&fit=crop",
    date: "2025-06-05T11:00:00",
    location: "Powai Innovation Hub, Mumbai",
    attendees: 42,
    category: "Workshop",
    isFree: true,
    isJoined: false
  },
  {
    id: 4,
    title: "Corporate E-Waste Management Seminar",
    description: "A seminar for businesses on implementing effective e-waste management strategies and complying with regulations in Maharashtra.",
    image: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=2940&auto=format&fit=crop",
    date: "2025-06-12T09:00:00",
    location: "Nariman Point Business Center, Mumbai",
    attendees: 95,
    category: "Seminar",
    isFree: false,
    isJoined: false
  },
  {
    id: 5,
    title: "E-Waste Art Installation",
    description: "View creative art installations made from e-waste to raise awareness about electronic waste. Local artists showcase their work.",
    image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=2873&auto=format&fit=crop",
    date: "2025-06-18T12:00:00",
    location: "Kala Ghoda Arts District, Mumbai",
    attendees: 210,
    category: "Exhibition",
    isFree: true,
    isJoined: false
  },
  {
    id: 6,
    title: "School E-Waste Education Program",
    description: "A program designed to educate school children about e-waste and its environmental impact through interactive activities.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2874&auto=format&fit=crop",
    date: "2025-07-08T09:00:00",
    location: "Multiple Schools, Mumbai Region",
    attendees: 380,
    category: "Education",
    isFree: true,
    isJoined: false
  }
];

const categories = ["All", "Collection Drive", "Workshop", "Seminar", "Exhibition", "Education"];

export default function Community() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [upcomingOnly, setUpcomingOnly] = useState(true);
  
  const toggleEventJoin = async (eventId: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login required",
          description: "You need to log in to join events",
          variant: "destructive",
        });
        return;
      }
      
      // Check if already joined
      const isAlreadyJoined = myEvents.some(e => e.id === eventId);
      
      if (isAlreadyJoined) {
        // Remove from joined events
        setMyEvents(prev => prev.filter(e => e.id !== eventId));
        
        // Save to user's data
        await supabase
          .from('user_events')
          .delete()
          .match({ user_id: session.user.id, event_id: eventId });
          
        toast({
          title: "Event left",
          description: "You are no longer attending this event",
        });
      } else {
        // Add to joined events
        const eventToJoin = events.find(e => e.id === eventId);
        if (eventToJoin) {
          setMyEvents(prev => [...prev, { ...eventToJoin, isJoined: true }]);
          
          // Save to user's data
          await supabase
            .from('user_events')
            .insert({
              user_id: session.user.id,
              event_id: eventId,
              event_title: eventToJoin.title,
              event_date: eventToJoin.date
            });
            
          toast({
            title: "Event joined!",
            description: "You've successfully joined this event",
          });
        }
      }
    } catch (error: any) {
      console.error("Error joining event:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const filteredEvents = events.filter(event => {
    // Filter by category
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    
    // Filter by upcoming only
    const isUpcoming = upcomingOnly ? new Date(event.date) > new Date() : true;
    
    return matchesCategory && isUpcoming;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="mb-10">
            <h1 className="text-4xl font-display font-semibold mb-4">
              Community Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Join our e-waste awareness campaigns and events in Mumbai. Connect with others who are passionate about sustainable e-waste management.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-3/4">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
                <div className="flex gap-3 items-center flex-wrap">
                  <span className="text-sm font-medium">Filter by:</span>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 ${upcomingOnly ? 'bg-secondary/50' : ''}`}
                    onClick={() => setUpcomingOnly(!upcomingOnly)}
                  >
                    {upcomingOnly ? <CheckCircle2 className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                    <span>Upcoming only</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => {
                  const isJoined = myEvents.some(e => e.id === event.id);
                  const eventDate = parseISO(event.date);
                  
                  return (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            {event.category}
                          </Badge>
                          {event.isFree && (
                            <Badge className="bg-green-500/90">Free</Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          {format(eventDate, "EEEE, MMMM d, yyyy")} at {format(eventDate, "h:mm a")}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="mb-4 text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{event.attendees} attending</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={isJoined ? "secondary" : "default"}
                          onClick={() => toggleEventJoin(event.id)}
                        >
                          {isJoined ? (
                            <>
                              <CalendarCheck className="mr-2 h-4 w-4" />
                              You're attending
                            </>
                          ) : (
                            "Join Event"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
                
                {filteredEvents.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-muted/30 rounded-lg">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No events found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try changing your filters or check back later for new events.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Events</CardTitle>
                  <CardDescription>Events you're attending</CardDescription>
                </CardHeader>
                <CardContent>
                  {myEvents.length > 0 ? (
                    <div className="space-y-4">
                      {myEvents.map(event => (
                        <div key={event.id} className="border-b pb-3 last:border-0">
                          <h4 className="font-medium mb-1">{event.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3" />
                            {format(parseISO(event.date), "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        You haven't joined any events yet
                      </p>
                    </div>
                  )}
                </CardContent>
                
                {myEvents.length > 0 && (
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View all my events
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Organize an Event</CardTitle>
                  <CardDescription>Create your own e-waste campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Have an idea for an e-waste awareness event? Submit your proposal and we'll help you organize it.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Create Event</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
