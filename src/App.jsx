import React, { useState } from "react";
import "@/App.css";
import { BrowserRouter } from "react-router-dom";
import Cursor from "@/components/Cursor";
import Introduction from "@/components/Introduction";
import AppShell from "@/components/AppShell";

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
            <AppShell />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
