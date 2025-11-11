'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import Image from 'next/image';
import { Input } from './ui/Input';

interface HeaderProps {
  onAddMealClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddMealClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

    return (
        <>
            <div className="food-header bg-white fixed top-0 left-0 right-0 z-40">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
                    <div className="flex justify-between items-center py-2">
                        {/* Logo */}
                        <Link href="/" className="food-logo flex items-center">
                            <div className="food-logo-image relative">
                                <Image
                                    src="/images/logo.png"
                                    alt="FoodWagen - Discover Amazing Food"
                                    width={160}
                                    height={40}
                                    className="food-logo-img w-32 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12 object-contain transition-all duration-200"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="food-nav hidden md:flex items-center space-x-8">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={onAddMealClick}
                                data-test-id="food-add-meal-btn"
                            >
                                Add Meal
                            </Button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="food-mobile-menu-btn md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            data-test-id="food-mobile-menu-btn"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <nav 
                            className="food-mobile-nav md:hidden py-4 border-t animate-slide-up"
                            data-test-id="food-mobile-nav"
                        >
                            <div className="flex flex-col space-y-4">
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() => {
                                        onAddMealClick();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full justify-center"
                                    data-test-id="food-mobile-add-meal-btn"
                                >
                                    Add Meal
                                </Button>
                                <Link 
                                    href="/" 
                                    className="food-nav-link text-gray-700 hover:text-blue-600 transition-colors duration-150 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                    data-test-id="food-nav-home"
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/foods" 
                                    className="food-nav-link text-gray-700 hover:text-blue-600 transition-colors duration-150 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                    data-test-id="food-nav-foods"
                                >
                                    Foods
                                </Link>
                                <Link 
                                    href="/restaurants" 
                                    className="food-nav-link text-gray-700 hover:text-blue-600 transition-colors duration-150 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                    data-test-id="food-nav-restaurants"
                                >
                                    Restaurants
                                </Link>
                                <Link 
                                    href="/about" 
                                    className="food-nav-link text-gray-700 hover:text-blue-600 transition-colors duration-150 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                    data-test-id="food-nav-about"
                                >
                                    About
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className="food-nav-link text-gray-700 hover:text-blue-600 transition-colors duration-150 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                    data-test-id="food-nav-contact"
                                >
                                    Contact
                                </Link>
                            </div>
                        </nav>
                    )}
                </div>
            </div>

