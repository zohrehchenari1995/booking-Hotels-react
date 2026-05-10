import { createContext, useContext } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext();

function HotelsProvider({children}) {
  const [serachparams, setSearchparams] = useSearchParams();
  const destination = serachparams.get("destination");
  const room = JSON.parse(serachparams.get("options"))?.room;

  
//  FETCH DATA AND SET QUERYSTRING............
   const { data:hotels, isLoader } = useFetch(
    "http://localhost:5000/hotels",
     `q=${destination || ""}&accommodates_gte=${room || 1}`,
[destination, room] );
  return (
    <HotelContext.Provider value={{hotels, isLoader}}> {children} </HotelContext.Provider>
  )
}

export default HotelsProvider;


export function useHotels(){
  return useContext(HotelContext);
}