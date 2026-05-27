import React, { useEffect } from "react";
import { usebookmark } from "../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark,isLoadingCurrentBookmark ,currentBookmark} = usebookmark(id);
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);


 const handleBack = (e)=>{
    navigate(-1)
  }

if(isLoadingCurrentBookmark || !currentBookmark) return  <Loader/>
  return(
     <div>
      <button onClick={handleBack}    className="btn btn--back"> &larr; BACK</button>
      <div className="BookmarkItem">
        <ReactCountryFlag  svg  countryCode={currentBookmark.countryCode}/>
                  &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp; <span>{currentBookmark.country}</span>

      </div>
  </div>
  )
  
}

export default SingleBookmark;
