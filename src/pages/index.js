import React, { useEffect, useState} from "react"
import netlifyIdentity from 'netlify-identity-widget';
import netlifyAuth from './netlifyAuth.js'

// window.netlifyIdentity = netlifyIdentity;
// // You must run this once before trying to interact with the widget
// netlifyIdentity.init();

// markup
const IndexPage = () => {
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
    let [user, setUser] = useState(null)

    useEffect(() => {
        netlifyAuth.initialize((user) => {
            setLoggedIn(!!user)
        })
     }, [loggedIn])

    let login = () => {
        netlifyAuth.authenticate((user) => {
            setLoggedIn(!!user)
            setUser(user)
            netlifyAuth.closeModal()
        })
    }

    let logout = () => {
        netlifyAuth.signout(() => {
            setLoggedIn(false)
            setUser(null)
        })
    }

      return (
          loggedIn
              ? (
                  <div>
                    You are logged in!
                  </div>
              ) : (
                  <button onClick={login}>
                    Log in here.
                  </button>
              )

      )
}

export default IndexPage
