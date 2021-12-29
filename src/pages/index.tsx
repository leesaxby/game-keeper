import * as React from 'react'
import { useState} from "react"
import netlifyAuth from '../netlifyAuth.js'
import App from './app';

const Index = () => {
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
    let [user, setUser] = useState(null)

    const login = () => {
        netlifyAuth.authenticate((user) => {
            setLoggedIn(!!user)
            setUser(user)
            netlifyAuth.closeModal()
        })
    }

    const logout = () => {
        netlifyAuth.signout(() => {
            setLoggedIn(false)
            setUser(user)
        })
    }

    // useEffect(() => {
    //     netlifyAuth.initialize((user) => {
    //         setLoggedIn(!!user)
    //     })
    // }, [loggedIn])
    //
    // useEffect(() => {
    //     if (!loggedIn) login();
    // }, [loggedIn])


    return (

                <App />


    )
}

export default Index
