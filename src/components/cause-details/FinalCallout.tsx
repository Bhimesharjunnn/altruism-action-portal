
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CountUp } from '@/components/cause-details/CountUp';

interface FinalCalloutProps {
  title: string;
  onDonate: () => void;
}

const FinalCallout = ({ title, onDonate }: FinalCalloutProps) => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 inline-block"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <p className="text-2xl font-bold">
              Only <CountUp target={1247} /> spots left to reach our goal!
            </p>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Movement Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every donation to {title} creates lasting change. 
            Together, we can build a more sustainable future for our planet.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={onDonate}
              className="bg-white text-primary-700 hover:bg-gray-100 px-12 py-6 text-xl font-semibold"
            >
              Donate to {title}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCallout;
