import { Button } from '@/components/ui/button';
import heroBedroom from '@/assets/hero-bedroom.jpg';

export const HeroSection = () => {
  return (
    <section 
      className="relative h-[600px] md:h-[700px] flex items-end"
      style={{
        backgroundImage: `url(${heroBedroom})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Content - positioned bottom left */}
      <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-2xl">
        <p className="text-sm md:text-base font-semibold tracking-wider text-white mb-3 uppercase">
          Spark Joy & Imagination
        </p>
        <h1 className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight">
          With Savings up to 60% Off!
        </h1>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            className="bg-white text-gray-800 border-white hover:bg-gray-100 rounded-full px-8 py-3 text-sm font-medium"
          >
            shop sale
          </Button>
          <Button 
            className="bg-gray-800 text-white hover:bg-gray-900 rounded-full px-8 py-3 text-sm font-medium"
          >
            shop best sellers
          </Button>
        </div>
      </div>
    </section>
  );
};