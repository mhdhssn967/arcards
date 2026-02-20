import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </div>
  );
};

export default App;