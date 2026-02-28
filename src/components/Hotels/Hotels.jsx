import React from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader';

function Hotels() {
  const [serachparams, setSearchparams] = useSearchParams();
  const destination = serachparams.get("destination");
  const room = JSON.parse(serachparams.get("options"))?.room;

  const {data, isLoader} = useFetch("http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room|| 1}`
  ); 
  if(isLoader) return <Loader/>

  
  
  return (
    <div>{data.length}</div>
  )
}

export default Hotels