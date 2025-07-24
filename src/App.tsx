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
  useEffect(() => {
    // Set page as loaded after a small delay for animation purposes
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    const handleScroll = () => {
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  return <div className={`min-h-screen bg-white font-sans transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {showAnnouncement && <AnnouncementBar onClose={() => setShowAnnouncement(false)} />}
      <Navbar activeSection={activeSection} />
      <main>
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
    </div>;
}