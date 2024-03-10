import {useAuth0} from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export const MyPhotosButton = () => {
    const {isAuthenticated} = useAuth0()
    return(
        isAuthenticated && (
            <Link to='/myphotos/:id'><button onClick={() => console.log('my Photos')}>
            My Photos
           </button></Link>
        )
        
    )
}