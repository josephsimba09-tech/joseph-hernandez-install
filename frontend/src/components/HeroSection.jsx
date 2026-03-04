import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin } from "lucide-react";

const HeroSection = ({ onBookClick }) => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      data-testid="hero-section"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1767969456717-5d0cdf1f1c18?crop=entropy&cs=srgb&fm=jpg&q=85')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Availability Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <Badge
            data-testid="availability-badge"
            className="glass-effect px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase text-zinc-300 border-white/10 rounded-full"
          >
            <Truck className="w-4 h-4 mr-2" />
            Union Local 1175 • Available Nationwide
          </Badge>
        </div>

        {/* Main Heading */}
        <h1
          data-testid="hero-heading"
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-6 animate-fade-in-up animation-delay-100"
        >
          Trade Show & Events{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            I&D Specialist
          </span>
        </h1>

        {/* Service Tags */}
        <p
          data-testid="hero-services"
          className="font-body text-base md:text-lg text-zinc-400 tracking-wide mb-10 animate-fade-in-up animation-delay-200"
        >
          Booth Construction • Exhibits • Fixtures • Displays • Installation & Dismantle
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
          <Button
            data-testid="book-services-btn"
            onClick={onBookClick}
            className="btn-primary px-8 py-4 text-sm h-auto"
          >
            Book Services
          </Button>
          <Button
            data-testid="view-portfolio-btn"
            onClick={scrollToPortfolio}
            variant="outline"
            className="btn-secondary px-8 py-4 text-sm h-auto"
          >
            View Portfolio
          </Button>
        </div>

        {/* Location indicator */}
        <div className="flex items-center justify-center gap-2 mt-12 text-zinc-500 text-sm animate-fade-in-up animation-delay-400">
          <MapPin className="w-4 h-4" />
          <span className="font-mono tracking-wider">
            SERVING ALL 50 STATES
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-600 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
