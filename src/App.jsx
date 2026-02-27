import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import Hotels from "./components/Hotels/Hotels";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      {/* all route............ */}
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </div>
  );
}

export default App;
