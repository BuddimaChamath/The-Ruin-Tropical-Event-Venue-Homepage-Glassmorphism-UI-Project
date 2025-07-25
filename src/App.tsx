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
    // Improved iOS detection
    const detectIOS = () => {
      try {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOSUserAgent = /ipad|iphone|ipod/.test(userAgent);
        const isIPadPro = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
        const isSafariMobile = /safari/.test(userAgent) && /mobile/.test(userAgent);
        const isIOSNew = navigator.platform === 'MacIntel' && 'ontouchend' in document;
        return isIOSUserAgent || isIPadPro || isSafariMobile || isIOSNew;
      } catch (e) {
        console.error('iOS detection failed:', e);
        return false;
      }
    };

    const iosDetected = detectIOS();
    setIsIOS(iosDetected);
    console.log('iOS detected:', iosDetected);

    // Viewport height handling
    const setVH = () => {
      try {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        if (iosDetected) {
          // For iOS, also set a custom property for full height
          document.documentElement.style.setProperty('--ios-height', `${window.innerHeight}px`);
        }
      } catch (e) {
        console.error('setVH failed:', e);
      }
    };

    setVH();

    // iOS-specific setup
    if (iosDetected) {
      document.body.classList.add('ios-device');
      document.documentElement.classList.add('ios-device');
      
      // Create simplified iOS background
      createIOSBackground();

      const handleResize = () => {
        setVH();
        // Recreate background on resize for iOS
        setTimeout(createIOSBackground, 100);
      };

      const handleOrientationChange = () => {
        setTimeout(() => {
          setVH();
          createIOSBackground();
        }, 500);
      };

      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleOrientationChange);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }

    // Page load animation
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    // Section scroll tracking
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

  const createIOSBackground = () => {
    try {
      // Remove existing background
      const existingBg = document.getElementById('ios-fixed-background');
      if (existingBg) existingBg.remove();

      // Create new background element
      const backgroundDiv = document.createElement('div');
      backgroundDiv.id = 'ios-fixed-background';
      backgroundDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        z-index: -100;
        pointer-events: none;
        will-change: auto;
      `;

      // Insert as first child of body
      document.body.insertBefore(backgroundDiv, document.body.firstChild);
      
      console.log('iOS background created successfully');

      // Ensure all sections are transparent
      requestAnimationFrame(() => {
        const allSections = document.querySelectorAll('section, footer, main');
        allSections.forEach(section => {
          const element = section as HTMLElement;
          element.style.backgroundImage = 'none';
          element.style.backgroundColor = 'transparent';
        });
      });
    } catch (e) {
      console.error('createIOSBackground failed:', e);
    }
  };

  return (
    <div 
      className={`main-wrapper min-h-screen font-sans transition-opacity duration-500 ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      } ${isIOS ? 'ios-optimized' : ''}`}
      style={{
        minHeight: isIOS ? 'var(--ios-height, 100vh)' : '100vh',
        position: 'relative',
        zIndex: 1,
        backgroundColor: isIOS ? 'transparent' : undefined
      }}
    >
      {showAnnouncement && <AnnouncementBar onClose={() => setShowAnnouncement(false)} />}
      <Navbar activeSection={activeSection} />
      <main 
        className={isIOS ? 'ios-main-content' : ''}
        style={{ 
          position: 'relative', 
          zIndex: 2,
          backgroundColor: 'transparent'
        }}
      >
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