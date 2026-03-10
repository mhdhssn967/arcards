import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import Navbar from "./components/Navbar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;