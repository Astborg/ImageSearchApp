import { Link } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from 'react';
import {useAuth0} from '@auth0/auth0-react'

export const MyPhotos = () => {
    const {user} = useAuth0()
    const userId = user?.sub
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get(`http://localhost:3001/api/mypictures/${userId}`);
                setData(response.data);
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    return(
        <>
        <Link to='/'>Go back</Link>
       
        <h2>My Photos</h2>
        {data.length > 0 ? (
                <ul>
                    {data.map((userObject, userIndex) => (
                        <div key={userIndex}>
                            <h3> {userObject.user}</h3>
                            <ul>
                                {userObject.favorites.map((favorites, Index) => (
                                    <li key={Index}><img src={favorites.url} alt={`Favorite Movie ${Index + 1}`} /></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No photos available</p>
            )}

            
        </>  
    )
}