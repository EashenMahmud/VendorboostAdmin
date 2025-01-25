import { InventoryItem, Shop, Vendor, SalesData, CategoryData } from '../types';

export const vendors: Vendor[] = [
  { id: '1', name: 'Vendor A', totalOrders: 150, reliability: 0.95, avgDeliveryDays: 2.3, activeContracts: 5 },
  { id: '2', name: 'Vendor B', totalOrders: 120, reliability: 0.88, avgDeliveryDays: 3.1, activeContracts: 3 },
  { id: '3', name: 'Vendor C', totalOrders: 90, reliability: 0.92, avgDeliveryDays: 2.8, activeContracts: 4 },
  { id: '4', name: 'Vendor D', totalOrders: 75, reliability: 0.85, avgDeliveryDays: 3.5, activeContracts: 2 },
  { id: '5', name: 'Vendor E', totalOrders: 60, reliability: 0.90, avgDeliveryDays: 2.5, activeContracts: 3 },
];

// Dhaka locations
export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Product A',
    stockLevel: 500,
    location: {
      lat: 23.8103,
      lng: 90.4125,
      name: 'Uttara Warehouse'
    },
    category: 'Electronics',
    lastRestockDate: '2024-02-15',
    threshold: 100,
    turnoverRate: 0.85,
    profitMargin: 0.25
  },
  {
    id: '2',
    name: 'Product B',
    stockLevel: 300,
    location: {
      lat: 23.7461,
      lng: 90.3742,
      name: 'Mohammadpur Warehouse'
    },
    category: 'Clothing',
    lastRestockDate: '2024-02-10',
    threshold: 50,
    turnoverRate: 0.92,
    profitMargin: 0.35
  },
  {
    id: '3',
    name: 'Product C',
    stockLevel: 750,
    location: {
      lat: 23.7925,
      lng: 90.4078,
      name: 'Banani Warehouse'
    },
    category: 'Electronics',
    lastRestockDate: '2024-02-20',
    threshold: 150,
    turnoverRate: 0.78,
    profitMargin: 0.30
  },
  {
    id: '4',
    name: 'Product D',
    stockLevel: 200,
    location: {
      lat: 23.7511,
      lng: 90.3934,
      name: 'Dhanmondi Warehouse'
    },
    category: 'Home Goods',
    lastRestockDate: '2024-02-18',
    threshold: 40,
    turnoverRate: 0.65,
    profitMargin: 0.40
  },
];

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Bashundhara City Store',
    location: {
      lat: 23.7508,
      lng: 90.3928,
      address: 'Bashundhara City, Panthapath'
    },
    ordersLast30Days: 245,
    revenue: 125000,
    customerSatisfaction: 4.5,
    topSellingCategory: 'Electronics'
  },
  {
    id: '2',
    name: 'Jamuna Future Park',
    location: {
      lat: 23.8135,
      lng: 90.4242,
      address: 'Kuril, Progoti Sharani'
    },
    ordersLast30Days: 189,
    revenue: 98000,
    customerSatisfaction: 4.3,
    topSellingCategory: 'Clothing'
  },
  {
    id: '3',
    name: 'Gulshan DCC Market',
    location: {
      lat: 23.7828,
      lng: 90.4167,
      address: 'Gulshan-1 Circle'
    },
    ordersLast30Days: 167,
    revenue: 85000,
    customerSatisfaction: 4.2,
    topSellingCategory: 'Home Goods'
  },
];

export const salesData: SalesData[] = [
  { month: 'Jan', sales: 45000, orders: 180, returns: 12 },
  { month: 'Feb', sales: 52000, orders: 210, returns: 15 },
  { month: 'Mar', sales: 48000, orders: 195, returns: 10 },
  { month: 'Apr', sales: 61000, orders: 250, returns: 18 },
  { month: 'May', sales: 55000, orders: 220, returns: 14 },
  { month: 'Jun', sales: 58000, orders: 235, returns: 16 }
];

export const categoryData: CategoryData[] = [
  { name: 'Electronics', sales: 185000, growth: 12.5, items: 45 },
  { name: 'Clothing', sales: 142000, growth: 8.3, items: 78 },
  { name: 'Home Goods', sales: 98000, growth: 15.2, items: 34 },
  { name: 'Accessories', sales: 76000, growth: 5.7, items: 56 }
];

export const analyticsData = {
  totalVendors: vendors.length,
  totalInventory: inventoryItems.reduce((acc, item) => acc + item.stockLevel, 0),
  weeklyOrders: 450,
  monthlyRevenue: 308000,
  averageOrderValue: 2000,
  customerRetentionRate: 0.78,
  topSellingItems: [
    { name: 'Product A', sales: 120, revenue: 45000, growth: 15.2 },
    { name: 'Product B', sales: 85, revenue: 32000, growth: 8.7 },
    { name: 'Product C', sales: 65, revenue: 28000, growth: 12.3 },
  ],
  inventoryMetrics: {
    turnoverRate: 0.82,
    stockoutRate: 0.05,
    averageRestockTime: 2.8,
    capacityUtilization: 0.75
  },
  performanceMetrics: {
    orderFulfillmentRate: 0.95,
    returnRate: 0.04,
    deliveryOnTime: 0.92,
    customerSatisfaction: 4.3
  }
};