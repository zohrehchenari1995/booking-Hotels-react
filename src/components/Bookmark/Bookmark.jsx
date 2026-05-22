import React from 'react'
import { Outlet } from 'react-router-dom';
import Map from "../Map/Map";

function Bookmark() {
  return (
    <div className="hotels__content-search  container-header">
      <Map markerLocation={[]}/>

      <div className="all__hotels">
        {/* <Outlet /> */}
        <div>bookmark list</div>
      </div>
    </div>
  );
}

export default Bookmark;