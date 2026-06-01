import { createContext, useContext, useEffect, useState } from "react";
// import { PiOpenAiLogo } from "react-icons/pi";
import toast from "react-hot-toast";
import axios from "axios";

// CREATE CONTEXT...
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

// BookmarkProvider COMPONENT FOR COVER OTHER COMPONENTS WITH TRANSMISSION VALUE IN CONTEXT...
function BookmarkProvider({ children }) {
  // STATE FOR GET CURRENTHOTE IN ROUTE bookmark....
  const [currentBookmark, setcurrentBookmark] = useState(null);

  // STATE FOR CREATE ISlOADER UNIQUE FOR FETCHBOOKMARK....
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  // city and country add to db.json shod....for show update this data(get all bookmark)...
  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoader(true);

      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoader(false);
      }
    }
    fetchBookmarkList();
  }, []);

  // for get one bookmark....
  async function getBookmark(id) {
    setIsLoader(true);
    setcurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setcurrentBookmark(data);
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoader(false);
    }
  }

  // create function for manage newBookmark object in AddNewBookmark component...(create bookmark)
  async function createBookmark(newBookmark) {
    setIsLoader(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);

      //for update and show currentbookmar in route=> /bookmark(bookmark list)...
      setcurrentBookmark(data);
      // for show old bookmark city and new bookmark city...
      setBookmarks((prev) => [...prev, data]);
      setcurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoader(false);
    }
  }

  // function for delete bookmarkList in route bookmark....
   async function deleteBookmark(id) {
    setIsLoader(true);
    try {

    await axios.delete(`${BASE_URL}/bookmarks/${id}`);

      // for show old bookmark city and new bookmark city...
      setBookmarks((prev)=>prev.filter ((item)=>item.id !== id));
     
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoader(false);
    }
  }





  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoader,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

// CUSTOM HOOKS FOR ACCESS OTHER COMPONENT TO CONTEXT....
export function usebookmark() {
  return useContext(BookmarkContext);
}
