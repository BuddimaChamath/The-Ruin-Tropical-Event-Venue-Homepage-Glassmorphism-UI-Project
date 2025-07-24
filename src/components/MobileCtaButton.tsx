import React, { useEffect, useState } from 'react';
const MobileCtaButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  if (!isVisible) return null;
  return <button onClick={scrollToBooking} className={`fixed bottom-6 right-6 z-40 bg-[#D4AF37] hover:bg-[#C4A030] text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 md:hidden ${isAnimating ? 'animate-bounce' : ''}`}>
      Request Quote
    </button>;
};
export default MobileCtaButton;