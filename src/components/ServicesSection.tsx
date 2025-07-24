import React, { memo } from 'react';
import { GlassesIcon, UsersIcon, UtensilsIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:-translate-y-2">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${image})`,
          filter: 'brightness(0.6)',
          transition: 'all 0.5s ease'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray to-transparent opacity-80"></div>
      <div className="relative p-6 h-full flex flex-col justify-end text-white z-10">
        <div className="text-[#D4AF37] mb-3 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [{
    title: 'Chef to Cook in Front of You',
    description: 'Experience the art of culinary excellence with our skilled chefs preparing your meal right before your eyes.',
    icon: <UtensilsIcon size={36} />,
    image: "/481567058_1494042031533671_6717338563522538866_n.jpg"
  }, {
    title: 'Private Party Bookings',
    description: 'Celebrate special occasions in an exclusive setting with personalized service and complete privacy.',
    icon: <GlassesIcon size={36} />,
    image: "/480738701_1494041901533684_5740182246678582737_n.jpg"
  }, {
    title: 'Family Gatherings',
    description: 'Create unforgettable memories with your loved ones in our spacious venue with activities for all ages.',
    icon: <UsersIcon size={36} />,
    image: "/481013879_1494042044867003_1282551399797111651_n.jpg"
  }, {
    title: 'Gourmet Dining Experience',
    description: 'Indulge in exquisite local and international cuisine prepared with the freshest ingredients.',
    icon: <UtensilsIcon size={36} />,
    image: "/481766282_1494041804867027_157446153368238963_n.jpg"
  }];

  return (
    <section 
      id="services" 
      className="relative py-20 -mt-20"
      style={{
        backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 -bottom-px bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with glassmorphism card */}
        <div className="text-center mb-16">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-[#D4AF37] bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Signature Experiences
            </h2>
            <p className="text-gray-800 max-w-2xl mx-auto font-medium [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
              Discover our exclusive services designed to make your event truly special and memorable.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              image={service.image}
            />
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
    </section>
  );
};

export default ServicesSection;