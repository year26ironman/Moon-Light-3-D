import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Key, Lock, Info } from 'lucide-react';
import WalletBanner from './WalletBanner';

const navigationItems = [
  { label: 'Home', route: '/', icon: Home },
  { label: 'Verify', route: '/verify', icon: Key },
  { label: 'Admin', route: '/admin', icon: Lock },
  { label: 'About', route: '/about', icon: Info },
];

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          aria-label="ScholarShield home"
        >
          <Shield
            className="text-accent"
            size={28}
          />
          <span>ScholarShield</span>
        </Link>

        <div className="navbar-links">
          {navigationItems.map(({ label, route, icon: Icon }) => {
            const isActive = pathname === route;

            return (
              <Link
                key={route}
                to={route}
                className={`nav-item${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} />
                <span className="nav-item-text">{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="navbar-wallet">
          <WalletBanner />
        </div>
      </div>
    </nav>
  );
}
