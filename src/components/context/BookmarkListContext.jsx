import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// import { PiOpenAiLogo } from "react-icons/pi";
import toast from "react-hot-toast";
import axios from "axios";

// CREATE CONTEXT...
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
  bookmarks: [],
  isLoader: false,
  currentBookmark: null,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoader: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoader: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoader: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoader: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark : action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoader: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark : null,
      };
    case "rejected":
      return {
        ...state,
        isLoader: false,
        error: action.payload,
      };
    default:
      throw new Error("unkhown action");
  }
}

// BookmarkProvider COMPONENT FOR COVER OTHER COMPONENTS WITH TRANSMISSION VALUE IN CONTEXT...
function BookmarkProvider({ children }) {

  // userReducer hooks.....
  const [{ bookmarks, isLoader, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState,
  );

  // city and country add to db.json shod....for show update this data(get all bookmark)...
  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });

      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an Error accurred in loading bookmark",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  // for get one bookmark....
  async function getBookmark(id) {
    if(Number(id) === currentBookmark?.id) return
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an error accured in fetching single bookmark",
      });
    }
  }

  // create function for manage newBookmark object in AddNewBookmark component...(create bookmark)
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);

      //for update and show currentbookmar in route=> /bookmark(bookmark list)...
      dispatch({ type: "bookmark/created", payload: data });
      // for show old bookmark city and new bookmark city...
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  // function for delete bookmarkList in route bookmark....
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);

      // for show old bookmark city and new bookmark city...
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
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
        deleteBookmark,
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

// approuch : pass action