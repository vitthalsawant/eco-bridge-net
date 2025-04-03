
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Film, BookOpen, Search, Disc } from 'lucide-react';
import EducationCard from '@/components/EducationCard';
import { Input } from '@/components/ui/input';
import { educationItems } from '@/data/education-data';

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
