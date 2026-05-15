import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function AppLayout() {
  return (
    <div className="hotels__content-search  container-header">
      <Map/>

      <div className="all__hotels">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
