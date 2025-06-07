"use client"

import { useEffect, useState } from "react"
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react"
import { Dialog } from "@headlessui/react"

interface Medicamento {
  CodMedicamento: number
  descripcionMed: string
}

interface OrdenCompra {
  NroOrdenC: number
  nrofacturaProv: string
}

interface DetalleOrden {
  id: number
  descripcion: string
  cantidad: number
  precio: number
  montoUni: number
  CodMedicamento: number
  NroOrdenC: number
  medicamento?: Medicamento
  orden?: OrdenCompra
}

export default function DetallesOrdenesPage() {
  const [data, setData] = useState<DetalleOrden[]>([])
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([])
  const [modalType, setModalType] = useState<'view' | 'delete' | 'create' | 'edit' | null>(null)
  const [selected, setSelected] = useState<DetalleOrden | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    descripcion: '', cantidad: 1, precio: 0, CodMedicamento: 0, NroOrdenC: 0
  })

  useEffect(() => {
    fetchData()
    fetch('/api/medicamentos').then(r => r.json()).then(setMedicamentos)
    fetch('/api/ordenes').then(r => r.json()).then(setOrdenes)
  }, [])

  const fetchData = () => {
    fetch('/api/detalles')
      .then(res => res.json())
      .then(setData)
  }

  const openModal = (type: typeof modalType, detalle?: DetalleOrden) => {
    setModalType(type)
    setSelected(detalle || null)
    setOpen(true)
    if (type === 'edit' && detalle) {
      setForm({
        descripcion: detalle.descripcion,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        CodMedicamento: detalle.CodMedicamento,
        NroOrdenC: detalle.NroOrdenC
      })
    }
  }

  const closeModal = () => {
    setModalType(null)
    setSelected(null)
    setOpen(false)
    setForm({ descripcion: '', cantidad: 1, precio: 0, CodMedicamento: 0, NroOrdenC: 0 })
  }

  const eliminarDetalle = async () => {
    if (selected) {
      await fetch(`/api/detalles/${selected.id}`, { method: 'DELETE' })
      fetchData()
      closeModal()
    }
  }

  const crearDetalle = async (e: React.FormEvent) => {
    e.preventDefault()
    const montoUni = form.cantidad * form.precio
    await fetch('/api/detalles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, montoUni }),
    })
    fetchData()
    closeModal()
  }

  const editarDetalle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    const montoUni = form.cantidad * form.precio
    await fetch(`/api/detalles/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, montoUni }),
    })
    fetchData()
    closeModal()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#f97316]">Detalles de Órdenes</h1>
        <button onClick={() => openModal('create')} className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded shadow">
          <PlusCircle size={18} /> Agregar Detalle
        </button>
      </div>

      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead className="bg-[#f97316] text-white">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Descripción</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Monto</th>
            <th className="p-2 text-left">Medicamento</th>
            <th className="p-2 text-left">Factura</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(det => (
            <tr key={det.id} className="bg-gray-50 text-black">
              <td className="p-2">{det.id}</td>
              <td className="p-2">{det.descripcion}</td>
              <td className="p-2">{det.cantidad}</td>
              <td className="p-2">S/ {det.precio.toFixed(2)}</td>
              <td className="p-2">S/ {det.montoUni.toFixed(2)}</td>
              <td className="p-2">{det.medicamento?.descripcionMed || det.CodMedicamento}</td>
              <td className="p-2">{ordenes.find(o => o.NroOrdenC === det.NroOrdenC)?.nrofacturaProv || det.NroOrdenC}</td>
              <td className="p-2 flex justify-center gap-2">
                <button onClick={() => openModal('view', det)} className="text-[#0f0f0f] hover:text-[#f97316]">
                  <Eye size={18} />
                </button>
                <button onClick={() => openModal('edit', det)} className="text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
                <button onClick={() => openModal('delete', det)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-xl bg-white rounded p-6 shadow-xl">
            {(modalType === 'create' || modalType === 'edit') && (
              <form onSubmit={modalType === 'edit' ? editarDetalle : crearDetalle} className="text-black space-y-3">
                <h2 className="text-lg font-bold text-[#f97316]">{modalType === 'edit' ? 'Editar Detalle' : 'Nuevo Detalle'}</h2>
                <input type="text" placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} className="w-full p-2 border rounded" required />
                <input type="number" placeholder="Cantidad" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: parseInt(e.target.value) })} className="w-full p-2 border rounded" required />
                <input type="number" placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: parseFloat(e.target.value) })} className="w-full p-2 border rounded" required />
                <select value={form.CodMedicamento} onChange={e => setForm({ ...form, CodMedicamento: parseInt(e.target.value) })} className="w-full p-2 border rounded" required>
                  <option value="">-- Selecciona Medicamento --</option>
                  {medicamentos.map(m => (
                    <option key={m.CodMedicamento} value={m.CodMedicamento}>{m.descripcionMed}</option>
                  ))}
                </select>
                <select value={form.NroOrdenC} onChange={e => setForm({ ...form, NroOrdenC: parseInt(e.target.value) })} className="w-full p-2 border rounded" required>
                  <option value="">-- Selecciona Orden --</option>
                  {ordenes.map(o => (
                    <option key={o.NroOrdenC} value={o.NroOrdenC}>{o.nrofacturaProv}</option>
                  ))}
                </select>
                <button type="submit" className="w-full py-2 rounded bg-[#f97316] text-white hover:bg-[#ea580c]">Guardar</button>
              </form>
            )}

            {modalType === 'view' && selected && (
              <div className="text-black space-y-2">
                <h2 className="text-lg font-bold text-[#f97316]">Detalle #{selected.id}</h2>
                <p><strong>Descripción:</strong> {selected.descripcion}</p>
                <p><strong>Cantidad:</strong> {selected.cantidad}</p>
                <p><strong>Precio:</strong> S/ {selected.precio.toFixed(2)}</p>
                <p><strong>Monto:</strong> S/ {selected.montoUni.toFixed(2)}</p>
                <p><strong>Medicamento:</strong> {selected.medicamento?.descripcionMed || selected.CodMedicamento}</p>
                <p><strong>Orden:</strong> {ordenes.find(o => o.NroOrdenC === selected.NroOrdenC)?.nrofacturaProv || selected.NroOrdenC}</p>
              </div>
            )}

            {modalType === 'delete' && selected && (
              <div className="text-black space-y-4">
                <h2 className="text-lg font-bold text-red-600">Eliminar Detalle</h2>
                <p>¿Deseas eliminar el detalle #{selected.id}?</p>
                <div className="flex justify-end gap-4">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                  <button onClick={eliminarDetalle} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">Eliminar</button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
