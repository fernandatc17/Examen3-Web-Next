"use client"

import { useEffect, useState } from "react"
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react"
import { Dialog } from "@headlessui/react"

interface Laboratorio {
  CodLab: number
  razonSocial: string
  direccion: string
  telefono: string
  email: string
  contacto: string
}

export default function LaboratoriosPage() {
  const [data, setData] = useState<Laboratorio[]>([])
  const [modalType, setModalType] = useState<'view' | 'delete' | 'create' | null>(null)
  const [selected, setSelected] = useState<Laboratorio | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    razonSocial: '', direccion: '', telefono: '', email: '', contacto: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('/api/laboratorios')
      .then(res => res.json())
      .then(setData)
  }

  const openModal = (type: typeof modalType, lab?: Laboratorio) => {
    setModalType(type)
    setSelected(lab || null)
    if (lab) setForm({ ...lab })
    setOpen(true)
  }

  const closeModal = () => {
    setModalType(null)
    setSelected(null)
    setOpen(false)
    setForm({ razonSocial: '', direccion: '', telefono: '', email: '', contacto: '' })
  }

  const eliminar = async () => {
    if (selected) {
      await fetch(`/api/laboratorios/${selected.CodLab}`, { method: 'DELETE' })
      fetchData()
      closeModal()
    }
  }

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/laboratorios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    fetchData()
    closeModal()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#f97316]">Laboratorios</h1>
        <button onClick={() => openModal('create')} className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded shadow">
          <PlusCircle size={18} /> Nuevo
        </button>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-[#f97316] text-white">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Razón Social</th>
            <th className="p-2 text-left">Dirección</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Contacto</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lab) => (
            <tr key={lab.CodLab} className="border-b text-black">
              <td className="p-2">{lab.CodLab}</td>
              <td className="p-2">{lab.razonSocial}</td>
              <td className="p-2">{lab.direccion}</td>
              <td className="p-2">{lab.telefono}</td>
              <td className="p-2">{lab.email}</td>
              <td className="p-2">{lab.contacto}</td>
              <td className="p-2 flex justify-center gap-2">
                <button onClick={() => openModal('view', lab)}><Eye size={18} /></button>
                <button onClick={() => openModal('delete', lab)} className="text-red-600"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 shadow-xl">
            {modalType === 'create' && (
              <form onSubmit={guardar} className="text-black space-y-3">
                <h2 className="text-xl font-bold text-[#f97316]">Nuevo Laboratorio</h2>
                <input placeholder="Razón Social" value={form.razonSocial} onChange={e => setForm({ ...form, razonSocial: e.target.value })} className="w-full p-2 border rounded" required />
                <input placeholder="Dirección" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} className="w-full p-2 border rounded" required />
                <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} className="w-full p-2 border rounded" required />
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded" required />
                <input placeholder="Contacto" value={form.contacto} onChange={e => setForm({ ...form, contacto: e.target.value })} className="w-full p-2 border rounded" required />
                <button type="submit" className="w-full py-2 bg-[#f97316] text-white rounded">Guardar</button>
              </form>
            )}

            {modalType === 'view' && selected && (
              <div className="text-black space-y-3">
                <h2 className="text-xl font-bold text-[#f97316]">Laboratorio #{selected.CodLab}</h2>
                <p><strong>Razón Social:</strong> {selected.razonSocial}</p>
                <p><strong>Dirección:</strong> {selected.direccion}</p>
                <p><strong>Teléfono:</strong> {selected.telefono}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Contacto:</strong> {selected.contacto}</p>
              </div>
            )}

            {modalType === 'delete' && selected && (
              <div className="text-black space-y-4">
                <h2 className="text-xl font-bold text-red-600">Eliminar Laboratorio</h2>
                <p>¿Deseas eliminar el laboratorio &quot;{selected.razonSocial}&quot;?</p>
                <div className="flex justify-end gap-4">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                  <button onClick={eliminar} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">Eliminar</button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
