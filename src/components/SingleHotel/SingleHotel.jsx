import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelsProvider';

function SingleHotel() {

  // SET USEPARAMS FOR ACCESS TO PARAMS...
  const {id} = useParams();

    // USE CUSTOMHOOK USEHOTELS FOR CHAIN SINGLEHOTELS TO CONTEXT...
  const {currentHotel, getHotel, isLoaderCurrentHotel} = useHotels();
  
  useEffect(()=>{
    getHotel(id)
  } ,[id])

   
  if(isLoaderCurrentHotel || !currentHotel) return <Loader/>

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div className="room__review-location">
          {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
        </div>
        <img src={currentHotel.picture_url?.url} alt="" />
      </div>
    </div>
  )
}

export default SingleHotel;
 