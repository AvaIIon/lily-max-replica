import { Button } from '@/components/ui/button';
import heroBedroom from '@/assets/hero-bedroom.jpg';

export const HeroSection = () => {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${heroBedroom})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <p className="text-lg mb-4 opacity-90">FALLING IN LOVE WITH THEIR ROOM</p>
        <h1 className="text-6xl font-bold mb-8 leading-tight">
          CREATE A SPACE THEY<br />
          CAN'T WAIT TO SHOW OFF
        </h1>
        <Button variant="cta" size="lg" className="text-lg px-12 py-6 rounded-full">
          Shop Now
        </Button>
      </div>
    </section>
  );
};