            {/* Hero Section - Add margin top to prevent overlay */}
           <section className="food-hero-section w-full bg-primary-yellow relative mt-16">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12" style={{
        position: "relative",
        justifyContent: "center",
        justifyItems: "center",
        display: "flex"
    }}>
        {/* Centered Content */}
        <div className="flex items-center justify-left text-left">
            {/* Text Content */}
            <div className="food-header-title-container max-w-4xl mb-8 md:mb-12" style={{width:"75%",padding: "2% 0 0 0"}}>
                <h1 className="food-hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    Are you starving?
                </h1>
                <p className="food-hero-description text-lg md:text-xl lg:text-2xl text-gray-800 mb-8 md:mb-12 max-w-2xl">
                    Within a few clicks, find meals that are accessible near you
                </p>
            
                {/* Delivery Type Selector and Search Card */}
                <div className="food-hero-card bg-white rounded-3xl shadow-lg p-4 md:p-4 max-w-4xl mx-auto">
                    {/* Delivery Type Selector */}
                    <div className="food-delivery-type-selector mb-6 md:mb-8 w-full">
                        <div className="flex space-x-4 justify-left">
                            <button
                                onClick={() => setDeliveryType('delivery')}
                                className={`food-delivery-btn p-2 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                                    deliveryType === 'delivery'
                                        ? 'bg-orange-50 text-orange-600 '
                                        : 'bg-white text-gray-700 '
                                }`}
                                data-test-id="food-delivery-btn"
                            >
                                <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.0703 4.5C20.5312 4.53516 22.5352 6.53906 22.5703 8.96484C22.5703 11.4961 20.5312 13.5352 18 13.5C15.5742 13.5 13.5703 11.4961 13.5703 9.03516C13.5352 7.66406 14.168 6.43359 15.1172 5.58984L14.6953 4.85156C13.3242 5.97656 12.6562 7.59375 12.7266 9.24609C12.7266 9.73828 12.3398 10.125 11.8828 10.125H8.92969C8.40234 12.0938 6.64453 13.5 4.57031 13.5C2.03906 13.5 0 11.4609 0.0703125 8.89453C0.105469 6.53906 2.00391 4.60547 4.39453 4.53516C4.88672 4.5 5.37891 4.57031 5.83594 4.71094L6.22266 3.97266C5.90625 3.48047 5.41406 3.09375 4.57031 3.09375H2.60156C2.10938 3.09375 1.75781 2.74219 1.75781 2.28516C1.72266 1.79297 2.14453 1.40625 2.60156 1.40625H4.57031C6.50391 1.40625 7.45312 2.00391 8.05078 2.8125H13.4648L12.7969 1.6875H10.4766C10.1602 1.6875 9.91406 1.44141 9.91406 1.125V0.5625C9.91406 0.28125 10.1602 0 10.4766 0H13.2891C13.5703 0 13.8516 0.175781 13.9922 0.421875L14.8008 1.75781L16.1016 0.28125C16.2773 0.105469 16.4883 0 16.7344 0H18.3516C18.8086 0 19.1953 0.386719 19.1953 0.84375V1.96875C19.1953 2.46094 18.8086 2.8125 18.3516 2.8125H15.4336L16.5938 4.74609C17.0508 4.60547 17.5781 4.5 18.0703 4.5ZM4.57031 11.8125C5.69531 11.8125 6.67969 11.1445 7.13672 10.125H4.28906C3.62109 10.125 3.23438 9.45703 3.55078 8.89453L4.99219 6.22266C4.85156 6.22266 4.71094 6.1875 4.57031 6.1875C2.98828 6.1875 1.75781 7.45312 1.75781 9C1.75781 10.582 2.98828 11.8125 4.57031 11.8125ZM20.8477 9.17578C20.9531 7.55859 19.6523 6.1875 18.0703 6.22266C17.8594 6.22266 17.6836 6.22266 17.5078 6.25781L19.1953 9.10547C19.3711 9.38672 19.2656 9.73828 19.0195 9.87891L18.5273 10.1602C18.2461 10.3359 17.9297 10.2305 17.7539 9.98438L16.0312 7.06641C15.5391 7.59375 15.2578 8.26172 15.2578 9C15.2578 10.6172 16.5938 11.918 18.2109 11.8125C19.6172 11.7422 20.7773 10.582 20.8477 9.17578Z" 
                                        fill={deliveryType === 'delivery' ? "#F17228" : "#757575"}
                                    />
                                </svg>
                                <span>Delivery</span>
                            </button>
                            <button
                                onClick={() => setDeliveryType('pickup')}
                                className={`food-pickup-btn p-2 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                                    deliveryType === 'pickup'
                                        ? 'bg-orange-50 text-orange-600 '
                                        : 'bg-white text-gray-700 '
                                }`}
                                data-test-id="food-pickup-btn"
                            >
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M12.375 5.625H15.75V15.1875C15.75 16.7695 14.4844 18 12.9375 18H2.8125C1.23047 18 0 16.7695 0 15.1875V5.625H3.375V4.5C3.375 2.03906 5.37891 0 7.875 0C10.3359 0 12.375 2.03906 12.375 4.5V5.625ZM5.625 4.5V5.625H10.125V4.5C10.125 3.26953 9.10547 2.25 7.875 2.25C6.60938 2.25 5.625 3.26953 5.625 4.5ZM11.25 8.71875C11.707 8.71875 12.0938 8.36719 12.0938 7.875C12.0938 7.41797 11.707 7.03125 11.25 7.03125C10.7578 7.03125 10.4062 7.41797 10.4062 7.875C10.4062 8.36719 10.7578 8.71875 11.25 8.71875ZM4.5 8.71875C4.95703 8.71875 5.34375 8.36719 5.34375 7.875C5.34375 7.41797 4.95703 7.03125 4.5 7.03125C4.00781 7.03125 3.65625 7.41797 3.65625 7.875C3.65625 8.36719 4.00781 8.71875 4.5 8.71875Z" 
                                        fill={deliveryType === 'pickup' ? "#F17228" : "#757575"}
                                    />
                                </svg>
                                <span>Pickup</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Section - Conditionally render based on delivery type */}
                    {deliveryType === 'delivery' ? (
                        <div className="food-search-section w-full">
                            <div className="food-search-container w-full max-w-2xl mx-auto">
                                <div className="flex gap-3 items-center">
                                    {/* Input with grey background */}
                                    <div className="flex-1">
                                        <Input
                                            type="text"
                                            name="food_search"
                                            placeholder="What would you like to eat today?"
                                            className="food-search-input w-full px-6 py-4 rounded-2xl border-0 text-sm"
                                            icon={
                                                <svg className="w-5 h-5" fill="none" stroke="#F17228" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            }
                                            iconPosition="left"
                                            data-test-id="food-search-input"
                                        />
                                    </div>
                                    {/* Separate Find Food button */}
                                    <button 
                                        className="food-search-btn bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                                        data-test-id="food-search-btn"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <span>Find Food</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="food-pickup-section w-full">
                            <div className="food-pickup-container w-full max-w-2xl mx-auto">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        name="pickup_location"
                                        disabled
                                        placeholder="Nairobi Kenya"
                                        className="food-pickup-input w-full px-6 py-4 rounded-2xl border-0 text-sm"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="#F17228" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        }
                                        iconPosition="left"
                                        data-test-id="food-pickup-input"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Content */}
            <div className="food-header-image-container max-w-4xl h-full flex" style={{display: "flex", alignItems: "flex-end"}}>
                <img 
                    src="./images/headerImage.png" 
                    className='food-header-image h-full' 
                    alt="Delicious food selection"
                    data-test-id="food-header-image"
                    style={{width: "47vw",height: "85%"}}
                />
            </div>
        </div>
    </div>
</section>
        </>
    );
};