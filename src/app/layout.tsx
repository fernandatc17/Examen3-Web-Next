import './globals.css'
import { Inter } from 'next/font/google'
import LayoutWrapper from '../components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Farmacia App',
  description: 'Panel de control farmacia',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}