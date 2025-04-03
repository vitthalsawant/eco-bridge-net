
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Film, BookOpen, Search, Disc } from 'lucide-react';
import EducationCard from '@/components/EducationCard';
import { Input } from '@/components/ui/input';

// Define a type for our education item to ensure type safety
type EducationItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  type: 'article' | 'video' | 'guide' | 'cd-guide';
};

// Mock data for educational content with proper typing
const educationItems: EducationItem[] = [
  {
    id: 1,
    title: 'The Environmental Impact of E-Waste in India',
    description: 'Learn about how improper e-waste disposal affects India\'s environment and what citizens can do to help.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=3270&auto=format&fit=crop',
    category: 'Environment',
    readTime: '5 min read',
    type: 'article'
  },
  {
    id: 2,
    title: 'How to Prepare Your Devices for Recycling',
    description: 'A step-by-step guide on how to properly prepare your electronics for recycling in Mumbai.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=3201&auto=format&fit=crop',
    category: 'Guides',
    readTime: '3 min read',
    type: 'guide'
  },
  {
    id: 3,
    title: 'Inside an E-Waste Recycling Facility in Mumbai',
    description: 'Take a virtual tour of a modern e-waste recycling facility in Mumbai and see how devices are processed.',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0dade?q=80&w=3270&auto=format&fit=crop',
    category: 'Behind the Scenes',
    readTime: '8 min watch',
    type: 'video'
  },
  {
    id: 4,
    title: 'Rare Earth Metals in Electronics',
    description: 'Discover how recovering rare earth metals from e-waste can reduce environmental damage from mining.',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777540?q=80&w=2942&auto=format&fit=crop',
    category: 'Environment',
    readTime: '7 min read',
    type: 'article'
  },
  {
    id: 5,
    title: 'E-Waste Management Laws in Maharashtra',
    description: 'Compare different e-waste legislation and policies from Maharashtra state focusing on Mumbai region.',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=2932&auto=format&fit=crop',
    category: 'Policy',
    readTime: '10 min read',
    type: 'article'
  },
  {
    id: 6,
    title: 'How to Repair Common Electronic Issues',
    description: 'Learn basic repair techniques that can extend the life of your devices and reduce e-waste.',
    image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2940&auto=format&fit=crop',
    category: 'DIY',
    readTime: '12 min watch',
    type: 'video'
  },
  {
    id: 7,
    title: 'Data Security When Recycling Devices',
    description: 'Protect your personal information with these essential steps before recycling your electronics.',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2729&auto=format&fit=crop',
    category: 'Security',
    readTime: '4 min read',
    type: 'guide'
  },
  {
    id: 8,
    title: 'Children\'s Guide to E-Waste Recycling',
    description: 'A fun and educational resource to teach kids about the importance of properly recycling electronics.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2922&auto=format&fit=crop',
    category: 'Education',
    readTime: '5 min read',
    type: 'guide'
  },
  {
    id: 9,
    title: 'Corporate E-Waste Management Strategies',
    description: 'Case studies of businesses in Mumbai implementing successful e-waste management programs.',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2940&auto=format&fit=crop',
    category: 'Business',
    readTime: '9 min read',
    type: 'article'
  },
  {
    id: 10,
    title: 'CD Guide: Recycling Old CDs and DVDs',
    description: 'Learn how to properly recycle your old CDs, DVDs, and optical media to reduce e-waste.',
    image: 'https://images.unsplash.com/photo-1594114170672-2201e6721c2a?q=80&w=2942&auto=format&fit=crop',
    category: 'Media Disposal',
    readTime: '6 min read',
    type: 'cd-guide'
  },
  {
    id: 11,
    title: 'CD Guide: Repurposing Old Optical Media',
    description: 'Creative ways to repurpose and upcycle your old CDs and DVDs into art and useful items.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    category: 'DIY',
    readTime: '8 min read',
    type: 'cd-guide'
  },
  {
    id: 12,
    title: 'Mumbai\'s E-Waste Collection Points',
    description: 'A comprehensive video guide to all the e-waste collection points across Mumbai city.',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?q=80&w=3000&auto=format&fit=crop',
    category: 'Local Resources',
    readTime: '15 min watch',
    type: 'video'
  }
];

const categories = ['All', 'Environment', 'Guides', 'Security', 'Policy', 'DIY', 'Business', 'Education', 'Media Disposal', 'Local Resources'];

export default function Education() {
  const [activeTab, setActiveTab] = useState<'all' | 'article' | 'video' | 'guide' | 'cd-guide'>('all');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = educationItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="mb-10">
            <h1 className="text-4xl font-display font-semibold mb-4">
              Educational Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore our collection of articles, videos, guides and more to learn about e-waste management and sustainable practices in Mumbai and beyond.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for resources..." 
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'article' | 'video' | 'guide' | 'cd-guide')}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  All Resources
                </TabsTrigger>
                <TabsTrigger value="article" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="guide" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Guides
                </TabsTrigger>
                <TabsTrigger value="cd-guide" className="flex items-center gap-2">
                  <Disc className="h-4 w-4" />
                  CD Guides
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2 mb-2">
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
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <EducationCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
