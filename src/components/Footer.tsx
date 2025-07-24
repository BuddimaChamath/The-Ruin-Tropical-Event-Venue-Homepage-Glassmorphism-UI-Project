import React, { useState } from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer 
      className="relative pt-16 pb-8 overflow-hidden"
      style={{
        backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Updated glassmorphism overlay to match navbar */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 w-fit mb-4">
              <img 
                src="/ruin.png" 
                alt="The Ruin Logo" 
                className="h-12 transition-transform duration-300 hover:scale-105 drop-shadow-lg" 
              />
            </div>
            <p className="text-white mb-6 text-sm leading-relaxed font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
              An exclusive tropical venue for unforgettable events in the heart
              of Hiriketiya, Sri Lanka.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/theruin.hiriketiya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#D4AF37] transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 hover:bg-white/20 hover:border-[#D4AF37]/50 shadow-lg hover:scale-105" 
                aria-label="Instagram"
              >
                <Instagram className="drop-shadow-lg" size={20} />
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#D4AF37] transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 hover:bg-white/20 hover:border-[#D4AF37]/50 shadow-lg hover:scale-105" 
                aria-label="Facebook"
              >
                <Facebook className="drop-shadow-lg" size={20} />
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37] [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 mr-3 mt-1">
                  <MapPin className="flex-shrink-0 text-[#D4AF37] drop-shadow-lg" size={16} />
                </div>
                <span className="text-white text-sm font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Hiriketiya Beach Road, Dickwella, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 mr-3">
                  <Phone className="flex-shrink-0 text-[#D4AF37] drop-shadow-lg" size={16} />
                </div>
                <span className="text-white text-sm font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">+94 77 123 4567</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 mr-3">
                  <Mail className="flex-shrink-0 text-[#D4AF37] drop-shadow-lg" size={16} />
                </div>
                <span className="text-white text-sm font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">info@theruin.lk</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37] [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-white text-sm">
                <span className="font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Monday - Thursday</span>
                <span className="text-[#D4AF37] font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">11:00 - 22:00</span>
              </li>
              <li className="flex justify-between text-white text-sm">
                <span className="font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Friday - Saturday</span>
                <span className="text-[#D4AF37] font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between text-white text-sm">
                <span className="font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Sunday</span>
                <span className="text-[#D4AF37] font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">11:00 - 21:00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37] [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Newsletter</h3>
            <p className="text-white mb-4 text-sm leading-relaxed font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
              Subscribe to receive updates on special events and offers.
            </p>
            <div className="flex">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Your email" 
                  className="w-full py-2 pl-4 pr-10 rounded-l-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 transition-all duration-300 text-sm font-medium" 
                  required 
                />
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="absolute right-0 top-0 bottom-0 px-3 bg-[#D4AF37] rounded-r-lg flex items-center justify-center hover:bg-[#D4AF37]/90 transition-all duration-300 shadow-lg hover:scale-105" 
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} className="text-white drop-shadow-lg" />
                </button>
              </div>
            </div>
            {subscribed && (
              <p className="text-green-400 mt-2 text-sm font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-12 pt-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 text-center">
            <p className="text-white text-sm font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
              &copy; {new Date().getFullYear()} The Ruin Hiriketiya. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
    </footer>
  );
};

export default Footer;