import React from "react";
import { Award, Clock, Users, Wrench } from "lucide-react";

const stats = [
  { value: "Local", label: "Union 1175" },
  { value: "50", label: "States Served" },
  { value: "100%", label: "Reliability" },
  { value: "24/7", label: "Availability" },
];

const features = [
  {
    icon: Award,
    title: "Union Certified",
    description:
      "Member of Local 1175 and affiliates. Professional standards and safety compliance.",
  },
  {
    icon: Clock,
    title: "Reliable & On Schedule",
    description:
      "On-time installation and dismantle. Your timeline is my priority.",
  },
  {
    icon: Users,
    title: "Industry Connections",
    description:
      "Affiliated with Eagle, Show Link, Momentum, Alliance, MC², Expo, ERP, and more.",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="section-padding bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-4 block">
              About
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight uppercase text-white mb-6">
              Joseph Hernandez
              <br />
              I&D Specialist
            </h2>
            <p className="font-body text-zinc-400 leading-relaxed mb-8">
              I'm an experienced Installation & Dismantle technician specializing 
              in trade shows, conventions, and corporate events. I build booths, 
              exhibits, fixtures, displays, and all types of structures for events 
              across the country.
            </p>
            <p className="font-body text-zinc-400 leading-relaxed mb-8">
              As a member of Local Union 1175 and its affiliates, I bring professional 
              standards and reliability to every job. I work with top companies including 
              Eagle, Show Link, Momentum, Alliance, MC², Expo, ERP, and more.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    data-testid={`about-feature-${index}`}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-blue-500/30 text-blue-500 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="font-body text-sm text-zinc-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-testid={`stat-${index}`}
                className="glass-effect p-8 text-center"
              >
                <div className="font-heading text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
