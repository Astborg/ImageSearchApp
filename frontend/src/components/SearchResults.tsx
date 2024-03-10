import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react'

export const SearchResults = ({ data = {}, setData }: any) => {
    const {user, isAuthenticated} = useAuth0()
    const [url, setClickedImageUrl] = useState('');
    const [searchTime, setSearchTime] = useState("");
    const [didYouMean, setDidYouMean] = useState("");

    useEffect(() => {
        if (data.searchInformation && data.searchInformation.formattedSearchTime) {
          setSearchTime(data.searchInformation.formattedSearchTime);
        }
        if (data.spelling && data.spelling.correctedQuery) {
            setDidYouMean(data.spelling.correctedQuery);
        } else {
            setDidYouMean("");
        }
      }, [data]);

    const BASE_URL = "https://customsearch.googleapis.com/customsearch/v1";
    const API_KEY = import.meta.env.VITE_APP_SEARCH_KEY;
    const SEARCH_ENGINE_KEY = import.meta.env.VITE_APP_SEARCH_ENGINE_KEY;

      const handleSearchWithDidYouMean = async (term: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}?key=${API_KEY}&cx=${SEARCH_ENGINE_KEY}&q=${term}`
            );
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    console.log(user)
    if (user && user.sub) {
        console.log(user.sub);
      } else {
        console.error('User name is not available.');
      }
      const userId = user?.sub;

      console.log(userId);
    const headers = {
        'Content-Type': 'application/json'
        
    };
    const handleClick = async (url:string, title:string, byteSize: number) => {
        setClickedImageUrl(url);
        console.log('saved', byteSize)
        

        if (isAuthenticated && user) {
        try {
            await axios.post('http://localhost:3001/api/mypictures', { url,title,byteSize, userId},
            {headers});
            console.log('picture saved succefully')
        } catch (error) {
            console.error('Error saving picture:', error);
        }
    }
    };
    
    return(
        isAuthenticated && (
        <>
        <Link to='/'>Go back</Link>
        {didYouMean && (
                    <p>
                        Did you mean: <span onClick={() => handleSearchWithDidYouMean(didYouMean)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{didYouMean}</span>
                    </p>
                )}
        <p>Click on the picture to save!</p>
        {url && (
                <div>
                    <h3>Clicked Image URL:</h3>
                    <p>{url}</p>
                </div>
            )}
             {searchTime && (
        <p>Search took {searchTime} seconds</p>
      )}
            <div className="resultscontainer">
                {data.items && data.items.map((item, index) => (
                    <div key={index} className="results">
                        {item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.map((image:any, idx:number) => (
                            <img 
                            src={item.pagemap?.cse_image?.[0]?.src} 
                             onClick={() => handleClick(
                                item.pagemap?.cse_image?.[0]?.src, 
                                item.title, 
                                image.src.length
                                )} className="img" key={idx} src={image.src} alt="Search Result" />
                        ))}
                    </div>
                ))}
            </div>
            
          
        </>
          )
    )
}