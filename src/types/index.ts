export interface Vendor {
  id: string;
  name: string;
  totalOrders: number;
  reliability: number;
  avgDeliveryDays: number;
  activeContracts: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  stockLevel: number;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  category: string;
  lastRestockDate: string;
  threshold: number;
  turnoverRate: number;
  profitMargin: number;
}

export interface Shop {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  ordersLast30Days: number;
  revenue: number;
  customerSatisfaction: number;
  topSellingCategory: string;
}

export interface SalesData {
  month: string;
  sales: number;
  orders: number;
  returns: number;
}

export interface CategoryData {
  name: string;
  sales: number;
  growth: number;
  items: number;
}

export interface AIRecommendation {
  itemId: string;
  suggestedQuantity: number;
  confidence: number;
  reasoning: string;
  priceOptimization?: {
    suggestedPrice: number;
    potentialRevenue: number;
  };
}

export interface StockPrediction {
  itemId: string;
  predictedDemand: number;
  seasonalityFactor: number;
  confidenceScore: number;
  suggestedReorderPoint: number;
  wastageRisk: number;
}

export interface VendorRecommendation {
  vendorId: string;
  score: number;
  reliabilityIndex: number;
  deliveryPerformance: number;
  costEfficiency: number;
  suggestedOrderSize: number;
}

export interface DeliveryOptimization {
  routeId: string;
  stops: Array<{
    location: string;
    priority: number;
    timeWindow: string;
  }>;
  estimatedTime: number;
  fuelEfficiency: number;
  costSaving: number;
}