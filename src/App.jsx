import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Bookmark from "./components/Bookmark/Bookmark";


function App() {
  return (
   <HotelsProvider>
      <Toaster />
      <Header />
      {/* all route............ */}
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout /> }>
          <Route index element={<Hotels />} />
          <Route
            path=":id"
            element={<SingleHotel/> }
          />
        </Route>
        <Route path="/bookmark" element={<Bookmark/>}/>
      </Routes>
 </HotelsProvider>
  );
}

export default App;


