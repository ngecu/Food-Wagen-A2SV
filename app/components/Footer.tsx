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
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5469 5.10938C13.5 5.10938 15.9375 7.54688 15.9375 10.5C15.9375 13.5 13.5 15.8906 10.5469 15.8906C7.54688 15.8906 5.15625 13.5 5.15625 10.5C5.15625 7.54688 7.54688 5.10938 10.5469 5.10938ZM10.5469 14.0156C12.4688 14.0156 14.0156 12.4688 14.0156 10.5C14.0156 8.57812 12.4688 7.03125 10.5469 7.03125C8.57812 7.03125 7.03125 8.57812 7.03125 10.5C7.03125 12.4688 8.625 14.0156 10.5469 14.0156ZM17.3906 4.92188C17.3906 5.625 16.8281 6.1875 16.125 6.1875C15.4219 6.1875 14.8594 5.625 14.8594 4.92188C14.8594 4.21875 15.4219 3.65625 16.125 3.65625C16.8281 3.65625 17.3906 4.21875 17.3906 4.92188ZM20.9531 6.1875C21.0469 7.92188 21.0469 13.125 20.9531 14.8594C20.8594 16.5469 20.4844 18 19.2656 19.2656C18.0469 20.4844 16.5469 20.8594 14.8594 20.9531C13.125 21.0469 7.92188 21.0469 6.1875 20.9531C4.5 20.8594 3.04688 20.4844 1.78125 19.2656C0.5625 18 0.1875 16.5469 0.09375 14.8594C0 13.125 0 7.92188 0.09375 6.1875C0.1875 4.5 0.5625 3 1.78125 1.78125C3.04688 0.5625 4.5 0.1875 6.1875 0.09375C7.92188 0 13.125 0 14.8594 0.09375C16.5469 0.1875 18.0469 0.5625 19.2656 1.78125C20.4844 3 20.8594 4.5 20.9531 6.1875ZM18.7031 16.6875C19.2656 15.3281 19.125 12.0469 19.125 10.5C19.125 9 19.2656 5.71875 18.7031 4.3125C18.3281 3.42188 17.625 2.67188 16.7344 2.34375C15.3281 1.78125 12.0469 1.92188 10.5469 1.92188C9 1.92188 5.71875 1.78125 4.35938 2.34375C3.42188 2.71875 2.71875 3.42188 2.34375 4.3125C1.78125 5.71875 1.92188 9 1.92188 10.5C1.92188 12.0469 1.78125 15.3281 2.34375 16.6875C2.71875 17.625 3.42188 18.3281 4.35938 18.7031C5.71875 19.2656 9 19.125 10.5469 19.125C12.0469 19.125 15.3281 19.2656 16.7344 18.7031C17.625 18.3281 18.375 17.625 18.7031 16.6875Z" fill="#F5F5F5"/>
        </svg>

      ),
      url: '#'
    },
    {
      name: 'Facebook',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.25 11.625C23.25 17.4375 18.9844 22.2656 13.4062 23.1094V15H16.125L16.6406 11.625H13.4062V9.46875C13.4062 8.53125 13.875 7.64062 15.3281 7.64062H16.7812V4.78125C16.7812 4.78125 15.4688 4.54688 14.1562 4.54688C11.5312 4.54688 9.79688 6.1875 9.79688 9.09375V11.625H6.84375V15H9.79688V23.1094C4.21875 22.2656 0 17.4375 0 11.625C0 5.20312 5.20312 0 11.625 0C18.0469 0 23.25 5.20312 23.25 11.625Z" fill="#F5F5F5"/>
</svg>

      ),
      url: '#'
    },
    {
      name: 'Twitter',
      icon: (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5156 4.82812C21.5156 5.0625 21.5156 5.25 21.5156 5.48438C21.5156 12 16.5938 19.4531 7.54688 19.4531C4.73438 19.4531 2.15625 18.6562 0 17.25C0.375 17.2969 0.75 17.3438 1.17188 17.3438C3.46875 17.3438 5.57812 16.5469 7.26562 15.2344C5.10938 15.1875 3.28125 13.7812 2.67188 11.8125C3 11.8594 3.28125 11.9062 3.60938 11.9062C4.03125 11.9062 4.5 11.8125 4.875 11.7188C2.625 11.25 0.9375 9.28125 0.9375 6.89062V6.84375C1.59375 7.21875 2.39062 7.40625 3.1875 7.45312C1.82812 6.5625 0.984375 5.0625 0.984375 3.375C0.984375 2.4375 1.21875 1.59375 1.64062 0.890625C4.07812 3.84375 7.73438 5.8125 11.8125 6.04688C11.7188 5.67188 11.6719 5.29688 11.6719 4.92188C11.6719 2.20312 13.875 0 16.5938 0C18 0 19.2656 0.5625 20.2031 1.54688C21.2812 1.3125 22.3594 0.890625 23.2969 0.328125C22.9219 1.5 22.1719 2.4375 21.1406 3.04688C22.125 2.95312 23.1094 2.67188 23.9531 2.29688C23.2969 3.28125 22.4531 4.125 21.5156 4.82812Z" fill="#F5F5F5"/>
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
    <footer className="food-footer bg-[#212121] text-white">
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
              <h6 className="food-social-title text-lg font-bold mb-4 text-[#F5F5F5]">
                FOLLOW US
              </h6>
              <div className="food-social-links flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="food-social-link  p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200"
                    aria-label={`Follow us on ${social.name}`}
                    data-test-id={`food-social-${social.name.toLowerCase()}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <p className="food-footer-column-offer text-lg font-semibold mb-6 text-white">
              Receive exclusive food offers
            </p>
            
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
                    className="food-subscription-input bg-[#424242] border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 pl-10"
                    data-test-id="food-subscription-input"
                    icon={
                                                 <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.5312 5.95312C22.4531 6.79688 21.0938 7.82812 16.3125 11.2969C15.375 12 13.6406 13.5469 12 13.5469C10.3125 13.5469 8.625 12 7.64062 11.2969C2.85938 7.82812 1.5 6.79688 0.421875 5.95312C0.234375 5.8125 0 5.95312 0 6.1875V15.75C0 17.0156 0.984375 18 2.25 18H21.75C22.9688 18 24 17.0156 24 15.75V6.1875C24 5.95312 23.7188 5.8125 23.5312 5.95312ZM12 12C13.0781 12.0469 14.625 10.6406 15.4219 10.0781C21.6562 5.57812 22.125 5.15625 23.5312 4.03125C23.8125 3.84375 24 3.51562 24 3.14062V2.25C24 1.03125 22.9688 0 21.75 0H2.25C0.984375 0 0 1.03125 0 2.25V3.14062C0 3.51562 0.140625 3.84375 0.421875 4.03125C1.82812 5.15625 2.29688 5.57812 8.53125 10.0781C9.32812 10.6406 10.875 12.0469 12 12Z" fill="#ADADAD"/>
                                                </svg>
                                            }
                    iconPosition="left"
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
                Robinson Ngecu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};