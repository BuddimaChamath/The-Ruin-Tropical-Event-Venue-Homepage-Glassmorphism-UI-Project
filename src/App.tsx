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
    // More reliable iOS detection
    const detectIOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOSDevice = /ipad|iphone|ipod/.test(userAgent) || 
                         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      const isWebKit = 'WebkitAppearance' in document.documentElement.style;
      
      return isIOSDevice || (isSafari && isWebKit);
    };

    const iosDetected = detectIOS();
    setIsIOS(iosDetected);

    // Enhanced viewport height handling for iOS
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--full-height', `${window.innerHeight}px`);
    };

    // iOS-specific setup
    if (iosDetected) {
      document.body.classList.add('ios-device');
      document.documentElement.classList.add('ios-device');
      
      setVH();
      
      // Handle viewport changes
      const handleResize = () => {
        setVH();
        // Force repaint to fix background issues
        document.body.style.transform = 'translateZ(0)';
        requestAnimationFrame(() => {
          document.body.style.transform = '';
        });
      };

      const handleOrientationChange = () => {
        setTimeout(() => {
          setVH();
          // Force background refresh
          const sections = document.querySelectorAll('section[style*="background-image"]');
          sections.forEach(section => {
            const element = section as HTMLElement;
            const currentBg = element.style.backgroundImage;
            element.style.backgroundImage = '';
            requestAnimationFrame(() => {
              element.style.backgroundImage = currentBg;
            });
          });
        }, 300);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }

    // Set page as loaded
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      
      // Apply iOS fixes after page load
      if (iosDetected) {
        applyIOSBackgroundFix();
      }
    }, 100);

    // Section scroll tracking
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

    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleSectionScroll);
      clearTimeout(timer);
    };
  }, []);

  // Enhanced iOS background fix
  const applyIOSBackgroundFix = () => {
    const backgroundImage = 'https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg';
    
    // Create a fixed background element for iOS
    const fixedBg = document.createElement('div');
    fixedBg.id = 'ios-fixed-background';
    fixedBg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${backgroundImage});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: -999;
      will-change: transform;
      transform: translateZ(0);
    `;
    
    // Remove existing fixed background if it exists
    const existingBg = document.getElementById('ios-fixed-background');
    if (existingBg) {
      existingBg.remove();
    }
    
    document.body.appendChild(fixedBg);
    
    // Update all sections to use transparent backgrounds on iOS
    const sections = document.querySelectorAll('section[style*="background-image"]');
    sections.forEach(section => {
      const element = section as HTMLElement;
      element.style.backgroundImage = 'none';
      element.classList.add('ios-transparent-bg');
    });
  };

  return (
    <div 
      className={`main-wrapper min-h-screen bg-white font-sans transition-opacity duration-500 ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      } ${isIOS ? 'ios-optimized ios-viewport-fix' : ''}`}
      style={{
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