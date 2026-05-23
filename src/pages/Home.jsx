import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { ArrowRight, Users, CalendarDots, Sparkle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { normalizeList } from "@/api/normalize";
import { API_BASE } from "@/api/client";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    seedData();
  }, []);

  const seedData = async () => {
    try {
      await axios.post(`${API_BASE}/seed`);
    } catch (error) {
      console.log("Seed data might already exist");
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_BASE}/activities?status=upcoming`);
      setActivities(normalizeList(response.data).slice(0, 3));
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      <div className="bg-black text-white py-3 border-b-2 border-black">
        <Marquee speed={50}>
          <span className="text-sm font-black uppercase tracking-widest mx-8">GABUNG BERSAMA KAMI</span>
          <span className="text-sm font-black uppercase tracking-widest mx-8">•</span>
          <span className="text-sm font-black uppercase tracking-widest mx-8">NAPOSO ORJ</span>
          <span className="text-sm font-black uppercase tracking-widest mx-8">•</span>
          <span className="text-sm font-black uppercase tracking-widest mx-8">BUAT PERUBAHAN POSITIF</span>
          <span className="text-sm font-black uppercase tracking-widest mx-8">•</span>
        </Marquee>
      </div>

      <section className="relative overflow-hidden bg-[#FAFAF9] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 animate-fade-up">
              <div className="inline-block px-4 py-2 bg-pastel-mint border-2 border-black rounded-full mb-6">
                <span className="text-xs font-black uppercase tracking-widest">Youth Community</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
                NAPOSO
                <br />
                <span
                  className="text-pastel-yellow tracking-[0.12em] sm:tracking-tighter"
                  style={{ WebkitTextStroke: "2px black" }}
                >
                  ORJ Lumban Tobing
                </span>
              </h1>

              <p className="text-base md:text-lg font-medium leading-relaxed text-[#404040] mb-8 max-w-md">
                Perkumpulan anak muda yang berdedikasi untuk membuat perubahan positif dalam masyarakat melalui
                kolaborasi, kreativitas, dan aksi nyata.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/daftar" data-testid="hero-join-button">
                  <button className="neo-button flex items-center gap-2">
                    <span>Gabung Sekarang</span>
                    <ArrowRight size={20} weight="bold" />
                  </button>
                </Link>
                <Link to="/naposo" data-testid="hero-explore-button">
                  <button className="neo-button bg-white hover:bg-pastel-lavender">Lihat Anggota</button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in [animation-delay:120ms]">
              <img
                src="https://static.prod-images.emergentagent.com/jobs/457adcd7-99c9-4c94-b0a5-b30bfd01c084/images/9e0f056c9609bed7abe5501f4f7b79ab446405e5ef2f9385bf304f229da125f0.png"
                alt="Youth Community"
                className="w-full rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(23,23,23,1)]"
              />
            </div>
          </div>
        </div>

        <img
          src="https://static.prod-images.emergentagent.com/jobs/457adcd7-99c9-4c94-b0a5-b30bfd01c084/images/ce615eb4b7984d0fd9fb10a3c54c5916a0acdf031fe6b8ee6ba17c1c8ae147b9.png"
          alt=""
          className="sticker-float hidden lg:block top-10 right-10 w-32 h-32 opacity-60 animate-float"
        />
      </section>

      <section className="py-12 bg-white border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 bg-pastel-yellow text-center animate-fade-up">
              <Users size={40} weight="bold" className="mx-auto mb-3" />
              <h3 className="text-4xl font-black mb-2">50+</h3>
              <p className="text-sm font-bold uppercase tracking-wide">Anggota Aktif</p>
            </div>
            <div className="neo-card p-6 bg-pastel-mint text-center animate-fade-up [animation-delay:120ms]">
              <CalendarDots size={40} weight="bold" className="mx-auto mb-3" />
              <h3 className="text-4xl font-black mb-2">25+</h3>
              <p className="text-sm font-bold uppercase tracking-wide">Event Terlaksana</p>
            </div>
            <div className="neo-card p-6 bg-pastel-lavender text-center animate-fade-up [animation-delay:240ms]">
              <Sparkle size={40} weight="bold" className="mx-auto mb-3" />
              <h3 className="text-4xl font-black mb-2">3+</h3>
              <p className="text-sm font-bold uppercase tracking-wide">Tahun Berdiri</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Tentang Kami</h2>
          <p className="text-base md:text-lg font-medium leading-relaxed text-[#404040] mb-8">
            Naposo ORJ adalah perkumpulan anak muda yang percaya bahwa setiap orang memiliki potensi untuk membuat
            perbedaan. Melalui berbagai kegiatan sosial, workshop, dan kolaborasi, kami menciptakan ruang bagi
            generasi muda untuk berkembang, belajar, dan berkontribusi kepada masyarakat.
          </p>
          <Link to="/pengurus" data-testid="about-team-button">
            <button className="neo-button">Kenali Tim Kami</button>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Aktivitas Mendatang</h2>
              <p className="text-base font-medium text-[#404040]">Jangan lewatkan event seru kami!</p>
            </div>
            <Link to="/aktivitas" data-testid="view-all-activities-button">
              <button className="neo-button hidden md:block">Lihat Semua</button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="font-bold">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div key={activity.id} className="neo-card neo-card-hover" data-testid="activity-card">
                  <img src={activity.gambar} alt={activity.judul} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-pastel-peach border-2 border-black rounded-full mb-3">
                      <span className="text-xs font-black uppercase">{activity.tanggal}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{activity.judul}</h3>
                    <p className="text-sm font-medium text-[#404040]">{activity.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/aktivitas">
              <button className="neo-button">Lihat Semua Aktivitas</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-pastel-yellow border-y-2 border-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Siap Bergabung?</h2>
          <p className="text-base md:text-lg font-medium leading-relaxed mb-8">
            Mari bersama-sama membuat perubahan positif dalam masyarakat. Daftar sekarang dan jadilah bagian dari
            komunitas kami!
          </p>
          <Link to="/daftar" data-testid="cta-register-button">
            <button className="neo-button text-lg px-8 py-4">Daftar Sekarang</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
