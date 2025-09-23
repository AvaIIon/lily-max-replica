import { SaleBanner } from '@/components/SaleBanner';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SleepSolutions } from '@/components/SleepSolutions';
import { TrendingProducts } from '@/components/TrendingProducts';
import { Features } from '@/components/Features';
import { RoomShowcase } from '@/components/RoomShowcase';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SaleBanner />
      <Header />
      <HeroSection />
      <SleepSolutions />
      <TrendingProducts />
      <Features />
      <RoomShowcase />
    </div>
  );
};

export default Index;
