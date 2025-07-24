import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import BookingSection from './components/BookingSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import InstagramFeed from './components/InstagramFeed';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import MobileCtaButton from './components/MobileCtaButton';
import ScrollToTop from './components/ScrollToTop';

export function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Enhanced iOS detection
    const detectIOS = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      return isIOS || (isSafari && 'ontouchstart' in window);
    };

    const iosDetected = detectIOS();
    setIsIOS(iosDetected);

    // Enhanced viewport height handling for iOS
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Also set a CSS custom property for full viewport height
      document.documentElement.style.setProperty('--full-height', `${window.innerHeight}px`);
    };

    // Add iOS-specific classes and setup
    if (iosDetected) {
      document.body.classList.add('ios-device');
      document.documentElement.classList.add('ios-device');
      
      // Initial viewport setup
      setVH();
      
      // Handle viewport changes on iOS
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', () => {
        // Delay to account for iOS Safari's animation
        setTimeout(setVH, 150);
      });

      // Handle iOS Safari address bar changes
      const handleScroll = () => {
        // Update viewport height when address bar hides/shows
        if (Math.abs(window.innerHeight - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--full-height'))) > 50) {
          setVH();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Cleanup function for iOS-specific listeners
      return () => {
        window.removeEventListener('resize', setVH);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    // Set page as loaded after a small delay for animation purposes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      
      // Apply background fix for iOS after page load
      if (iosDetected) {
        applyIOSBackgroundFix();
      }
    }, 100);

    const handleSectionScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop - 100;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionId = sectionElement.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '');
        }
      });
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleSectionScroll);
      clearTimeout(timer);
    };
  }, []);

  // Function to apply iOS background fixes
  const applyIOSBackgroundFix = () => {
    // Find all elements with background images and fixed attachment
    const elementsWithBg = document.querySelectorAll('[style*="background"]');
    
    elementsWithBg.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const style = htmlElement.style;
      
      if (style.backgroundAttachment === 'fixed') {
        // Remove fixed attachment and add iOS-specific class
        style.backgroundAttachment = 'scroll';
        htmlElement.classList.add('fixed-bg', 'parallax-bg');
      }
    });
  };

  return (
    <div 
      className={`main-wrapper min-h-screen bg-white font-sans transition-opacity duration-500 ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      } ${isIOS ? 'ios-optimized ios-viewport-fix' : ''}`}
      style={{
        // Enhanced iOS viewport fix
        minHeight: isIOS ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
        height: isIOS ? 'calc(var(--vh, 1vh) * 100)' : 'auto'
      }}
    >
      {showAnnouncement && <AnnouncementBar onClose={() => setShowAnnouncement(false)} />}
      <Navbar activeSection={activeSection} />
      <main className={isIOS ? 'ios-main-content' : ''}>
        <Hero />
        <AboutSection />
        <BookingSection />
        <ServicesSection />
        <TestimonialsSection />
        <InstagramFeed />
        <Gallery />
      </main>
      <Footer />
      <MobileCtaButton />
      <ScrollToTop />
    </div>
  );
}