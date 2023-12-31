import Head from 'next/head'
import styles from './styles.module.scss'
import { Header } from '@/components/Header'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import { setupAPIClient } from '@/services/api'
import { toast } from 'react-toastify'
import { api } from '@/services/apiClient'

interface ItemProps {
  id: string
  name: string
}

interface CategoryListProps {
  categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryListProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageAvatar, setImageAvatar] = useState<File>(null)

  const [categories, setCattegories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return

    const image = e.target.files[0]

    if (!image) return

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setAvatarUrl(URL.createObjectURL(image))
      setImageAvatar(image)
    }
  }

  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategorySelected(Number(e.target.value))
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    try {
      const data = new FormData()

      if (
        name.trim() === '' ||
        price.trim() === '' ||
        description.trim() === '' ||
        imageAvatar === null
      ) {
        return toast.warn('preencha todos os campos')
      }

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[categorySelected].id)
      data.append('file', imageAvatar)

      await api.post('/product', data)

      toast.success('Produto cadastrado com sucesso!')
    } catch (error) {
      toast.error('Erro ao cadastrar produto')
      console.log('Erro ao cadastrar produto ERROR: ', error)
    }
    setName('')
    setPrice('')
    setDescription('')
    setImageAvatar(null)
    setAvatarUrl('')
  }
  return (
    <>
      <Head>
        <title>Novo Produto - VeloPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color='#FFF' />
              </span>

              <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

              {avatarUrl && (
                <Image
                  className={styles.preview}
                  src={avatarUrl}
                  alt='Foto produto'
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              className={styles.input}
              type='text'
              placeholder='Digite o nome do produto'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type='text'
              placeholder='Digite o preço do produto'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder='Descreva seu produto'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiCliente = setupAPIClient(ctx)
  const response = await apiCliente.get('/category')

  return {
    props: {
      categoryList: response.data,
    },
  }
})
