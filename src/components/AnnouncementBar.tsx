import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

interface AnnouncementBarProps {
  onClose: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full bg-[#D4AF37] text-white py-2 px-4 transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1"></div>
        <p className="text-center flex-grow text-sm md:text-base font-medium">
          Now accepting bookings for December 🎉
        </p>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={handleClose} 
            className="focus:outline-none hover:bg-white/10 rounded-full p-1 transition-colors duration-200" 
            aria-label="Close announcement"
          >
            <XIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;