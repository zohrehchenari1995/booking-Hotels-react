import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelsProvider";

function AppLayout() {
  const {hotels} = useHotels();
  return (
    <div className="hotels__content-search  container-header">
      <Map markerLocation={hotels}/>

      <div className="all__hotels">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
