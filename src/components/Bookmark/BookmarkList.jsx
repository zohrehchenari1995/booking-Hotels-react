import React from 'react'
import { usebookmark } from '../context/BookmarkListContext'
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';

function BookmarkList() {
  const {isLoader, bookmarks ,currentBookmark} = usebookmark();

  if(isLoader) return <Loader/>
  return (
    <div>
      <h2>Bookmark list</h2>
   
      <div className="bookmarkList">
        {bookmarks.map((item)=>{
            return (
            <Link key={item.id}    to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
            <div  className={`BookmarkItem ${item.id === currentBookmark?.id ? "current-bookmark" : ""}`}>
              <ReactCountryFlag  svg  countryCode={item.countryCode}/>
              &nbsp; <strong>{item.cityName}</strong> &nbsp; <span>{item.country}</span>
            </div>
            </Link>
       ) })}
      </div>
     
    </div>
  )
} 

export default BookmarkList ;