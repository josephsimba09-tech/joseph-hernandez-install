import React from "react";

const portfolioItems = [
  {
    image:
      "https://images.unsplash.com/photo-1618613403887-ed08ea9f8f6e?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Corporate Convention",
    category: "Stage Design",
  },
  {
    image:
      "https://images.pexels.com/photos/34625039/pexels-photo-34625039.jpeg",
    title: "Music Festival",
    category: "Full Production",
  },
  {
    image:
      "https://images.unsplash.com/photo-1702329203800-27c16b559276?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Trade Show Booth",
    category: "Video Walls",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573283807132-f7b218208690?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Audio Engineering",
    category: "Technical Direction",
  },
  {
    image:
      "https://images.unsplash.com/photo-1653998894571-ae645e479e86?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "LED Wall Setup",
    category: "Video Production",
  },
  {
    image:
      "https://images.unsplash.com/photo-1767969456717-5d0cdf1f1c18?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Concert Production",
    category: "Stage & Lighting",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="section-padding bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-4 block">
            Recent Work
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white">
            Portfolio
          </h2>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              data-testid={`portfolio-item-${index}`}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="portfolio-image w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500" />

              {/* Content (visible on hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-2">
                  {item.category}
                </span>
                <h3 className="font-heading text-2xl font-bold tracking-wide uppercase text-white">
                  {item.title}
                </h3>
              </div>

              {/* Border accent */}
              <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
