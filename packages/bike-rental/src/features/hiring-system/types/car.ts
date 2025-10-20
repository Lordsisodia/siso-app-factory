
export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  dailyRate: number;
  specs: {
    seats: number;
    doors: number;
    transmission: string;
    engine: string;
    speed: number;
  };
  category: string;
}
