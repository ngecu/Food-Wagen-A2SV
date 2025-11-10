// src/components/Footer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface FooterProps {
  companyName?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  companyName = "Your Company" 
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: '#'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: '#'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
        </svg>
      ),
      url: '#'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: '#'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="food-footer bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/team" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/partner" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="/ride" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Ride with us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-2">
            <h3 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Receive exclusive offers in your mailbox
            </h3>
            
            {isSubscribed ? (
              <div className="food-subscription-success bg-green-600 text-white p-4 rounded-lg text-center">
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  name="subscription_email"
                  type="email"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="food-subscription-input bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                  data-test-id="food-subscription-input"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="food-subscription-btn w-full"
                  data-test-id="food-subscription-btn"
                >
                  Subscribe
                </Button>
              </form>
            )}

            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="food-social-title text-lg font-bold mb-4 text-white">
                FOLLOW US
              </h4>
              <div className="food-social-links flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="food-social-link bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200"
                    aria-label={social.name}
                    data-test-id={`food-social-${social.name.toLowerCase()}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="food-footer-bottom border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="food-copyright text-gray-400 text-sm text-center md:text-left">
              <span data-test-id="food-footer-copyright">
                © {currentYear} {companyName}. All rights reserved
              </span>
            </div>

            {/* Made with love */}
            <div className="food-made-with flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>by</span>
              <Link href="https://thameswagon.com" className="text-orange-500 hover:text-orange-400 transition-colors">
                Thameswagon
              </Link>
            </div>

            {/* Resort text - optional */}
            <div className="food-resort text-gray-400 text-sm">
              <span>Resort</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};