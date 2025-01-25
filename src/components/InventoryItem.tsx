import type { InventoryItem } from '../types';

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: 'Electronics Stock',
    category: 'Electronics',
    stockLevel: 150,
    threshold: 100,
    lastRestockDate: '2024-03-01',
    location: {
      name: 'Bashundhara City Shopping Complex',
      lat: 23.7508,
      lng: 90.3928
    }
  },
  {
    id: 2,
    name: 'Fashion Items',
    category: 'Clothing',
    stockLevel: 80,
    threshold: 100,
    lastRestockDate: '2024-02-28',
    location: {
      name: 'New Market',
      lat: 23.7337,
      lng: 90.3840
    }
  },
  {
    id: 3,
    name: 'Books Collection',
    category: 'Books',
    stockLevel: 200,
    threshold: 150,
    lastRestockDate: '2024-03-05',
    location: {
      name: 'Nilkhet Book Market',
      lat: 23.7328,
      lng: 90.3874
    }
  },
  {
    id: 4,
    name: 'Grocery Items',
    category: 'Food',
    stockLevel: 90,
    threshold: 100,
    lastRestockDate: '2024-03-10',
    location: {
      name: 'Karwan Bazar',
      lat: 23.7512,
      lng: 90.3935
    }
  },
  {
    id: 5,
    name: 'Furniture Stock',
    category: 'Furniture',
    stockLevel: 45,
    threshold: 50,
    lastRestockDate: '2024-03-08',
    location: {
      name: 'Hatirpool Furniture Market',
      lat: 23.7414,
      lng: 90.3814
    }
  },
  {
    id: 6,
    name: 'Mobile Phones',
    category: 'Electronics',
    stockLevel: 120,
    threshold: 75,
    lastRestockDate: '2024-03-12',
    location: {
      name: 'IDB Bhaban',
      lat: 23.7771,
      lng: 90.3766
    }
  }
];