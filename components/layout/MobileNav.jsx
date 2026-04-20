'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  X, LayoutDashboard, BookOpen, BarChart3, Trophy, 
  User, Settings, LogOut, Target, ChevronRight
} from 'lucide-react';

export default function MobileNav({ isOpen, onClose }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Drills', href: '/drills', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
    onClose();
  };
  
  const isActive = (href) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar Menu */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-xl lg:hidden overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Global Drill</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* User Info */}
        {session && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{session.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate max-w-[180px]">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg transition
                    ${active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            
            <Link
              href="/settings"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            
            {session ? (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center justify-center px-4 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="flex items-center justify-center px-4 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition mt-2"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            © 2024 Global Drill System
          </p>
        </div>
      </div>
    </>
  );
}