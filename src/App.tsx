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
    // Simplified and more reliable iOS detection
    const detectIOS = () => {
      // Check user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOSUserAgent = /ipad|iphone|ipod/.test(userAgent);
      
      // Check for iPad Pro (which reports as MacIntel)
      const isIPadPro = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
      
      // Check for Safari on macOS (which might be iOS in disguise)
      const isSafariMobile = /safari/.test(userAgent) && /mobile/.test(userAgent);
      
      // Additional iOS 13+ detection
      const isIOSNew = navigator.platform === 'MacIntel' && 'ontouchend' in document;
      
      return isIOSUserAgent || isIPadPro || isSafariMobile || isIOSNew;
    };

    const iosDetected = detectIOS();
    setIsIOS(iosDetected);
    
    console.log('iOS detected:', iosDetected); // Debug log

    // Enhanced viewport height handling
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--full-height', `${window.innerHeight}px`);
    };

    setVH();

    // iOS-specific setup
    if (iosDetected) {
      document.body.classList.add('ios-device');
      document.documentElement.classList.add('ios-device');
      
      // Create a single fixed background for all sections
      createIOSBackground();
      
      // Handle viewport changes with debouncing
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          setVH();
        }, 100);
      };

      const handleOrientationChange = () => {
        setTimeout(() => {
          setVH();
          // Refresh background after orientation change
          createIOSBackground();
        }, 500);
      };

      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleOrientationChange);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        clearTimeout(resizeTimeout);
      };
    }

    // Set page as loaded
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    // Section scroll tracking (simplified)
    const handleSectionScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionId = sectionElement.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '');
        }
      });
    };

    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleSectionScroll);
      clearTimeout(timer);
    };
  }, []);

  // Simplified iOS background creation
  const createIOSBackground = () => {
    // Remove existing background
    const existingBg = document.getElementById('ios-fixed-background');
    if (existingBg) {
      existingBg.remove();
    }
    
    // Create new background element
    const backgroundDiv = document.createElement('div');
    backgroundDiv.id = 'ios-fixed-background';
    backgroundDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-image: url('https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: -1000;
      pointer-events: none;
    `;
    
    document.body.appendChild(backgroundDiv);
    
    // Force all sections to use transparent backgrounds
    requestAnimationFrame(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const element = section as HTMLElement;
        if (element.style.backgroundImage) {
          element.style.backgroundImage = 'none';
          element.classList.add('ios-transparent-bg');
        }
      });
    });
  };

  return (
    <div 
      className={`main-wrapper min-h-screen bg-white font-sans transition-opacity duration-500 ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      } ${isIOS ? 'ios-optimized' : ''}`}
      style={{
        minHeight: isIOS ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
        backgroundColor: isIOS ? 'transparent' : 'white'
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