import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export interface ProductDetailLayoutProps<T = any> {
  product: T;
  imageUrl: string;
  title: string;
  subtitle?: string;
  category?: string;
  backLink?: {
    href: string;
    label: string;
  };
  sidebar: React.ReactNode;
  children?: React.ReactNode;
  similarProducts?: React.ReactNode;
  className?: string;
}

export function ProductDetailLayout<T = any>({
  product,
  imageUrl,
  title,
  subtitle,
  category,
  backLink,
  sidebar,
  children,
  similarProducts,
  className = ''
}: ProductDetailLayoutProps<T>) {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      {backLink && (
        <Link to={backLink.href} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backLink.label}
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Product Image */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto object-cover rounded-lg"
              style={{ maxHeight: '500px' }}
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Right Column - Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground mt-1">{subtitle}</p>
            )}
            {category && (
              <div className="flex items-center mt-2">
                <Badge className="bg-primary text-white">{category}</Badge>
              </div>
            )}
          </div>

          {sidebar}
        </motion.div>
      </div>

      {/* Additional Content (specs, reviews, etc.) */}
      {children && (
        <div className="mt-10">
          {children}
        </div>
      )}

      {/* Similar Products */}
      {similarProducts && (
        <div className="mt-16">
          {similarProducts}
        </div>
      )}
    </div>
  );
}

export default ProductDetailLayout;
