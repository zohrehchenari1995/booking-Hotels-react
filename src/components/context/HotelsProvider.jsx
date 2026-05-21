import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { PiOpenAiLogo } from "react-icons/pi";
import toast from "react-hot-toast";
import axios from "axios";

// CREATE CONTEXT...
const HotelContext = createContext();
const BASE_URL ="http://localhost:5000/hotels"

// HOTELSPROVIDER COMPONENT FOR COVER OTHER COMPONENTS WITH TRANSMISSION VALUE IN CONTEXT...
function HotelsProvider({ children }) {
  // STATE FOR GET CURRENTHOTE IN ROUTE HOTELS....
  const [currentHotel, setCurrentHotel] = useState(null);
  // STATE FOR CREATE ISLOADER UNIQUE FOR CURRENTHOTEL...
  const [isLoaderCurrentHotel, setIsLoaderCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  //  FETCH DATA AND SET QUERYSTRING............
  const { data: hotels = [], isLoader } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`,
  );

  async function  getHotel(id){
    setIsLoaderCurrentHotel(true);
   try{
     const {data} = await axios.get(`${BASE_URL}/${id}`);
     setCurrentHotel(data);
     setIsLoaderCurrentHotel(false);
   }
   catch(error){
    toast.error(error.message);
    setIsLoaderCurrentHotel(false);
   }
  }


  return (
    <HotelContext.Provider value={{ hotels, isLoader,currentHotel ,isLoaderCurrentHotel, getHotel }}>
  
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

// CUSTOM HOOKS FOR ACCESS OTHER COMPONENT TO CONTEXT....
export function useHotels() {
  return useContext(HotelContext);
}
