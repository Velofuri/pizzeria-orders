import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export function Header() {
  const { signOut } = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/'>
          <Image src='/logo.svg' width={190} height={60} alt='logo' />
        </Link>

        <nav className={styles.menuNav}>
          <Link href='/category'>Categoria</Link>
          <Link href='/product'>Cardápio</Link>
          <button onClick={signOut}>
            <FiLogOut color='#FFF' size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
