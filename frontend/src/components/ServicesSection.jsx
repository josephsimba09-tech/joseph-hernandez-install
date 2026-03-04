import React from "react";
import { Mic2, MonitorPlay, Users, MapPin, ShieldCheck, Settings } from "lucide-react";

const services = [
  {
    title: "Stage Production",
    description:
      "Full-scale stage design and construction for conventions, concerts, and corporate events. Custom builds to your exact specifications.",
    icon: Mic2,
    span: "md:col-span-2",
  },
  {
    title: "Video Walls",
    description:
      "High-resolution LED wall configuration, setup, and real-time management for maximum visual impact.",
    icon: MonitorPlay,
    span: "md:col-span-1",
  },
  {
    title: "Corporate & Private",
    description:
      "Discreet, professional technical support for VIP events, private functions, and executive presentations.",
    icon: Users,
    span: "md:col-span-1",
  },
  {
    title: "Trade Shows & Conventions",
    description:
      "Complete booth setup, AV integration, networking infrastructure, and on-site technical direction for your trade show presence.",
    icon: MapPin,
    span: "md:col-span-2",
  },
  {
    title: "High Security Events",
    description:
      "Specialized technical services for security-sensitive events requiring confidential handling and clearance protocols.",
    icon: ShieldCheck,
    span: "md:col-span-1",
  },
  {
    title: "Technical Direction",
    description:
      "End-to-end event technical management from planning through execution. Your single point of contact for all AV needs.",
    icon: Settings,
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
