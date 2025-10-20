
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@siso/ui/lib/utils';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800',
    alt: 'Porsche 911 on a coastal road',
  },
  {
    url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800',
    alt: 'Ferrari on a racetrack',
  },
  {
    url: 'https://images.unsplash.com/photo-1555652736-e92021d28a10?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800',
    alt: 'Lamborghini on a mountain road',
  },
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/90 z-10" />
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-start relative z-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block bg-accent/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
              Premium Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4"
          >
            Experience Luxury on Four Wheels
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/90 text-lg md:text-xl mb-8 max-w-lg"
          >
            Drive the finest high-performance vehicles with our premium car rental service. Every journey becomes extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/cars"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md text-base font-medium transition-all-medium"
            >
              Explore Our Fleet
            </Link>
            <Link
              to="/about"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-md text-base font-medium transition-all-medium"
            >
              Learn About Us
            </Link>
          </motion.div>
        </div>

        {/* Image Navigation Indicators */}
        <div className="absolute bottom-12 left-6 flex space-x-2 z-30">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-12 h-1 rounded transition-all-medium",
                currentImageIndex === index
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50"
              )}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
