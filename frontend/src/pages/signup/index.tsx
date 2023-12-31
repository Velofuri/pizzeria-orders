import Head from 'next/head'
import styles from '@/styles/Home.module.scss'

import logoimg from '../../../public/logo.svg'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { FormEvent, useState, useContext } from 'react'

import { AuthContext } from '@/contexts/AuthContext'
import { toast } from 'react-toastify'
import { canSSRGuest } from '@/utils/canSSRGuest'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: FormEvent) {
    e.preventDefault()

    if (name === '' || email === '' || password === '') {
      return toast.warning('Preencha todos os dados')
    }

    setLoading(true)

    await signUp({ name, email, password })

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>VeloPizzaria - Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoimg} alt='Logo' />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu Nome'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Cadastrar
            </Button>
          </form>
          <Link href='/'>
            <p className={styles.text}>Já possui uma conta? Faça Login!</p>
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
