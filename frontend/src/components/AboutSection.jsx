import React from "react";
import { CheckCircle2, Award, Clock, Shield } from "lucide-react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Events Completed" },
  { value: "50", label: "States Served" },
  { value: "100%", label: "Client Satisfaction" },
];

const features = [
  {
    icon: Award,
    title: "Industry Expertise",
    description:
      "Extensive experience across trade shows, conventions, concerts, and private events.",
  },
  {
    icon: Clock,
    title: "Reliable & Punctual",
    description:
      "On-time setup and breakdown. Your timeline is my priority.",
  },
  {
    icon: Shield,
    title: "Security Cleared",
    description:
      "Experienced with high-security events and confidential requirements.",
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
              Professional Event
              <br />
              Technology Expert
            </h2>
            <p className="font-body text-zinc-400 leading-relaxed mb-8">
              I'm an independent event technology specialist with over 15 years
              of experience in the industry. From massive trade shows to
              intimate private events, I bring the technical expertise and
              professional reliability you need to make your event a success.
            </p>
            <p className="font-body text-zinc-400 leading-relaxed mb-8">
              My services include complete stage production, video wall setup
              and management, audio engineering, and full technical direction.
              I travel nationwide and am equipped to handle events of any scale.
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
