import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@phosphor-icons/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API = (BACKEND_URL ? `${BACKEND_URL}`.replace(/\/$/, "") : "") + "/api";

const Pengurus = () => {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPengurus();
  }, []);

  const fetchPengurus = async () => {
    try {
      const response = await axios.get(`${API}/pengurus`);
      setPengurus(response.data);
    } catch (error) {
      console.error("Error fetching pengurus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12" data-testid="pengurus-page">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-pastel-lavender border-2 border-black rounded-full mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Tim Kami</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">PENGURUS NAPOSO ORJ</h1>
          <p className="text-base md:text-lg font-medium text-[#404040] max-w-2xl mx-auto">
            Berkenalan dengan orang-orang hebat yang memimpin dan menggerakkan komunitas kami
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="font-bold">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pengurus.map((person, index) => {
              const bgColors = [
                "bg-pastel-yellow",
                "bg-pastel-mint",
                "bg-pastel-lavender",
                "bg-pastel-peach",
                "bg-pastel-blue"
              ];
              const bgColor = bgColors[index % bgColors.length];

              return (
                <div key={person.id} className="neo-card neo-card-hover overflow-hidden" data-testid="pengurus-card">
                  <div className={`${bgColor} border-b-2 border-black p-8 flex justify-center`}>
                    <img
                      src={person.foto}
                      alt={person.nama}
                      className="w-32 h-32 rounded-full border-4 border-black object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <div className="inline-block px-3 py-1 bg-black text-white rounded-full mb-3">
                      <span className="text-xs font-black uppercase">{person.posisi}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{person.nama}</h3>
                    <p className="text-sm font-medium text-[#404040]">{person.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && pengurus.length === 0 && (
          <div className="text-center py-12">
            <User size={64} weight="bold" className="mx-auto mb-4 text-[#404040]" />
            <p className="text-lg font-bold text-[#404040]">Belum ada data pengurus</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pengurus;
