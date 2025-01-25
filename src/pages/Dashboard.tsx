import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { analyticsData, salesData, categoryData, vendors } from '../data/mockData';
import { TrendingUp, Users, Package, DollarSign, PercentCircle, Clock } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsData,
  });

  const statsCards = [
    { 
      title: 'Monthly Revenue', 
      value: `৳${analytics?.monthlyRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    { 
      title: 'Total Orders', 
      value: analytics?.weeklyOrders.toString(),
      change: '+8.2%',
      icon: Package,
      color: 'text-blue-500'
    },
    { 
      title: 'Customer Retention', 
      value: `${(analytics?.customerRetentionRate * 100).toFixed(1)}%`,
      change: '+5.3%',
      icon: Users,
      color: 'text-purple-500'
    },
    { 
      title: 'Avg Order Value', 
      value: `৳${analytics?.averageOrderValue.toLocaleString()}`,
      change: '+15.8%',
      icon: TrendingUp,
      color: 'text-orange-500'
    },
    { 
      title: 'Order Fulfillment', 
      value: `${(analytics?.performanceMetrics.orderFulfillmentRate * 100).toFixed(1)}%`,
      change: '+3.2%',
      icon: PercentCircle,
      color: 'text-teal-500'
    },
    { 
      title: 'Avg Delivery Time', 
      value: `${analytics?.inventoryMetrics.averageRestockTime} hour`,
      change: '-0.5 days',
      icon: Clock,
      color: 'text-indigo-500'
    },
  ];

  const salesChartData = {
    labels: salesData.map(d => d.month),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(d => d.sales),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Returns',
        data: salesData.map(d => d.returns * 1000), // Scale up for visibility
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
    ],
  };

  const categoryChartData = {
    labels: categoryData.map(c => c.name),
    datasets: [{
      data: categoryData.map(c => c.sales),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
    }],
  };

  const vendorChartData = {
    labels: vendors.map(v => v.name),
    datasets: [
      {
        label: 'Orders',
        data: vendors.map(v => v.totalOrders),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Reliability Score',
        data: vendors.map(v => v.reliability * 100),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <card.icon className={`w-6 h-6 ${card.color}`} />
              <span className={`text-xs font-medium ${
                card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {card.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mt-4">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <Line 
            data={salesChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' as const },
              },
            }}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <Doughnut 
            data={categoryChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'right' as const },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Vendor Performance</h3>
          <Bar 
            data={vendorChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' as const },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
          <div className="space-y-4">
            {analytics?.topSellingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">Revenue: ৳{item.revenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.sales} units</p>
                  <p className={`text-xs ${
                    item.growth > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}% growth
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;