
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  tagline: string;
  heroImageUrl: string;
  onDonate: () => void;
  onShare: () => void;
  isSharing: boolean;
}

const HeroSection = ({ 
  title, 
  tagline, 
  heroImageUrl, 
  onDonate, 
  onShare, 
  isSharing 
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${heroImageUrl})`,
          filter: 'brightness(0.4)'
        }}
      />
      <div className="container mx-auto px-4 py-16 relative z-10 text-center text-white">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {tagline}
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button 
            size="lg" 
            onClick={onDonate}
            className="px-8 py-6 text-lg"
          >
            Donate to {title}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-black"
            onClick={onShare}
          >
            {isSharing ? "Link Copied!" : "Share Mission"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
