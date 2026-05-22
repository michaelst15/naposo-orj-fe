import React, { useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlass, Users, Funnel } from "@phosphor-icons/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API = (BACKEND_URL ? `${BACKEND_URL}`.replace(/\/$/, "") : "") + "/api";

const Naposo = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAngkatan, setFilterAngkatan] = useState("");
  const [filterPosisi, setFilterPosisi] = useState("");
  const [angkatanList, setAngkatanList] = useState([]);
  const [posisiList, setPosisiList] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [members, searchTerm, filterAngkatan, filterPosisi]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API}/members`);
      setMembers(response.data);

      const angkatans = [...new Set(response.data.map((m) => m.angkatan))];
      const posisis = [...new Set(response.data.map((m) => m.posisi))];
      setAngkatanList(angkatans);
      setPosisiList(posisis);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...members];

    if (searchTerm) {
      filtered = filtered.filter((member) => member.nama.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterAngkatan) {
      filtered = filtered.filter((member) => member.angkatan === filterAngkatan);
    }

    if (filterPosisi) {
      filtered = filtered.filter((member) => member.posisi === filterPosisi);
    }

    setFilteredMembers(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterAngkatan("");
    setFilterPosisi("");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12" data-testid="naposo-page">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-pastel-blue border-2 border-black rounded-full mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Anggota</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">DIREKTORI NAPOSO ORJ</h1>
          <p className="text-base md:text-lg font-medium text-[#404040] max-w-2xl mx-auto">
            Temukan dan terhubung dengan anggota komunitas kami
          </p>
        </div>

        <div className="neo-card p-6 mb-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label className="block text-xs font-black uppercase tracking-wider mb-2">
                <MagnifyingGlass size={16} weight="bold" className="inline mr-1" />
                Cari Nama
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ketik nama..."
                data-testid="search-input"
                className="neo-input w-full"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase tracking-wider mb-2">
                <Funnel size={16} weight="bold" className="inline mr-1" />
                Angkatan
              </label>
              <select
                value={filterAngkatan}
                onChange={(e) => setFilterAngkatan(e.target.value)}
                data-testid="filter-angkatan"
                className="neo-input w-full"
              >
                <option value="">Semua</option>
                {angkatanList.map((angkatan) => (
                  <option key={angkatan} value={angkatan}>
                    {angkatan}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase tracking-wider mb-2">
                <Funnel size={16} weight="bold" className="inline mr-1" />
                Posisi
              </label>
              <select
                value={filterPosisi}
                onChange={(e) => setFilterPosisi(e.target.value)}
                data-testid="filter-posisi"
                className="neo-input w-full"
              >
                <option value="">Semua</option>
                {posisiList.map((posisi) => (
                  <option key={posisi} value={posisi}>
                    {posisi}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                onClick={resetFilters}
                data-testid="reset-filters"
                className="neo-button w-full bg-pastel-peach text-xs px-3"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <p className="text-sm font-bold">
              Menampilkan {filteredMembers.length} dari {members.length} anggota
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="font-bold">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => {
              const bgColors = [
                "bg-pastel-yellow",
                "bg-pastel-mint",
                "bg-pastel-lavender",
                "bg-pastel-peach",
                "bg-pastel-blue"
              ];
              const bgColor = bgColors[index % bgColors.length];

              return (
                <div key={member.id} className="neo-card neo-card-hover overflow-hidden" data-testid="member-card">
                  <div className={`${bgColor} border-b-2 border-black p-6 flex justify-center`}>
                    <img
                      src={member.foto}
                      alt={member.nama}
                      className="w-24 h-24 rounded-full border-4 border-black object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold mb-1">{member.nama}</h3>
                    <div className="flex justify-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-black text-white rounded text-xs font-bold">
                        {member.angkatan}
                      </span>
                      <span className="inline-block px-2 py-1 bg-pastel-mint border border-black rounded text-xs font-bold">
                        {member.posisi}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#404040] mb-2">{member.bio}</p>
                    <p className="text-xs font-bold text-[#171717]">{member.kontak}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users size={64} weight="bold" className="mx-auto mb-4 text-[#404040]" />
            <p className="text-lg font-bold text-[#404040] mb-2">Tidak ada anggota yang ditemukan</p>
            <button onClick={resetFilters} className="neo-button mt-4">
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Naposo;
