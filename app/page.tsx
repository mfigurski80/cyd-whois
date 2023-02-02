// import { Inter } from '@next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import styles from './page.module.css'
import DomainLookup from './DomainLookup'


export default function Home() {
  return (
    <main className={styles.main}>
      <DomainLookup />
    </main>
  )
}
