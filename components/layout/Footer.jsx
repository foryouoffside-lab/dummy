'use client';

import Link from 'next/link';
import { Target, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    Product: [
      { name: 'Drills', href: '/drills' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Leaderboard', href: '/leaderboard' },
      { name: 'Pricing', href: '/pricing' }
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ],
    Resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };
  
  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com' },
    { name: 'GitHub', icon: '🐙', href: 'https://github.com' },
    { name: 'LinkedIn', icon: '🔗', href: 'https://linkedin.com' },
    { name: 'Facebook', icon: '📘', href: 'https://facebook.com' },
    { name: 'Email', icon: '📧', href: 'mailto:hello@globaldrill.com' }
  ];
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Global Drill System</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              The ultimate platform for human performance training. 
              Train your cognitive, visual, and motor skills with our comprehensive drill system.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Global Drill System. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500" />
              <span>for human performance</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
