
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Map from '@/components/Map';
import EducationCard from '@/components/EducationCard';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const educationItems = [
    {
      title: 'The Environmental Impact of E-Waste',
      description: 'Learn about how improper e-waste disposal affects our environment and what you can do to help.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=3270&auto=format&fit=crop',
      category: 'Environment',
      readTime: '5 min read',
      type: 'article' as const
    },
    {
      title: 'How to Prepare Your Devices for Recycling',
      description: 'A step-by-step guide on how to properly prepare your electronics for recycling.',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=3201&auto=format&fit=crop',
      category: 'Guides',
      readTime: '3 min read',
      type: 'guide' as const
    },
    {
      title: 'Inside an E-Waste Recycling Facility',
      description: 'Take a virtual tour of a modern e-waste recycling facility and see how devices are processed.',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0dade?q=80&w=3270&auto=format&fit=crop',
      category: 'Behind the Scenes',
      readTime: '8 min watch',
      type: 'video' as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Map />
        
        {/* Education Section */}
        <section className="py-20">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-4">
                  Learn About E-Waste Management
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore our educational resources to understand the importance of proper e-waste disposal and recycling.
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-1">
                View all resources <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {educationItems.map((item, index) => (
                <EducationCard key={index} {...item} />
              ))}
            </div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary/5">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of environmentally conscious individuals and organizations committed to responsible e-waste management.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="min-w-[180px]">
                  Sign Up Now
                </Button>
                <Button variant="outline" size="lg" className="min-w-[180px]">
                  Schedule Pickup
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
