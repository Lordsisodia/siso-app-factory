import React from 'react';
import { motion } from 'framer-motion';

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  details: string | string[];
}

export interface ContactInfoGridProps {
  contacts: ContactInfoItem[];
  animated?: boolean;
  className?: string;
}

export const ContactInfoGrid: React.FC<ContactInfoGridProps> = ({
  contacts,
  animated = true,
  className = ''
}) => {
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

  if (!animated) {
    return (
      <div className={`space-y-8 ${className}`}>
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mr-6">
              {contact.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
              {Array.isArray(contact.details) ? (
                contact.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground">
                    {detail}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground">{contact.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className={`space-y-8 ${className}`}
    >
      {contacts.map((contact, index) => (
        <motion.div key={index} variants={fadeInUp} className="flex items-start">
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mr-6">
            {contact.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
            {Array.isArray(contact.details) ? (
              contact.details.map((detail, i) => (
                <p key={i} className="text-muted-foreground">
                  {detail}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">{contact.details}</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactInfoGrid;
