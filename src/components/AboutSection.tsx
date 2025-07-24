import React, { memo, useEffect, useState } from 'react';
import { Calendar, MapPin, Star, Users } from 'lucide-react';

const AboutSection = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Simple iOS detection
    const detectIOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /ipad|iphone|ipod/.test(userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
             /safari/.test(userAgent) && /mobile/.test(userAgent);
    };

    setIsIOS(detectIOS());
  }, []);

  const features = [{
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: 'Premium Experience',
    description: 'Luxurious beachside venue with high-end amenities and personalized service'
  }, {
    icon: <Users className="h-6 w-6 text-yellow-500" />,
    title: 'Capacity',
    description: 'Accommodates up to 120 guests for private events and celebrations'
  }, {
    icon: <MapPin className="h-6 w-6 text-yellow-500" />,
    title: 'Prime Location',
    description: 'Situated on the stunning Hiriketiya Beach with panoramic ocean views'
  }, {
    icon: <Calendar className="h-6 w-6 text-yellow-500" />,
    title: 'Year-Round Events',
    description: 'Perfect tropical climate allows for exceptional events in any season'
  }];

  const images = [
    {
      src: "/481567058_1494042031533671_6717338563522538866_n.jpg",
      alt: "The Ruin's beachfront view",
      transform: isIOS ? "" : "translate-y-6 rotate-2"
    },
    {
      src: "/481766282_1494041804867027_157446153368238963_n.jpg", 
      alt: "The Ruin's dining area",
      transform: isIOS ? "" : "-translate-y-4 -rotate-1"
    },
    {
      src: "/481902010_1494041864867021_945020548305668325_n.jpg",
      alt: "The Ruin's lounge area", 
      transform: isIOS ? "" : "translate-y-8 rotate-1"
    },
    {
      src: "/481013879_1494042044867003_1282551399797111651_n.jpg",
      alt: "The Ruin's outdoor seating",
      transform: isIOS ? "" : "translate-y-2 -rotate-2"
    }
  ];

  // Conditional styles based on device
  const sectionStyle = isIOS ? {
    // For iOS: Use transparent background, rely on fixed background element
    backgroundColor: 'transparent'
  } : {
    // For other devices: Use normal parallax background
    backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  return (
    <section 
      id="about" 
      className={`relative py-20 ${isIOS ? 'ios-section ios-transparent-bg' : ''}`}
      style={sectionStyle}
    >
      {/* Glassmorphism overlay - adjusted for iOS */}
      <div className={`absolute inset-0 backdrop-blur-sm ${
        isIOS 
          ? 'bg-white/15' 
          : 'bg-gradient-to-br from-white/20 via-white/15 to-white/10'
      }`}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with glassmorphism card */}
        <div className="text-center mb-16">
          <div className={`backdrop-blur-lg rounded-3xl p-8 shadow-2xl border max-w-4xl mx-auto ${
            isIOS 
              ? 'bg-white/30 border-white/40' 
              : 'bg-white/40 border-white/50'
          }`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-yellow-600 bg-clip-text text-transparent ${
              isIOS ? 'drop-shadow-lg' : '[text-shadow:0_2px_4px_rgba(0,0,0,0.3)]'
            }`}>
              About The Ruin
            </h2>
            <p className={`text-gray-800 max-w-3xl mx-auto font-medium ${
              isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
            }`}>
              A tropical paradise venue where memories are made and celebrations
              come to life
            </p>
          </div>
        </div>

        {/* Main content with glassmorphism cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Story section with glassmorphism */}
            <div className={`backdrop-blur-lg p-8 rounded-3xl shadow-2xl border mb-8 ${
              isIOS 
                ? 'bg-white/30 border-white/40' 
                : 'bg-white/40 border-white/50'
            }`}>
              <h3 className={`text-2xl font-semibold mb-4 text-gray-900 ${
                isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
              }`}>
                Our Story
              </h3>
              <p className={`text-gray-800 mb-6 ${
                isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
              }`}>
                Nestled on the pristine shores of Hiriketiya Beach, The Ruin is
                Sri Lanka's premier beachfront venue for unforgettable events.
                What was once an abandoned colonial structure has been
                thoughtfully transformed into a luxurious tropical paradise while
                preserving its historic charm and character.
              </p>
              <p className={`text-gray-800 mb-8 ${
                isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
              }`}>
                Since opening our doors in 2018, we've hosted hundreds of
                memorable events from intimate family gatherings to lavish
                celebrations. Our dedicated team combines exceptional service with
                breathtaking surroundings to create experiences that exceed
                expectations.
              </p>
            </div>

            {/* Features with glassmorphism cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                    isIOS 
                      ? 'bg-white/25 border-white/35 hover:bg-white/35' 
                      : 'bg-white/30 border-white/40 hover:bg-white/40 hover:scale-105 hover:shadow-2xl'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`mt-1 mr-4 backdrop-blur-sm rounded-full p-2 ${
                      isIOS ? 'bg-white/25' : 'bg-white/30'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className={`font-medium text-lg text-gray-900 ${
                        isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
                      }`}>
                        {feature.title}
                      </h4>
                      <p className={`text-gray-800 text-sm ${
                        isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Image gallery with glassmorphism frames */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-6 p-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`
                  relative h-64 md:h-80 overflow-hidden rounded-3xl shadow-2xl 
                  border border-white/30 backdrop-blur-md
                  group cursor-pointer
                  ${isIOS 
                    ? 'bg-white/10 hover:bg-white/15 transition-all duration-300' 
                    : `bg-white/10 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-3 hover:shadow-3xl ${image.transform}`
                  }
                `}
                style={isIOS ? {} : {
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(255, 255, 255, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3)
                  `
                }}
              >
                {/* Enhanced glassmorphism overlay */}
                <div className={`absolute inset-0 pointer-events-none ${
                  isIOS 
                    ? 'bg-white/10' 
                    : 'bg-gradient-to-br from-white/15 via-transparent to-black/10'
                }`}></div>
                
                {/* Image */}
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className={`w-full h-full object-cover ${
                    isIOS 
                      ? 'transition-opacity duration-300 group-hover:opacity-90' 
                      : 'transition-transform duration-700 group-hover:scale-110'
                  }`}
                />
                
                {/* Multiple gradient overlays for depth */}
                <div className={`absolute inset-0 ${
                  isIOS 
                    ? 'bg-black/20' 
                    : 'bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-70'
                }`}></div>
                {!isIOS && (
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/20"></div>
                )}
                
                {/* Shimmer effect on hover - disabled on iOS for performance */}
                {!isIOS && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                )}
                
                {/* Enhanced border glow */}
                <div className={`absolute inset-0 rounded-3xl border transition-all duration-300 ${
                  isIOS 
                    ? 'border-white/30 group-hover:border-white/50' 
                    : 'border-white/40 group-hover:border-white/60'
                }`}></div>
                
                {/* Inner highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
                
                {/* Corner accent - simplified for iOS */}
                {!isIOS && (
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics with glassmorphism cards */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className={`backdrop-blur-lg p-6 rounded-2xl shadow-2xl border transition-all duration-300 ${
            isIOS 
              ? 'bg-white/30 border-white/40 hover:bg-white/40' 
              : 'bg-white/40 border-white/50 hover:bg-white/50 hover:scale-105 hover:shadow-3xl'
          }`}>
            <div className="text-4xl font-bold text-yellow-600 mb-2 drop-shadow-lg">5+</div>
            <div className={`text-gray-800 font-medium ${
              isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
            }`}>Years of Experience</div>
          </div>
          <div className={`backdrop-blur-lg p-6 rounded-2xl shadow-2xl border transition-all duration-300 ${
            isIOS 
              ? 'bg-white/30 border-white/40 hover:bg-white/40' 
              : 'bg-white/40 border-white/50 hover:bg-white/50 hover:scale-105 hover:shadow-3xl'
          }`}>
            <div className="text-4xl font-bold text-yellow-600 mb-2 drop-shadow-lg">500+</div>
            <div className={`text-gray-800 font-medium ${
              isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
            }`}>Events Hosted</div>
          </div>
          <div className={`backdrop-blur-lg p-6 rounded-2xl shadow-2xl border transition-all duration-300 ${
            isIOS 
              ? 'bg-white/30 border-white/40 hover:bg-white/40' 
              : 'bg-white/40 border-white/50 hover:bg-white/50 hover:scale-105 hover:shadow-3xl'
          }`}>
            <div className="text-4xl font-bold text-yellow-600 mb-2 drop-shadow-lg">12K+</div>
            <div className={`text-gray-800 font-medium ${
              isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
            }`}>Happy Guests</div>
          </div>
          <div className={`backdrop-blur-lg p-6 rounded-2xl shadow-2xl border transition-all duration-300 ${
            isIOS 
              ? 'bg-white/30 border-white/40 hover:bg-white/40' 
              : 'bg-white/40 border-white/50 hover:bg-white/50 hover:scale-105 hover:shadow-3xl'
          }`}>
            <div className="text-4xl font-bold text-yellow-600 mb-2 drop-shadow-lg">4.9</div>
            <div className={`text-gray-800 font-medium ${
              isIOS ? 'drop-shadow-sm' : '[text-shadow:0_1px_2px_rgba(255,255,255,0.8)]'
            }`}>Average Rating</div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements - simplified for iOS */}
      {isIOS ? (
        <>
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl opacity-50"></div>
        </>
      ) : (
        <>
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
        </>
      )}
    </section>
  );
};

export default AboutSection;