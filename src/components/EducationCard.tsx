
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EducationCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  type: 'article' | 'video' | 'guide';
  className?: string;
  id?: number;
}

export default function EducationCard({
  title,
  description,
  image,
  category,
  readTime,
  type,
  className,
}: EducationCardProps) {
  return (
    <div 
      className={cn(
        "glass-panel rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-md",
        className
      )}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium",
            type === 'article' ? "bg-blue-100 text-blue-600" :
            type === 'video' ? "bg-red-100 text-red-600" :
            "bg-purple-100 text-purple-600"
          )}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
          <span>{category}</span>
          <span>{readTime}</span>
        </div>
        <h3 className="font-display font-medium text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
          Read more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
