import React, { useEffect, useState} from "react"
import netlifyAuth from '../netlifyAuth.js'

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
            setUser(user)
        })
    }

    fetch('/.netlify/functions/player-all')
        .then(res => res.json())
        .then(res => {
            console.log(res[0].data)
        })
        .catch(err => console.log(err))

      return (
          loggedIn ? (
              <div>
                  You are logged in!

                     {user && <>Welcome {user?.user_metadata.full_name}!</>}
                  <br />
                     <button onClick={logout}>

                  Log out here.
              </button>
              </div>
          ) : (
              <button onClick={login}>
                  Log in here.
              </button>
          )
      )
}

export default IndexPage
