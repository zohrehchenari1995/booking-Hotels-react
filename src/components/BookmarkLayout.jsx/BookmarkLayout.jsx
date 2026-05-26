import React from 'react'
import { Outlet } from 'react-router-dom';
import Map from "../Map/Map";
import { usebookmark } from '../context/BookmarkListContext';

function BookmarkLayout() {
  const {bookmarks} = usebookmark(); 
  return (
    <div className="hotels__content-search  container-header">
      <Map markerLocation={bookmarks}/>

      <div className="all__hotels">
        <Outlet />
      </div>
    </div>
  );
}

export default BookmarkLayout;