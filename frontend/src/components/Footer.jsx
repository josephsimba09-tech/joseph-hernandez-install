import React from "react";
import { Mic2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="bg-[#050505] border-t border-white/5 py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border border-blue-500/50 text-blue-500">
              <Mic2 className="w-5 h-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-wider uppercase text-white">
              Pro AV Tech
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-8">
            <a
              href="#services"
              className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#about"
              className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-mono text-xs tracking-[0.1em] text-zinc-600">
              SERVING NATIONWIDE
            </p>
            <p className="font-mono text-xs tracking-[0.1em] text-zinc-600 mt-1">
              © {currentYear} PRO AV TECH. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
