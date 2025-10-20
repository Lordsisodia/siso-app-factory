
import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '../../types';
import { Button } from '@siso/ui';
import ReviewStars from '../reviews/ReviewStars';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useToast } from '@siso/ui/hooks/use-toast';
import { handleImageError } from '../../utils/imageUtils';

interface PopularCarItemProps {
  car: Car;
  onBookClick: (car: Car) => void;
}

const PopularCarItem: React.FC<PopularCarItemProps> = ({ car, onBookClick }) => {
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = React.useState(() => {
    // Check if this car is already in the user's favorites
    const favorites = JSON.parse(localStorage.getItem('favoritesCars') || '[]');
    return favorites.some((favCar: Car) => favCar.id === car.id);
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favoritesCars') || '[]');
    let newFavorites;

    if (isFavorited) {
      // Remove from favorites
      newFavorites = favorites.filter((favCar: Car) => favCar.id !== car.id);
      toast({
        title: "Removed from favorites",
        description: `${car.brand} ${car.name} has been removed from your favorites.`,
        duration: 3000,
      });
    } else {
      // Add to favorites
      newFavorites = [...favorites, car];
      toast({
        title: "Added to favorites",
        description: `${car.brand} ${car.name} has been added to your favorites.`,
        duration: 3000,
      });
    }

    localStorage.setItem('favoritesCars', JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <motion.div
      className="bg-background rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md z-20 transition-all hover:bg-white"
        >
          <Heart
            size={18}
            className={`transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="text-white">
            <h3 className="text-xl font-bold">{car.brand} {car.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <ReviewStars rating={4.5} />
              <span className="text-sm text-white/90">(4.5)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <div className="text-muted-foreground">{car.category}</div>
          <div className="font-semibold text-primary">${car.dailyRate}/day</div>
        </div>

        <ul className="text-sm text-muted-foreground mb-4">
          <li className="flex items-center gap-2 mb-1">
            <span className="inline-block w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</span>
            {car.specs.transmission} Transmission
          </li>
          <li className="flex items-center gap-2 mb-1">
            <span className="inline-block w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</span>
            {car.specs.seats} Seats
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</span>
            {car.specs.engine} Engine
          </li>
        </ul>

        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Link to={`/cars/${car.id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
          <Button
            className="flex-1"
            onClick={() => onBookClick(car)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCarItem;
