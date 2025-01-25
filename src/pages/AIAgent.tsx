import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { inventoryItems, vendors, shops } from '../data/mockData';
import {
  Bot,
  AlertCircle,
  TrendingUp,
  Package,
  Truck,
  BarChart3,
  ShoppingBag,
  Clock,
  AlertTriangle,
} from 'lucide-react';

const AIAgent = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryItems,
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPrediction(true);
  };

  const tabs = [
    { id: 'inventory', label: 'Inventory Optimization', icon: Package },
    { id: 'vendors', label: 'Vendor Analysis', icon: ShoppingBag },
    { id: 'delivery', label: 'Delivery Routes', icon: Truck },
    { id: 'insights', label: 'Market Insights', icon: BarChart3 },
  ];

  const getLowStockItems = () => {
    return inventory?.filter(item => item.stockLevel < item.threshold) || [];
  };

  const getOptimalDeliveryRoute = () => {
    return [
      { location: 'Uttara Warehouse', time: '09:00 AM', priority: 'High' },
      { location: 'Bashundhara City', time: '10:30 AM', priority: 'Medium' },
      { location: 'Gulshan DCC Market', time: '02:00 PM', priority: 'Low' },
    ];
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bot className="w-8 h-8 text-blue-500" />
          <div>
            <h2 className="text-2xl font-semibold">AI Inventory Assistant</h2>
            <p className="text-sm text-gray-500">Powered by advanced analytics and machine learning</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Form */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Smart Order Placement</h3>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Item</label>
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Choose an item...</option>
                    {inventory?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} (Stock: {item.stockLevel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Vendor</label>
                  <select
                    value={selectedVendor}
                    onChange={(e) => setSelectedVendor(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Choose a vendor...</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name} (Reliability: {(vendor.reliability * 100).toFixed(1)}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get AI Recommendation
                </button>
              </form>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Optimized Delivery Routes</h3>
              <div className="space-y-4">
                {getOptimalDeliveryRoute().map((stop, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        stop.priority === 'High' ? 'bg-red-500' : 
                        stop.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium">{stop.location}</p>
                        <p className="text-sm text-gray-500">{stop.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      stop.priority === 'High' ? 'bg-red-100 text-red-800' :
                      stop.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {stop.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Insights and Alerts */}
        <div className="space-y-6">
          {/* Low Stock Alerts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span>Low Stock Alerts</span>
            </h3>
            <div className="space-y-3">
              {getLowStockItems().map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-yellow-600">Stock: {item.stockLevel}</p>
                  </div>
                  <span className="text-xs font-medium text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                    Reorder Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Predictions */}
          {showPrediction && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>AI Insights</span>
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Based on historical data and current market trends, we recommend:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-blue-600">
                    <li>• Optimal order quantity: 150 units</li>
                    <li>• Best time to order: Within 5 days</li>
                    <li>• Predicted demand increase: +15%</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Key Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Order Accuracy</span>
                <span className="text-sm font-medium text-green-600">98%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Delivery Time</span>
                <span className="text-sm font-medium text-blue-600">2.3 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Stock Turnover</span>
                <span className="text-sm font-medium text-purple-600">4.5x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;