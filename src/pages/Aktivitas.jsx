import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarBlank, Clock } from "@phosphor-icons/react";
import { normalizeList } from "@/api/normalize";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API = (BACKEND_URL ? `${BACKEND_URL}`.replace(/\/$/, "") : "") + "/api";

const Aktivitas = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [filter]);

  const fetchActivities = async () => {
    try {
      const url = filter === "all" ? `${API}/activities` : `${API}/activities?status=${filter}`;
      const response = await axios.get(url);
      setActivities(normalizeList(response.data));
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12" data-testid="aktivitas-page">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-pastel-peach border-2 border-black rounded-full mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Kegiatan</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">AKTIVITAS KAMI</h1>
          <p className="text-base md:text-lg font-medium text-[#404040] max-w-2xl mx-auto">
            Berbagai kegiatan seru dan bermanfaat yang telah dan akan kami laksanakan
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter("all")}
            data-testid="filter-all"
            className={`px-6 py-2 font-bold text-sm rounded-full border-2 border-black transition-all duration-150 ${
              filter === "all"
                ? "bg-pastel-yellow shadow-[3px_3px_0px_0px_rgba(23,23,23,1)]"
                : "bg-white hover:bg-pastel-mint"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            data-testid="filter-upcoming"
            className={`px-6 py-2 font-bold text-sm rounded-full border-2 border-black transition-all duration-150 ${
              filter === "upcoming"
                ? "bg-pastel-yellow shadow-[3px_3px_0px_0px_rgba(23,23,23,1)]"
                : "bg-white hover:bg-pastel-mint"
            }`}
          >
            Mendatang
          </button>
          <button
            onClick={() => setFilter("past")}
            data-testid="filter-past"
            className={`px-6 py-2 font-bold text-sm rounded-full border-2 border-black transition-all duration-150 ${
              filter === "past"
                ? "bg-pastel-yellow shadow-[3px_3px_0px_0px_rgba(23,23,23,1)]"
                : "bg-white hover:bg-pastel-mint"
            }`}
          >
            Sudah Lewat
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="font-bold">Loading...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const bgColors = [
                "bg-pastel-mint",
                "bg-pastel-lavender",
                "bg-pastel-peach",
                "bg-pastel-blue",
                "bg-pastel-yellow"
              ];
              const bgColor = bgColors[index % bgColors.length];

              return (
                <div
                  key={activity.id}
                  className="neo-card neo-card-hover grid grid-cols-1 md:grid-cols-12 overflow-hidden"
                  data-testid="activity-item"
                >
                  <div
                    className={`${bgColor} border-b-2 md:border-b-0 md:border-r-2 border-black col-span-12 md:col-span-3 p-6 flex flex-col justify-center items-center text-center`}
                  >
                    <CalendarBlank size={32} weight="bold" className="mb-2" />
                    <p className="text-2xl font-black">{activity.tanggal}</p>
                    <div className="mt-2 px-3 py-1 bg-black text-white rounded-full">
                      <span className="text-xs font-black uppercase">
                        {activity.status === "upcoming" ? "Mendatang" : "Selesai"}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-3">{activity.judul}</h3>
                      <p className="text-base font-medium text-[#404040] leading-relaxed">{activity.deskripsi}</p>
                    </div>
                    <div className="border-t-2 md:border-t-0 md:border-l-2 border-black">
                      <img
                        src={activity.gambar}
                        alt={activity.judul}
                        className="w-full h-full object-cover min-h-[200px]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && activities.length === 0 && (
          <div className="text-center py-12">
            <Clock size={64} weight="bold" className="mx-auto mb-4 text-[#404040]" />
            <p className="text-lg font-bold text-[#404040]">Belum ada aktivitas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aktivitas;
