import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImagesSquare } from "@phosphor-icons/react";
import { normalizeList } from "@/api/normalize";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API = (BACKEND_URL ? `${BACKEND_URL}`.replace(/\/$/, "") : "") + "/api";

const Galeri = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setItems(normalizeList(response.data));
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12" data-testid="galeri-page">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-pastel-mint border-2 border-black rounded-full mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Galeri</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">MOMEN KAMI</h1>
          <p className="text-base md:text-lg font-medium text-[#404040] max-w-2xl mx-auto">
            Dokumentasi kegiatan dan kebersamaan Naposo ORJ
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="font-bold">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const bgColors = [
                "bg-pastel-yellow",
                "bg-pastel-mint",
                "bg-pastel-lavender",
                "bg-pastel-peach",
                "bg-pastel-blue"
              ];
              const bgColor = bgColors[index % bgColors.length];

              return (
                <div key={item.id} className="neo-card neo-card-hover overflow-hidden" data-testid="gallery-card">
                  <div className={`${bgColor} border-b-2 border-black p-4`}>
                    <div className="inline-block px-3 py-1 bg-black text-white rounded-full">
                      <span className="text-xs font-black uppercase">{item.tanggal}</span>
                    </div>
                  </div>
                  <img src={item.gambar} alt={item.judul} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.judul}</h3>
                    <p className="text-sm font-medium text-[#404040]">{item.deskripsi}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-12">
            <ImagesSquare size={64} weight="bold" className="mx-auto mb-4 text-[#404040]" />
            <p className="text-lg font-bold text-[#404040]">Belum ada foto di galeri</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Galeri;
