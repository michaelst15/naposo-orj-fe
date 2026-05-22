import React from "react";
import { InstagramLogo, TwitterLogo, YoutubeLogo, MapPin, Envelope } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-black mt-20 animate-fade-up" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-yellow border-2 border-black rounded-lg flex items-center justify-center">
                <span className="text-xs font-black">N.ORJ</span>
              </div>
              <span className="text-xl font-black tracking-tight">NAPOSO ORJ</span>
            </div>
            <p className="text-sm font-medium text-[#404040] leading-relaxed">
              Perkumpulan anak muda yang berdedikasi untuk membuat perubahan positif dalam masyarakat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={20} weight="bold" className="mt-0.5" />
                <span className="text-sm font-medium">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-start gap-2">
                <Envelope size={20} weight="bold" className="mt-0.5" />
                <span className="text-sm font-medium">info@naposo.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Ikuti Kami</h3>
            <div className="flex gap-3">
              <a
                href="#"
                data-testid="social-instagram"
                className="w-10 h-10 bg-pastel-lavender border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 transition-transform duration-150"
              >
                <InstagramLogo size={20} weight="bold" />
              </a>
              <a
                href="#"
                data-testid="social-twitter"
                className="w-10 h-10 bg-pastel-blue border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 transition-transform duration-150"
              >
                <TwitterLogo size={20} weight="bold" />
              </a>
              <a
                href="#"
                data-testid="social-youtube"
                className="w-10 h-10 bg-pastel-peach border-2 border-black rounded-lg flex items-center justify-center hover:-translate-y-1 transition-transform duration-150"
              >
                <YoutubeLogo size={20} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-2 border-black text-center">
          <p className="text-sm font-bold uppercase tracking-wider">© 2026 Naposo ORJ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
