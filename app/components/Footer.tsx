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
  companyName = "FoodWagen" 
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: '#'
    },
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
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="food-footer bg-gray-900 text-white">
      <div className="food-footer-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Column */}
          <div>
            <h6 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Company
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-about">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/team" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-team">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h6 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Contact
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-help">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/partner" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-partner">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="/ride" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-ride">
                  Ride with us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2">
            <h6 className="food-footer-column-title text-lg font-bold mb-6 text-white">
              Legal
            </h6>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-terms">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-refund">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="food-footer-link text-gray-300 hover:text-white transition-colors duration-200" data-test-id="food-footer-cookies">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-2">
            {/* Social Media Links */}
            <div className="mb-6">
              <h6 className="food-social-title text-lg font-bold mb-4 text-white">
                FOLLOW US
              </h6>
              <div className="food-social-links flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="food-social-link bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200"
                    aria-label={`Follow us on ${social.name}`}
                    data-test-id={`food-social-${social.name.toLowerCase()}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <h6 className="food-footer-column-title text-lg font-semibold mb-4 text-white">
              Receive exclusive food offers
            </h6>
            
            {isSubscribed ? (
              <div className="food-subscription-success bg-green-600 text-white p-4 rounded-lg text-center" data-test-id="food-subscription-success">
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm">Thank you for subscribing to food updates!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <Input
                    name="subscription_email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="food-subscription-input bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 pl-10"
                    data-test-id="food-subscription-input"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="food-subscription-btn whitespace-nowrap"
                  isLoading={isLoading}
                  data-test-id="food-subscription-btn"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
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
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" data-test-id="food-heart-icon">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>by</span>
              <Link href="https://thameswagon.com" className="text-orange-500 hover:text-orange-400 transition-colors" data-test-id="food-company-link">
                Thameswagon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};