
import { LoginButton } from '../components/LoginButton'
import { LogoutButton } from '../components/LogoutButton'
import { MyPhotosButton } from '../components/MyPhotosButton'
import { Profile } from '../components/Profile'
import {useAuth0} from '@auth0/auth0-react'
import { SearchButton } from '../components/SearchButton'

export const Home = () => {
    const {isLoading, error} = useAuth0()
    return(

        <main className="column">
      <h1>Welcome to ImageSearch-App</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <Profile></Profile>
        <MyPhotosButton></MyPhotosButton>
        <SearchButton></SearchButton>
        </>
    )}
    </main>
    )
}