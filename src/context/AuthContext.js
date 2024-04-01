// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import toast from 'react-hot-toast'
import useAPI from 'src/hooks/useNewApi'
import { baseURL } from 'src/Constants/Constants'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [userPermissions, setUserPermissions] = useState([])
  const [userRoles, setUserRoles] = useState([])
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const data = window.localStorage.getItem('user')
      if (data) {
        setUser(JSON.parse(data))
        setLoading(false)
      } else {
        setLoading(false)

        // router.replace('/login')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params, errorCallback) => {
    const { email, password } = params
    const role = 'admin'
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        password,
        role,
        id: '123',
        firstName: 'Taimoor',
        lastName: 'ali',
        phoneNumber: '+966 543345644'
      })
    )
    setUser({ email, role, id: '123', firstName: 'Taimoor', lastName: 'ali', phoneNumber: '+966 543345644' })

    router.push('/dashboard')
  }

  const handleLogout = () => {
    // window.localStorage.clear()
    localStorage.removeItem('user')
    setUser(null)
    router.replace('/auth/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    userPermissions,
    userRoles
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
