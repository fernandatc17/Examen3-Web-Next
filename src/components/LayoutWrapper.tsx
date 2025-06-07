"use client"

import { usePathname } from "next/navigation"
import Navbar from '../components/Navbar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showNavbar = pathname !== "/login"

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="p-4 bg-white text-white min-h-screen">{children}</main>
    </>
  )
}
