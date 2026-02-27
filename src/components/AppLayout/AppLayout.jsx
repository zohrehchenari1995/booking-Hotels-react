import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="hotels__content-search  container-header">
      <div className="hotels__map">
        <img src="/images/room1.avif" alt="" />
      </div>

      <div className="all__hotels">

        <Outlet/>
        {/* <div className="hotels__item item__one">
          <img src="/public/images/room2.avif" alt="" />

          <div className="hotels__description">
            <p className="hotels__location">locaton</p>
            <p className="hotels__name">name</p>
            <p className="hotels__price">€price</p>
          </div>
        </div> */}

         {/* <div className="hotels__item item__one">
          <img src="/public/images/room2.avif" alt="" />
          
          <div className="hotels__description">
            <p className="hotels__location">locaton</p>
            <p className="hotels__name">name</p>
            <p className="hotels__price">€price</p>
          </div>
        </div> */}
      </div>

    </div>
  );
}

export default AppLayout;
