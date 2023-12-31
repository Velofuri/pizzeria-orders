import styles from './styles.module.scss'
import { Header } from '@/components/Header'
import { api } from '@/services/apiClient'
import { canSSRAuth } from '@/utils/canSSRAuth'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(e: FormEvent) {
    e.preventDefault()

    if (name.trim() === '') return toast.warn('Digite o nome da categoria')

    try {
      await api.post('/category', { name: name })
      toast.success('Categoria cadastrado com sucesso')
      setName('')
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
      console.log('Erro ao cadastrar nova categoria, ERROR ', error)
    }
  }
  return (
    <>
      <Head>
        <title>Nova categoria - VeloPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar Categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              className={styles.input}
              type='text'
              placeholder='Digite o nome da categoria'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  }
})
