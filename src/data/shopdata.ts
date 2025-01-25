import type { Shop } from '../types';

// Helper function to generate random number within a range
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random coordinates within Dhaka city bounds
const generateDhakaCoordinates = () => {
  // Dhaka city approximate bounds
  const bounds = {
    north: 23.8728,
    south: 23.6850,
    east: 90.4485,
    west: 90.3315
  };
  
  return {
    lat: bounds.south + Math.random() * (bounds.north - bounds.south),
    lng: bounds.west + Math.random() * (bounds.east - bounds.west)
  };
};

// Areas in Dhaka for more realistic shop names and locations
const dhakaAreas = [
  'Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mirpur', 'Mohakhali',
  'Bashundhara', 'Motijheel', 'Khilgaon', 'Rampura', 'Badda', 'Mohammadpur',
  'Tejgaon', 'Farmgate', 'Kakrail', 'Malibagh', 'Niketon', 'Baridhara',
  'Paltan', 'Shahbag', 'Elephant Road', 'New Market', 'Wari', 'Jatrabari'
];

const shopTypes = [
  'Grocery Store', 'Pharmacy', 'Restaurant', 'Cafe', 'Electronics Shop',
  'Clothing Store', 'Bakery', 'Supermarket', 'Mobile Shop', 'Book Store',
  'Hardware Store', 'Beauty Salon', 'Gift Shop', 'Jewelry Store', 'Shoe Store'
];

const generateShopName = () => {
  const prefixes = ['Royal', 'Star', 'Golden', 'Silver', 'Diamond', 'Premium', 'Luxury', 'Elite', 'Metro', 'City'];
  const suffixes = ['Mart', 'Shop', 'Store', 'Point', 'Center', 'Zone', 'Hub', 'Gallery', 'Express', 'Place'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const type = shopTypes[Math.floor(Math.random() * shopTypes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${type} ${suffix}`;
};

// Generate 200 shops
export const shops: Shop[] = Array.from({ length: 200 }, (_, index) => {
  const area = dhakaAreas[Math.floor(Math.random() * dhakaAreas.length)];
  const coords = generateDhakaCoordinates();
  const roadNumber = random(1, 32);
  const houseNumber = random(1, 150);
  
  return {
    id: index + 1,
    name: generateShopName(),
    location: {
      name: area,
      address: `House #${houseNumber}, Road #${roadNumber}, ${area}, Dhaka`,
      lat: coords.lat,
      lng: coords.lng
    },
    ordersLast30Days: random(50, 300)
  };
});