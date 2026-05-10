import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="hotels__content-search  container-header">
      <div className="hotels__map">
        <img src="/images/room1.avif" alt="" />
      </div> 

      <div className="all__hotels">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
