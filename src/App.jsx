import React, { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Introduction from "@/components/Introduction";
import Home from "@/pages/Home";
import Pengurus from "@/pages/Pengurus";
import Aktivitas from "@/pages/Aktivitas";
import Naposo from "@/pages/Naposo";
import Galeri from "@/pages/Galeri";
import Daftar from "@/pages/Daftar";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <Cursor />
      {showIntro ? (
        <Introduction onDone={() => setShowIntro(false)} />
      ) : (
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pengurus" element={<Pengurus />} />
              <Route path="/aktivitas" element={<Aktivitas />} />
              <Route path="/naposo" element={<Naposo />} />
              <Route path="/galeri" element={<Galeri />} />
              <Route path="/daftar" element={<Daftar />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
