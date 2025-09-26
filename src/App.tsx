import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import { BunkBeds } from "./pages/BunkBeds";
import { LoftBeds } from "./pages/LoftBeds";
import { SingleBeds } from "./pages/SingleBeds";
import { DressersStorage } from "./pages/DressersStorage";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bunk-beds" element={<BunkBeds />} />
            <Route path="/loft-beds" element={<LoftBeds />} />
            <Route path="/single-beds" element={<SingleBeds />} />
            <Route path="/dressers-storage" element={<DressersStorage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
