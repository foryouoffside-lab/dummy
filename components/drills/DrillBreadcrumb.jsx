'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function DrillBreadcrumb({ items, showHome = true }) {
  
  // items format: [{ name: 'Cognitive', href: '/drills/cognitive' }, { name: 'Memory', href: '/drills/cognitive/memory' }, ...]
  
  const breadcrumbItems = showHome ? [{ name: 'Home', href: '/' }, ...items] : items;
  
  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            
            {isLast ? (
              <span className="text-gray-700 font-medium">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
              >
                {index === 0 && showHome ? (
                  <Home className="w-4 h-4" />
                ) : (
                  item.icon && <span className="text-sm">{item.icon}</span>
                )}
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}