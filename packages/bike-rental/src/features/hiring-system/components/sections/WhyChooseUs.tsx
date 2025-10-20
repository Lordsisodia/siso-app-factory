
import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
            Premium Service
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Five Star Rides
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
            We deliver exceptional experiences through our commitment to quality, service, and attention to detail.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Premium Vehicles</h3>
            <p className="text-muted-foreground">
              Our fleet features the latest models from the world's most prestigious automotive brands, meticulously maintained to ensure peak performance.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Flexible Rentals</h3>
            <p className="text-muted-foreground">
              From single-day experiences to extended adventures, our flexible rental options accommodate your specific schedule and requirements.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Service</h3>
            <p className="text-muted-foreground">
              Our dedicated team provides bespoke concierge services to ensure your experience exceeds expectations from reservation to return.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
