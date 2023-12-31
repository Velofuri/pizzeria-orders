import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'

import logoimg from '../../public/logo.svg'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/contexts/AuthContext'

import Link from 'next/link'
import { canSSRGuest } from '@/utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    if (email === '' || password === '') {
      return toast.warn('preencha os dados')
    }
    setLoading(true)
    await signIn({ email, password })
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>VeloPizzaria - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoimg} alt='Logo' />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu Email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Digite sua Senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href='/signup'>
            <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  }
})
