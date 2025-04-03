
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { educationItems } from '@/data/education-data';

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = educationItems.find(item => item.id === Number(id));
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 pb-20">
          <Container>
            <div className="text-center py-16">
              <h2 className="text-2xl font-display font-semibold mb-4">Article not found</h2>
              <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/education')}>Back to Education</Button>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/education')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4
                ${article.type === 'article' ? "bg-blue-100 text-blue-600" : 
                 article.type === 'video' ? "bg-red-100 text-red-600" : 
                 article.type === 'cd-guide' ? "bg-amber-100 text-amber-600" :
                 "bg-purple-100 text-purple-600"}`
              }>
                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {article.category}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="lead mb-6">{article.description}</p>

              {article.fullContent?.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.subheading && <h2 className="text-2xl font-display font-medium mb-4">{section.subheading}</h2>}
                  {section.paragraphs?.map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                  {section.image && (
                    <div className="my-8 rounded-xl overflow-hidden">
                      <img 
                        src={section.image} 
                        alt={section.imageAlt || "Article section image"} 
                        className="w-full h-auto"
                      />
                      {section.imageCaption && (
                        <p className="text-sm text-center text-muted-foreground mt-2">{section.imageCaption}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {!article.fullContent && (
                <>
                  <p>Electronic waste, or e-waste, has become one of the fastest-growing waste streams globally, and Mumbai is no exception. With a population of over 20 million people and as a major tech hub in India, the city faces significant challenges in managing its e-waste effectively.</p>
                  
                  <h2>The Scale of the Problem</h2>
                  <p>India generates approximately 3.2 million tonnes of e-waste annually, and Maharashtra, with Mumbai as its capital, contributes significantly to this figure. As technology continues to advance and product lifecycles shorten, the volume of discarded electronics is expected to rise exponentially in the coming years.</p>
                  
                  <p>Many electronic devices contain hazardous materials such as lead, mercury, cadmium, and brominated flame retardants. When improperly disposed of, these toxic substances can leach into soil and water sources, posing serious risks to both human health and the environment.</p>
                  
                  <h2>Challenges in E-Waste Management</h2>
                  <p>Despite regulations like the E-Waste (Management) Rules, which mandate proper disposal of electronic waste, implementation remains a challenge. The informal sector handles a significant portion of e-waste recycling in Mumbai, often using crude methods that expose workers to harmful substances and result in environmental pollution.</p>
                  
                  <p>Additionally, low awareness among consumers about the importance of proper e-waste disposal contributes to the problem. Many people are unaware of the environmental impact of discarding electronic devices with regular household waste.</p>
                  
                  <h2>Moving Towards Solutions</h2>
                  <p>Fortunately, there are promising initiatives and solutions emerging in Mumbai to address the e-waste challenge:</p>
                  <ul>
                    <li>Authorized collection centers established by manufacturers and recyclers</li>
                    <li>Community collection drives organized by NGOs and resident welfare associations</li>
                    <li>Educational campaigns to raise awareness about proper e-waste disposal</li>
                    <li>Advanced recycling facilities that can safely extract valuable materials from e-waste</li>
                  </ul>
                  
                  <h2>What You Can Do</h2>
                  <p>As a resident of Mumbai, you can contribute to solving the e-waste problem by:</p>
                  <ul>
                    <li>Donating functioning but unwanted electronics to schools or charities</li>
                    <li>Dropping off your e-waste at authorized collection points</li>
                    <li>Participating in e-waste collection drives in your community</li>
                    <li>Spreading awareness about proper e-waste disposal among friends and family</li>
                  </ul>
                  
                  <h2>Conclusion</h2>
                  <p>Addressing the e-waste challenge in Mumbai requires a collaborative effort from government bodies, manufacturers, recyclers, and citizens. By taking responsibility for our electronic waste and ensuring it's properly disposed of, we can help protect our environment and create a more sustainable future for Mumbai.</p>
                </>
              )}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
