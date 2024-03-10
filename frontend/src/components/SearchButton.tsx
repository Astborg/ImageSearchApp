import {useAuth0} from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export const SearchButton = () => {
    const {isAuthenticated} = useAuth0()
    return(
        isAuthenticated && (
            <>
            <Link to="/search"><button >
             Search Pictures
            </button></Link>
            </>
            
        )
        
    )
}