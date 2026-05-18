import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader';

function SingleHotel() {

  // SET USEPARAMS FOR ACCESS TO PARAMS...
  const {id} = useParams();
  const {data, isLoader}= useFetch(`http://localhost:5000/hotels/${id}`);

  if(isLoader) return <Loader/>
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div className="room__review-location">
          {data.number_of_reviews} reviews &bull; {data.smart_location}
        </div>
        <img src={data.picture_url?.url} alt="" />
      </div>
    </div>
  )
}

export default SingleHotel;