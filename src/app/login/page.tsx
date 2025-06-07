"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [show, setShow] = useState(false)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usuario = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    if (usuario === "admin" && password === "1234") {
      router.push("/dashboard")
    } else {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f4f4] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#f97316] text-white p-10 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">Iniciar Sesión</h2>

        <label className="block mb-1 text-sm font-semibold">Usuario</label>
        <input
          name="username"
          className="w-full mb-5 px-4 py-2 rounded-lg border border-white text-black placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Usuario"
          required
        />

        <label className="block mb-1 text-sm font-semibold">Contraseña</label>
        <div className="relative mb-6">
          <input
            name="password"
            type={show ? "text" : "password"}
            className="w-full px-4 py-2 border border-white rounded-lg pr-10 text-black placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute top-2.5 right-3 text-black"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg font-bold text-[#f97316] bg-white hover:bg-[#0f0f0f] hover:text-white transition-colors duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
