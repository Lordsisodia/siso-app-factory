
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@siso/ui/lib/utils';
import { ArrowRight } from 'lucide-react';

// Function to get an appropriate image for each category
const getCategoryImage = (category: string) => {
  switch (category.toLowerCase()) {
    case 'luxury':
      return 'https://images.unsplash.com/photo-1631296353718-dab55377d72c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800';
    case 'sports':
      return 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800';
    case 'supercar':
      return 'https://images.unsplash.com/photo-1636500679446-dc6dbd5f8607?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800';
    case 'electric':
      return 'https://images.unsplash.com/photo-1617788138017-80ad40651029?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800';
    case 'suv':
      return 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800';
    default:
      return 'https://images.unsplash.com/photo-1597987072661-a0d7c088f3a9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800';
  }
};

interface CategoryCardsProps {
  categories: string[];
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {categories.map((category, index) => (
        <motion.div key={category} variants={item}>
          <Link
            to={`/cars?category=${category.toLowerCase()}`}
            className="block group relative h-64 rounded-2xl overflow-hidden"
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90 z-10",
              "group-hover:from-transparent group-hover:via-primary/40 group-hover:to-primary/80 transition-all duration-500"
            )} />

            <img
              src={getCategoryImage(category)}
              alt={`${category} cars`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <p className="text-white/90 text-sm mb-4 max-w-[80%]">
                Explore our {category.toLowerCase()} collection
              </p>
              <span className="inline-flex items-center text-xs font-medium text-white px-3 py-1.5 bg-accent/90 rounded-full group-hover:bg-accent transition-colors duration-300 group-hover:pr-4">
                Browse Category
                <ArrowRight className="h-3 w-0 ml-0 opacity-0 group-hover:w-3 group-hover:ml-1 group-hover:opacity-100 transition-all duration-300" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryCards;
