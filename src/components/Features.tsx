
import React from 'react';
import { Container } from '@/components/ui/container';
import { Calendar, MapPin, Gift, ScrollText, Award, Users } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: 'Easy Scheduling',
    description: 'Schedule convenient e-waste pickups from your home or office with just a few clicks.'
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: 'Find Recycling Centers',
    description: 'Locate certified e-waste recycling centers near you using our interactive map.'
  },
  {
    icon: <Gift className="h-6 w-6 text-primary" />,
    title: 'Donate Devices',
    description: 'Give your functional devices a second life by donating them to schools and non-profits.'
  },
  {
    icon: <ScrollText className="h-6 w-6 text-primary" />,
    title: 'Educational Resources',
    description: 'Access articles, videos, and guides about responsible e-waste management.'
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: 'Impact Certificates',
    description: 'Earn digital certificates that showcase your environmental contributions.'
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Community Forum',
    description: 'Connect with like-minded individuals to discuss sustainability practices.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-secondary/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-4">
            Comprehensive E-Waste Management
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform offers a complete solution for responsible electronics disposal, reuse, and recycling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-panel p-6 rounded-2xl hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
