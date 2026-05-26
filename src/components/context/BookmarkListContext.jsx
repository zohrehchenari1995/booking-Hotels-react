import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
// import { PiOpenAiLogo } from "react-icons/pi";
import toast from "react-hot-toast";
import axios from "axios";

// CREATE CONTEXT...
const BookmarkContext = createContext();
const BASE_URL ="http://localhost:5000";

// BookmarkProvider COMPONENT FOR COVER OTHER COMPONENTS WITH TRANSMISSION VALUE IN CONTEXT...
function BookmarkProvider({ children }) {
  // STATE FOR GET CURRENTHOTE IN ROUTE bookmark....
  const [currentBookmark, setcurrentBookmark] = useState(null);
  // STATE FOR CREATE ISLOADER UNIQUE FOR currentBookmark...
  const [isLoadercurrentBookmark, setIsLoadercurrentBookmark] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  //  FETCH DATA AND SET QUERYSTRING............
  const { data:bookmarks, isLoader } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id){
    setIsLoadercurrentBookmark(true);
   try{
     const {data} = await axios.get(`${BASE_URL}/$/bookmarks/{id}`);
     setcurrentBookmark(data);
     setIsLoadercurrentBookmark(false);
   }
   catch(error){
    toast.error(error.message);
    setIsLoadercurrentBookmark(false);
   }
  }


  return (
    <BookmarkContext.Provider value={{ bookmarks, isLoader,currentBookmark ,isLoadercurrentBookmark,getBookmark }}>
  
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

// CUSTOM HOOKS FOR ACCESS OTHER COMPONENT TO CONTEXT....
export function usebookmark() {
  return useContext(BookmarkContext);
}
