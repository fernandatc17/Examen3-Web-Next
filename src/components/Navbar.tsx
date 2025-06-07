"use client"

import Link from "next/link"
import { LayoutDashboard, ShoppingCart, Pill, FlaskConical, ClipboardList } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-[#f97316] px-6 py-3 flex gap-6 items-center font-bold shadow-md">
      <NavLink href="/dashboard" icon={<LayoutDashboard  />} label="Dashboard" />
      <NavLink href="/ordenes" icon={<ShoppingCart />} label="Órdenes" />
      <NavLink href="/medicamentos" icon={<Pill />} label="Medicamentos" />
      <NavLink href="/laboratorios" icon={<FlaskConical />} label="Laboratorios" />
      <NavLink href="/detalles" icon={<ClipboardList />} label="Detalles" />
    </nav>
  )
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:text-[#f97316] rounded transition duration-200"
    >
      {icon}
      {label}
    </Link>
  )
}
