import React from "react";
import { Hammer, Box, Layout, MapPin, Wrench, Building2 } from "lucide-react";

const services = [
  {
    title: "Booth Construction",
    description:
      "Expert installation and construction of trade show booths of all sizes. Custom builds, modular systems, and complex multi-level structures.",
    icon: Hammer,
    span: "md:col-span-2",
  },
  {
    title: "Exhibits & Displays",
    description:
      "Professional setup of exhibits, product displays, and branded environments that make your presence stand out.",
    icon: Box,
    span: "md:col-span-1",
  },
  {
    title: "Fixtures & Signage",
    description:
      "Installation of fixtures, banners, hanging signs, and structural elements with precision and safety compliance.",
    icon: Layout,
    span: "md:col-span-1",
  },
  {
    title: "Trade Shows & Conventions",
    description:
      "Full I&D services for trade shows, conventions, and corporate events. From setup to strike, handled professionally and on schedule.",
    icon: MapPin,
    span: "md:col-span-2",
  },
  {
    title: "Dismantle & Strike",
    description:
      "Efficient and careful teardown services. Proper packing, labeling, and preparation for shipping or storage.",
    icon: Wrench,
    span: "md:col-span-1",
  },
  {
    title: "Corporate Events",
    description:
      "Installation services for corporate meetings, product launches, conferences, and special events requiring professional setup.",
    icon: Building2,
    span: "md:col-span-2",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="section-padding bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-4 block">
            What I Do
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white">
            Services
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                data-testid={`service-card-${index}`}
                className={`service-card group relative overflow-hidden bg-zinc-900/50 border border-white/5 p-8 ${service.span}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-12 h-12 flex items-center justify-center border border-blue-500/30 text-blue-500 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-wide uppercase text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
