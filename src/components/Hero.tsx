
import React from 'react';
import { ArrowRight, Recycle, RefreshCw, Award } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <Container>
        <div className="relative">
          {/* Background elements */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in [animation-delay:0.2s] opacity-0">
                Responsible E-Waste Management
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-6 animate-fade-in [animation-delay:0.3s] opacity-0">
                Recycle your e-waste <span className="text-primary">the right way</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl animate-fade-in [animation-delay:0.4s] opacity-0">
                EcoRelay connects you with certified recycling centers, facilitates device donations, and helps you track your environmental impact.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:0.5s] opacity-0">
                <Button size="lg" className="group">
                  Start recycling
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in [animation-delay:0.6s] opacity-0">
                {[
                  { 
                    icon: <Recycle className="h-6 w-6 text-primary" />, 
                    title: 'Certified Recycling',
                    description: 'Properly processed by experts'
                  },
                  { 
                    icon: <RefreshCw className="h-6 w-6 text-primary" />, 
                    title: 'Device Reuse',
                    description: 'Give technology a second life'
                  },
                  { 
                    icon: <Award className="h-6 w-6 text-primary" />, 
                    title: 'Impact Tracking',
                    description: 'Measure your contribution'
                  }
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative elements */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/20 to-secondary/30 rounded-[2rem] blur-xl opacity-70 transform rotate-3"></div>
                
                {/* Main image */}
                <div className="glass-panel overflow-hidden p-2 rounded-[2rem] shadow-xl animate-scale-in">
                  <img 
                    src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1000&auto=format&fit=crop"
                    alt="E-waste recycling visualization" 
                    className="w-full h-auto rounded-[1.8rem] object-cover"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -bottom-6 -left-6 glass-panel p-3 rounded-lg shadow-lg animate-fade-in [animation-delay:0.7s] opacity-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                      <Recycle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">78,000+</div>
                      <div className="text-xs text-muted-foreground">Devices recycled</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 glass-panel p-3 rounded-lg shadow-lg animate-fade-in [animation-delay:0.8s] opacity-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">12,500+</div>
                      <div className="text-xs text-muted-foreground">Certified users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
