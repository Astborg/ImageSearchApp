import {useAuth0} from '@auth0/auth0-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const SearchInput = () => {
    const {isAuthenticated} = useAuth0()
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
  
    

    const handleSearch = (e: any) => {
        e.preventDefault()
        navigate(`/search?${searchTerm}`)

        
    }
    return(
        isAuthenticated && (
            <form onSubmit={handleSearch}>
                <input 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            <button type="submit">Search</button>
            
            </form>
            
           
            
        )
        
    )
}