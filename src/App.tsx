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
    // iOS detection
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
    console.log('iOS detected:', iosDetected, 'User Agent:', navigator.userAgent);

    // Viewport height handling
    const setVH = () => {
      try {
        const vh = window.innerHeight * 0.01;
        const safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0');
        const safeAreaBottom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0');
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--full-height', `calc(${window.innerHeight}px + ${safeAreaTop + safeAreaBottom}px)`);
      } catch (e) {
        console.error('setVH failed:', e);
      }
    };

    setVH();

    // iOS-specific background
    if (iosDetected) {
      document.body.classList.add('ios-device');
      document.documentElement.classList.add('ios-device');
      createIOSBackground();

      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          setVH();
          createIOSBackground();
        }, 100);
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
        clearTimeout(resizeTimeout);
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
      const existingBg = document.getElementById('ios-fixed-background');
      if (existingBg) existingBg.remove();

      const backgroundDiv = document.createElement('div');
      backgroundDiv.id = 'ios-fixed-background';
      backgroundDiv.style.cssText = `
        position: fixed;
        top: calc(-1 * env(safe-area-inset-top));
        left: 0;
        width: 100vw;
        height: calc(100vh + env(safe-area-inset-top) + env(safe-area-inset-bottom));
        background-image: url('https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1000;
        pointer-events: none;
        will-change: transform;
        -webkit-transform: translateZ(0);
      `;

      document.body.prepend(backgroundDiv); // Prepend to ensure it's behind content

      // Ensure sections are transparent
      requestAnimationFrame(() => {
        document.querySelectorAll('section:not(#hero)').forEach(section => {
          const element = section as HTMLElement;
          element.style.backgroundImage = 'none';
          element.style.backgroundColor = 'transparent';
          element.classList.add('ios-transparent-bg');
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
      } ${isIOS ? 'ios-optimized bg-transparent' : 'bg-transparent'}`}
      style={{
        minHeight: isIOS ? 'calc(var(--vh, 1vh) * 100 + env(safe-area-inset-top) + env(safe-area-inset-bottom))' : '100vh',
      }}
    >
      {showAnnouncement && <AnnouncementBar onClose={() => setShowAnnouncement(false)} />}
      <Navbar activeSection={activeSection} />
      <main className={isIOS ? 'ios-main-content bg-transparent' : ''}>
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