import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Shop } from './types';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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
   'Restaurant', 'Cafe', 
  
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
const generateShops = (): Shop[] => Array.from({ length: 200 }, (_, index) => {
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

function App() {
  const { data: shopLocations } = useQuery<Shop[]>({
    queryKey: ['shops'],
    queryFn: () => generateShops(),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');

  const areas = Array.from(new Set(dhakaAreas)).sort();

  const filteredShops = shopLocations?.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === 'all' || shop.location.name === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Dhaka Shop Locations</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search shops..."
                className="px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="px-4 py-2 border rounded-lg"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="all">All Areas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-[600px] rounded-lg overflow-hidden">
            <MapContainer
              center={[23.7805, 90.3900]} // Centered on Dhaka
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredShops?.map((shop) => (
                <Marker
                  key={shop.id}
                  position={[shop.location.lat, shop.location.lng]}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{shop.name}</h3>
                      <p className="text-sm text-gray-600">{shop.location.address}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Orders (30 days): {shop.ordersLast30Days}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shop Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shop Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders (30 Days)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredShops?.map((shop) => (
                    <tr key={shop.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{shop.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shop.location.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shop.location.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shop.ordersLast30Days}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            shop.ordersLast30Days >= 200
                              ? 'bg-green-100 text-green-800'
                              : shop.ordersLast30Days >= 150
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {shop.ordersLast30Days >= 200
                            ? 'Excellent'
                            : shop.ordersLast30Days >= 150
                            ? 'Good'
                            : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;