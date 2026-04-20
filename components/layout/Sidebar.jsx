'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, BarChart3, Trophy, 
  User, Settings, HelpCircle, LogOut, Target,
  ChevronRight, TrendingUp, Award, Calendar
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, user, onSignOut }) {
  const pathname = usePathname();
  
  const mainNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Drills', href: '/drills', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];
  
  const secondaryNavItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Achievements', href: '/achievements', icon: Award },
    { name: 'Activity', href: '/activity', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  const isActive = (href) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };
  
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-30 overflow-y-auto">
        <div className="p-4">
          {/* User Profile Summary */}
          {user && (
            <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  {user.name?.[0] || user.email?.[0] || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Level {user.level || 1}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>XP Progress</span>
                  <span>{((user.xp || 0) % 1000) / 10}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${((user.xp || 0) % 1000) / 10}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Main Navigation */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Main
            </p>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg transition
                      ${active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Secondary Navigation */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Account
            </p>
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg transition
                      ${active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4" />}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Support */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Support
            </p>
            <Link
              href="/help"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Help Center</span>
            </Link>
          </div>
          
          {/* Sign Out Button */}
          {user && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile Sidebar (same as MobileNav component) */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Same mobile menu content as MobileNav */}
      </div>
    </>
  );
}