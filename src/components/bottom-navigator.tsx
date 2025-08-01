
"use client";

import { Home, Users, BarChart, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigatorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { name: 'Home', icon: Home },
  { name: 'Social', icon: Users },
  { name: 'Dashboard', icon: BarChart },
  { name: 'Profile', icon: UserCircle },
];

export function BottomNavigator({ activeTab, onTabChange }: BottomNavigatorProps) {
  return (
    <nav className="sticky bottom-0 w-full h-16 bg-card border-t border-border shadow-t-lg z-20">
      <div className="flex justify-around items-center h-full max-w-4xl mx-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors",
              activeTab === item.name ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
