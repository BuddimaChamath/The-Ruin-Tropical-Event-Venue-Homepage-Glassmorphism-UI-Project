import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const testimonials: Testimonial[] = [{
    quote: "The Ruin provided the perfect backdrop for our anniversary. The ambiance, service, and food were all exceptional. We couldn't have asked for a more magical evening.",
    name: 'Sarah & Michael',
    role: 'Anniversary Celebration',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }, {
    quote: 'Hosting our corporate retreat at The Ruin was a game-changer. The tropical setting inspired creativity, and the staff went above and beyond to accommodate our needs.',
    name: 'David Chen',
    role: 'Corporate Event',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }, {
    quote: 'Our family gathering at The Ruin was unforgettable. The children loved the space to play, and the adults enjoyed the serene atmosphere and exceptional cuisine.',
    name: 'The Rodriguez Family',
    role: 'Family Day',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }];

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(next, 5000);
      return () => clearInterval(interval);
    }
  }, [current, isPaused]);

  return (
    <section 
      id="testimonials"
      className="relative py-20 -mt-20 -my-28"
      style={{
        backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 -bottom-px bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm"></div>
      <div className="absolute inset-0"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className='bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 max-w-4xl mx-auto'>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-[#D4AF37] bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              What Our Guests Say
            </h2>
          </div>
        </div>

        <div 
          className="relative max-w-4xl mx-auto px-4 md:px-12" 
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{
                transform: `translateX(-${current * 100}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-2 md:px-6">
                  <div className="bg-white/40 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-white/50 hover:bg-white/50 transition-all duration-300 h-80 md:h-64">
                    <div className="flex flex-col md:flex-row items-center h-full">
                      <div className="md:w-1/3 mb-6 md:mb-0 md:pr-10">
                        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/60 shadow-xl mx-auto backdrop-blur-sm">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 flex-1 flex flex-col justify-center">
                        <div className="relative">
                          {/* Quote marks */}
                          <div className="absolute -top-2 -left-2 text-4xl text-[#D4AF37]/30 font-serif">"</div>
                          <p className="text-gray-700 italic mb-6 text-base md:text-lg leading-relaxed pl-4 [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
                            {testimonial.quote}
                          </p>
                          <div className="border-t border-white/30 pt-4">
                            <p className="font-bold text-gray-800 text-lg [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-600 text-sm mt-1 [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Arrows - Hidden on mobile */}
          <button 
            onClick={prev} 
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 bg-white/50 backdrop-blur-md rounded-full p-3 shadow-2xl border border-white/40 hover:bg-white/70 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30" 
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-gray-700 h-5 w-5" />
          </button>

          <button 
            onClick={next} 
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 bg-white/50 backdrop-blur-md rounded-full p-3 shadow-2xl border border-white/40 hover:bg-white/70 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30" 
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-gray-700 h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrent(index)} 
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === current 
                    ? 'bg-[#D4AF37] shadow-lg scale-110' 
                    : 'bg-white/40 hover:bg-white/60 backdrop-blur-sm'
                }`} 
                aria-label={`Go to testimonial ${index + 1}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;