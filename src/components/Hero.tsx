import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Simplified iOS detection
    const detectIOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /ipad|iphone|ipod/.test(userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
             /safari/.test(userAgent) && /mobile/.test(userAgent);
    };

    const iosDetected = detectIOS();
    setIsIOS(iosDetected);

    // Animate content in
    if (textRef.current && buttonRef.current) {
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.classList.add('opacity-100', 'translate-y-0');
        }
      }, 200);
      
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.add('opacity-100', 'translate-y-0');
        }
      }, 600);
      
      // Only add parallax on non-iOS devices
      if (!iosDetected) {
        const handleScroll = () => {
          if (containerRef.current) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            containerRef.current.style.transform = `translateY(${parallax}px)`;
          }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Conditional styles based on device
  const sectionStyle = isIOS ? {
    // iOS: Use transparent background, rely on fixed background
    minHeight: 'calc(var(--vh, 1vh) * 100)',
    backgroundColor: 'transparent',
    position: 'relative' as const
  } : {
    // Other devices: Use parallax background
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' as const,
    minHeight: '100vh'
  };

  return (
    <section 
      id="hero" 
      className={`relative w-full flex items-center justify-center text-white overflow-hidden ${isIOS ? 'ios-hero' : ''}`}
      style={sectionStyle}
    >
      {/* iOS-specific overlay */}
      {isIOS && (
        <div 
          className="absolute inset-0 bg-black/30"
          style={{ zIndex: -1 }}
        />
      )}
      
      {/* Non-iOS overlay */}
      {!isIOS && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      )}
      
      {/* Content container */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 z-10 text-center relative"
      >
        {/* Main content with glassmorphism card */}
        <div className={`backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border max-w-4xl mx-auto ${
          isIOS 
            ? 'bg-white/20 border-white/30' 
            : 'bg-black/20 border-white/20'
        }`}>
          <div 
            ref={textRef} 
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
          >
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-yellow-400 bg-clip-text text-transparent ${
              isIOS ? 'drop-shadow-2xl' : '[text-shadow:0_0_40px_rgba(255,255,255,0.3)]'
            }`}>
              Book Your Perfect Day at The Ruin
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white leading-relaxed ${
              isIOS ? 'drop-shadow-lg' : '[text-shadow:0_2px_10px_rgba(0,0,0,0.8)]'
            }`}>
              An exclusive tropical venue in Hiriketiya, Sri Lanka for
              unforgettable events
            </p>
          </div>
          
          <button 
            ref={buttonRef} 
            onClick={scrollToBooking} 
            className={`bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 opacity-0 translate-y-10 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-yellow-500/30 group relative overflow-hidden ${
              isIOS ? 'text-shadow-sm' : '[text-shadow:0_2px_4px_rgba(0,0,0,0.5)]'
            }`}
          >
            <span className="relative z-10">Request a Quote</span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
        
        {/* Simplified decorative elements for iOS */}
        {isIOS ? (
          <>
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-50"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl opacity-50"></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;