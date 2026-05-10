import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

// CREATE CONTEXT...
const HotelContext = createContext();

// HOTELSPROVIDER COMPONENT FOR COVER OTHER COMPONENTS WITH TRANSMISSION VALUE IN CONTEXT...
function HotelsProvider({children}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

//  FETCH DATA AND SET QUERYSTRING............
   const { data:hotels, isLoader } = useFetch(
    "http://localhost:5000/hotels",
     `q=${destination || ""}&accommodates_gte=${room || 1}`,
 );


  return (
    <HotelContext.Provider value={{hotels, isLoader}}> {children} </HotelContext.Provider>
  )
}

export default HotelsProvider;

// CUSTOM HOOKS FOR ACCESS OTHER COMPONENT TO CONTEXT....
export function useHotels(){
  return useContext(HotelContext);
}