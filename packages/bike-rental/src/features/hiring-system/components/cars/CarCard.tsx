
import React from 'react';
import { Car } from '../../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@siso/ui";
import { Button } from "@siso/ui";
import { Badge } from "@siso/ui";
import { CalendarIcon, Car as CarIcon, Gauge, Heart, LayoutDashboard, ListChecks, MapPin, Users } from 'lucide-react';
import ReviewStars from '../reviews/ReviewStars';
import { Link } from 'react-router-dom';
import { useToast } from '@siso/ui/hooks/use-toast';
import { handleImageError, isValidImageUrl } from '../../utils/imageUtils';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
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
    <Card className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">{car.name}</CardTitle>
        <button
          onClick={toggleFavorite}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <Heart
            size={20}
            className={`transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </CardHeader>

      <div className="relative">
        <img
          src={car.image}
          alt={`Image of ${car.name}`}
          className="aspect-video w-full rounded-md object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
          ${car.dailyRate}/day
        </Badge>
      </div>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium leading-none">Brand</p>
            <p className="text-muted-foreground">{car.brand}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Category</p>
            <p className="text-muted-foreground">{car.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Engine</p>
            <p className="text-muted-foreground">{car.specs.engine}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Transmission</p>
            <p className="text-muted-foreground">{car.specs.transmission}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Seats</p>
            <p className="text-muted-foreground">{car.specs.seats}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Doors</p>
            <p className="text-muted-foreground">{car.specs.doors}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Speed</p>
            <p className="text-muted-foreground">{car.specs.speed} mph</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <ReviewStars rating={4.5} />
        <div className="space-x-2">
          <Link to={`/cars/${car.id}`}>
            <Button variant="outline">Details</Button>
          </Link>
          <Button onClick={() => onClick(car)}>Book Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
