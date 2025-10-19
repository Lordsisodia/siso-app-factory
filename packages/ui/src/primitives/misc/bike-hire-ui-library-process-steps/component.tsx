import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProcessStepsProps {
  badge?: string;
  heading: string;
  description?: string;
  steps: ProcessStep[];
  ctaButton?: {
    label: string;
    href: string;
  };
  columns?: number;
  className?: string;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  badge,
  heading,
  description,
  steps,
  ctaButton,
  columns = 3,
  className
}) => {
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

  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-12"
        >
          {badge && (
            <motion.span variants={fadeInUp} className="text-accent font-medium mb-2">
              {badge}
            </motion.span>
          )}
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
            {heading}
          </motion.h2>
          {description && (
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
              {description}
            </motion.p>
          )}
        </motion.div>

        <div className={`grid grid-cols-1 ${gridCols} gap-10 mt-12`}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <Button asChild>
              <Link to={ctaButton.href} className="flex items-center gap-2">
                {ctaButton.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProcessSteps;
