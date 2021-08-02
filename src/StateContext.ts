import {createContext} from 'react'

const StateContext = createContext({
    loggedIn: false,
    userId: ""
})

export default StateContext;