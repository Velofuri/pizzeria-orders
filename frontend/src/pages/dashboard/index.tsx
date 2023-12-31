import { Header } from '@/components/Header'
import { canSSRAuth } from '@/utils/canSSRAuth'
import Head from 'next/head'
import styles from './stykes.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '@/services/api'
import { useState } from 'react'
import Modal from 'react-modal'
import { api } from '@/services/apiClient'
import { ModalOrder } from '@/components/ModalOrder'

interface OrderProps {
  id: string
  table: number
  status: boolean
  draft: boolean
  name?: string
}

interface DashboardProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string
  amount: number
  order_id: string
  product_id: string
  product: {
    id: string
    name: string
    description: string
    price: string
    banner: string
  }
  order: {
    id: string
    table: number
    status: boolean
    name?: string
  }
}

export default function Dashboard({ orders }: DashboardProps) {
  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal() {
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string) {
    const response = await api.get('/order/detail', {
      params: {
        order_id: id,
      },
    })

    setModalItem(response.data)
    setModalVisible(true)
  }

  async function handleFinishItem(id: string) {
    await api.put('/order/finish', {
      order_id: id,
    })

    const response = await api.get('/orders')

    setOrderList(response.data)
    setModalVisible(false)
  }

  async function handleRefreshOrders() {
    const response = await api.get('/orders')
    setOrderList(response.data)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Painel - VeloPizza</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color='#3fffa3' />
            </button>
          </div>
          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>Nenhum pedido aberto!</span>
            )}
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)

  const response = await apiClient.get('/orders')

  return {
    props: {
      orders: response.data,
    },
  }
})
