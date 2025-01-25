import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Bot,
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/inventory', icon: Package, label: 'Inventory' },
    { to: '/shops', icon: Store, label: 'Shops' },
    { to: '/ai-agent', icon: Bot, label: 'AI Agent' },
  ];

  return (
    <aside 
      className={`bg-white shadow-lg transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className={`font-bold text-xl ${collapsed ? 'hidden' : 'block'}`}>
          Admin Panel
        </h1>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              } hover:bg-blue-50 hover:text-blue-600 transition-colors`
            }
          >
            <item.icon size={20} />
            <span className={`ml-4 ${collapsed ? 'hidden' : 'block'}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;