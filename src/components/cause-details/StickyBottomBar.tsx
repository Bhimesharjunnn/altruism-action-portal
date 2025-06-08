
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Cause } from '@/types';

interface StickyBottomBarProps {
  cause: Cause;
}

const StickyBottomBar = ({ cause }: StickyBottomBarProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5; // Show after scrolling 50% of viewport
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSponsor = () => {
    navigate(`/sponsor?causeId=${cause._id}`);
  };

  const handleLearnMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="font-semibold text-gray-900">Ready to make an impact?</p>
                <p className="text-sm text-gray-600">Join thousands of supporters today</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleLearnMore}
                  className="px-6"
                >
                  Learn More
                </Button>
                <Button
                  onClick={handleSponsor}
                  className="px-8 bg-primary-600 hover:bg-primary-700"
                >
                  Sponsor This Cause
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;
