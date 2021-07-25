import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: function(jwtToken,userId) {},
  logout: noop,
  isAuthenticated: false
})