import React, { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | null>(null);

  const galleryImages: GalleryImage[] = [{
    src: "/480738701_1494041901533684_5740182246678582737_n.jpg",
    alt: 'Outdoor dining area with string lights and palm trees',
    caption: 'Our enchanting outdoor dining area with string lights and palm trees'
  }, {
    src: "/481013879_1494042044867003_1282551399797111651_n.jpg",
    alt: 'Lounge area with day beds and umbrellas',
    caption: 'Relaxing lounge area with comfortable day beds and umbrellas'
  }, {
    src: "/481567058_1494042031533671_6717338563522538866_n.jpg",
    alt: 'Covered dining area with woven lamps by the beach',
    caption: 'Our covered dining pavilion with handcrafted woven lamps and ocean views'
  }, {
    src: "/481766282_1494041804867027_157446153368238963_n.jpg",
    alt: 'Outdoor dining area with vine-covered building',
    caption: 'Intimate dining setting alongside our signature vine-covered building'
  }, {
    src: "/481902010_1494041864867021_945020548305668325_n.jpg",
    alt: 'Sunbeds with umbrellas and thatched roof buildings',
    caption: 'Premium sunbeds with umbrellas for relaxation and events'
  }, {
    src: "/480738701_1494041901533684_5740182246678582737_n.jpg",
    alt: 'Outdoor seating area with umbrellas',
    caption: 'Our spacious outdoor dining area with comfortable seating'
  }, {
    src: "/481085185_1494042191533655_1871612545809202609_n.jpg",
    alt: 'Evening dining setup with string lights',
    caption: 'Magical evening ambiance with ambient lighting'
  }, {
    src: "/481473857_1494041874867020_5683826004319178607_n.jpg",
    alt: 'Beachside dining pavilion',
    caption: 'Oceanfront pavilion perfect for sunset dinners'
  }, {
    src: "/unnamed.webp",
    alt: 'Fresh seafood dish',
    caption: "Chef's special: locally caught seafood"
  }];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsImageLoading(true);
    setAnimationDirection('next');
    setCurrentImage(prev => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsImageLoading(true);
    setAnimationDirection('prev');
    setCurrentImage(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      switch (e.key) {
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <section 
      id="gallery" 
      className="relative py-20 -mt-20"
      style={{
        backgroundImage: `url(/480738701_1494041901533684_5740182246678582737_n.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with glassmorphism card */}
        <div className="text-center mb-12">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-[#D4AF37] bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Explore Our Venue
            </h2>
          </div>
        </div>

        {/* Gallery grid with glassmorphism container */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/20 backdrop-blur-sm border border-white/30 group relative"
                onClick={() => openLightbox(index)}
                tabIndex={0}
                role="button"
                aria-label={`View ${image.alt}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#D4AF37]/5 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-700"></div>

      {/* Lightbox with glassmorphism */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300" 
          onClick={closeLightbox} 
          role="dialog" 
          aria-modal="true" 
          aria-label="Image gallery lightbox"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <div className="relative overflow-hidden bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <img 
                src={galleryImages[currentImage].src} 
                alt={galleryImages[currentImage].alt} 
                className={`max-h-[80vh] max-w-full mx-auto object-contain transition-all duration-300 ${
                  isImageLoading ? 'opacity-0' : 'opacity-100'
                } ${
                  animationDirection === 'next' ? 'animate-slide-in-right' : 
                  animationDirection === 'prev' ? 'animate-slide-in-left' : ''
                }`}
                onLoad={handleImageLoad}
              />
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-t-[#D4AF37] border-gray-200 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Caption with glassmorphism */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-md text-white p-4 text-center border-t border-white/30 rounded-b-2xl">
              <p className="line-clamp-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                {galleryImages[currentImage].caption}
              </p>
              <div className="mt-2 text-sm text-gray-300">
                {currentImage + 1} / {galleryImages.length}
              </div>
            </div>
            
            {/* Navigation buttons with glassmorphism */}
            <button 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2 border border-white/30 transition-all duration-300" 
              onClick={closeLightbox} 
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/30 transition-all duration-300" 
              onClick={prevImage} 
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/30 transition-all duration-300" 
              onClick={nextImage} 
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;