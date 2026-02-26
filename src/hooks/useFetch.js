import axios from "axios";
import { useEffect, useState, } from "react";
import toast from "react-hot-toast";


export default function useFetch(url, query=""){
  // STATE FOR GET AND SVAE RESULT API.............
  const [data, setData] = useState ([]);
  // STATE FOR SHOW ISlOADING OR NOT LOADING TO UESR.......
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    async function fetchData(){
      try{
        setIsLoading(true);
        const {data} = await axios.get(`${url}?${query}`);
        setData(data);
      }
      catch(error){
        setData([]);
        toast.error(error?.message);
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchData ();
  },[query, url]);
  return {isLoading, data};
}