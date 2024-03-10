import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://customsearch.googleapis.com/customsearch/v1";

const API_KEY = import.meta.env.VITE_APP_SEARCH_KEY;
const SEARCH_ENGINE_KEY = import.meta.env.VITE_APP_SEARCH_ENGINE_KEY;

const useSearch = (searchTerm: any) => {
  const [data, setData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
    
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&cx=${SEARCH_ENGINE_KEY}&q=${searchTerm}`
      );
      console.log(response?.data)
      setData(response?.data);
      
    
    }

    if(searchTerm){
        fetchData();
    }
    
  }, [searchTerm]);
  return {
    data,
    setData,
    
  };
};

export default useSearch;