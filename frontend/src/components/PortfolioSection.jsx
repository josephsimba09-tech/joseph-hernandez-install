import React from "react";

const portfolioItems = [
  {
    image:
      "https://images.unsplash.com/photo-1767096600257-8089136850c5?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Convention Center Setup",
    category: "Trade Show",
  },
  {
    image:
      "https://images.unsplash.com/photo-1760001551764-14eddf965019?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Exhibition Hall",
    category: "Convention",
  },
  {
    image:
      "https://images.unsplash.com/photo-1662593614056-f3514348b0d5?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Large Scale Event",
    category: "Expo Setup",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Corporate Conference",
    category: "Booth Installation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Product Display",
    category: "Exhibit Build",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=srgb&fm=jpg&q=85",
    title: "Event Production",
    category: "Full I&D",
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
