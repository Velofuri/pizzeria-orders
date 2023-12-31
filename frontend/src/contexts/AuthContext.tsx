import { api } from '@/services/apiClient'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type AuthContextData = {
  user: UserProps | undefined
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch (error) {
    console.error('error ao deslogar')
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user //!! converte a variavel em um boolean

  useEffect(() => {
    async function fetchData() {
      const { '@nextauth.token': token } = parseCookies()

      if (token) {
        try {
          const response = await api.get('/me')
          const { id, name, email } = response.data
          setUser({ id, name, email })
        } catch (error) {
          signOut()
        }
      }
    }
    fetchData()
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', { email, password })
      const { id, name, token } = response.data

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      setUser({
        id: id,
        name: name,
        email: email,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Logado com sucesso!')

      Router.push('/dashboard')
    } catch (error) {
      toast.error('Erro ao acessar!')
      console.error('Erro ao acessar', error)
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', { name, email, password })
      toast.success('Conta criada com sucesso!')
      Router.push('/')
    } catch (error) {
      toast.error('Erro ao cadastrar')
      console.error('Erro ao cadastrar ', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
