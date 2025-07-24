import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <>
      {isVisible && <button onClick={scrollToTop} aria-label="Scroll to top" className="fixed bottom-24 right-6 z-40 bg-white text-[#D4AF37] p-3 rounded-full shadow-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 md:bottom-8 md:right-8">
          <ArrowUpIcon size={24} />
        </button>}
    </>;
};
export default ScrollToTop;