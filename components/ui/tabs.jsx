'use client';

import { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

export function Tabs({ defaultValue, children, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const handleTabChange = (value) => {
    setActiveTab(value);
    onChange?.(value);
  };
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return (
    <div className={`flex border-b border-gray-200 gap-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '' }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        px-4 py-2 text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return <div className="mt-4">{children}</div>;
}