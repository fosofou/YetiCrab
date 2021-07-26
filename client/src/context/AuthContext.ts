import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: function(jwtToken:any,userId:any) {},
  logout: noop,
  isAuthenticated: false
})