import React from 'react';
import { InstagramIcon } from 'lucide-react';

interface InstagramPostProps {
  image: string;
  likes: number;
  caption: string;
}

const InstagramPost: React.FC<InstagramPostProps> = ({
  image,
  likes,
  caption
}) => {
  return (
    <a 
      href="https://www.instagram.com/theruin.hiriketiya" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl bg-white/20 backdrop-blur-sm border border-white/30"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={caption} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center ">
        <div className="opacity-0 group-hover:opacity-100 text-white text-center transition-opacity duration-300 p-4">
          <div className="flex items-center justify-center mb-2">
            <InstagramIcon className="mr-2" size={20} />
            <span className="font-medium [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">{likes} likes</span>
          </div>
          <p className="text-sm line-clamp-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">{caption}</p>
        </div>
      </div>
    </a>
  );
};

const InstagramFeed = () => {
  const instagramPosts = [
    {
      image: "/480738701_1494041901533684_5740182246678582737_n.jpg",
      likes: 124,
      caption: 'Perfect evening at The Ruin #tropicalparadise #srilanka'
    },
    {
      image: "/481013879_1494042044867003_1282551399797111651_n.jpg",
      likes: 98,
      caption: 'Sunset lounging under the palm trees #hiriketiya #luxuryexperience'
    },
    {
      image: "/481567058_1494042031533671_6717338563522538866_n.jpg",
      likes: 156,
      caption: 'Beachside dining with our signature woven lamps #srilankanvibes'
    },
    {
      image: "/481902010_1494041864867021_945020548305668325_n.jpg",
      likes: 87,
      caption: 'Our premium lounge area is ready for your next event #specialoccasions #beachside'
    }
  ];

  return (
    <section 
      className="relative py-20 "
      style={{
        backgroundImage: `url(https://uploadthingy.s3.us-west-1.amazonaws.com/q2Cv5K93wFYPkqzZ35hSAd/480738701_1494041901533684_5740182246678582737_n.jpg)`,
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
              Follow Our Journey
            </h2>
            <a 
              href="https://www.instagram.com/theruin.hiriketiya" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-gray-800 hover:text-[#D4AF37] transition-colors duration-300 font-medium [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]"
            >
              <InstagramIcon className="mr-2" />
              @theruin.hiriketiya
            </a>
          </div>
        </div>

        {/* Instagram grid with glassmorphism container */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <InstagramPost 
                key={index} 
                image={post.image} 
                likes={post.likes} 
                caption={post.caption} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#D4AF37]/5 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-700"></div>
    </section>
  );
};

export default InstagramFeed;