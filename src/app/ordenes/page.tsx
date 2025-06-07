"use client"

import { useEffect, useState } from "react"
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react"
import { Dialog } from "@headlessui/react"

interface DetalleOrden {
  id: number
  descripcion: string
  cantidad: number
  precio: number
  montoUni: number
  CodMedicamento: number
  NroOrdenC: number
}

interface Laboratorio {
  CodLab: number
  razonSocial: string
  direccion: string
  telefono: string
  email: string
  contacto: string
}

interface OrdenCompra {
  NroOrdenC: number
  fechaEmision: string
  situacion: string
  total: number
  nrofacturaProv: string
  CodLab: number
  laboratorio: Laboratorio
  detalles: DetalleOrden[]
}

export default function OrdenesPage() {
  const [data, setData] = useState<OrdenCompra[]>([])
  const [labs, setLabs] = useState<Laboratorio[]>([])
  const [modalType, setModalType] = useState<'view' | 'delete' | 'create' | null>(null)
  const [selected, setSelected] = useState<OrdenCompra | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    fechaEmision: '',
    situacion: 'EMITIDA',
    total: 0,
    nrofacturaProv: '',
    CodLab: 0,
  })

  useEffect(() => {
    fetchData()
    fetch('/api/laboratorios').then(r => r.json()).then(setLabs)
  }, [])

  const fetchData = () => {
    fetch('/api/ordenes')
      .then(res => res.json())
      .then(setData)
  }

  const openModal = (type: typeof modalType, orden?: OrdenCompra) => {
    setModalType(type)
    setSelected(orden || null)
    setOpen(true)
  }

  const closeModal = () => {
    setModalType(null)
    setSelected(null)
    setOpen(false)
    setForm({ fechaEmision: '', situacion: 'EMITIDA', total: 0, nrofacturaProv: '', CodLab: 0 })
  }

  const eliminarOrden = async () => {
    if (selected) {
      await fetch(`/api/ordenes/${selected.NroOrdenC}`, { method: 'DELETE' })
      fetchData()
      closeModal()
    }
  }

  const crearOrden = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      ...form,
      fechaEmision: new Date(form.fechaEmision).toISOString(),
    }
    await fetch('/api/ordenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    fetchData()
    closeModal()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#f97316]">Órdenes de Compra</h1>
        <button onClick={() => openModal('create')} className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded shadow">
          <PlusCircle size={18} /> Nueva Orden
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-[#f97316] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Fecha Emisión</th>
              <th className="p-3 text-left">Situación</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Factura</th>
              <th className="p-3 text-left">Laboratorio</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((orden) => (
              <tr key={orden.NroOrdenC} className="bg-gray-50 text-black">
                <td className="p-3">{orden.NroOrdenC}</td>
                <td className="p-3">{orden.fechaEmision.split("T")[0]}</td>
                <td className="p-3">{orden.situacion}</td>
                <td className="p-3">S/ {orden.total.toFixed(2)}</td>
                <td className="p-3">{orden.nrofacturaProv}</td>
                <td className="p-3">{orden.laboratorio?.razonSocial}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button onClick={() => openModal('view', orden)} className="text-[#0f0f0f] hover:text-[#f97316]">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => openModal('delete', orden)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded p-6 shadow-xl">
            {modalType === 'create' && (
              <form onSubmit={crearOrden} className="text-black space-y-4">
                <h2 className="text-xl font-bold text-[#f97316]">Nueva Orden</h2>
                <input type="date" value={form.fechaEmision} onChange={e => setForm({ ...form, fechaEmision: e.target.value })} className="w-full p-2 border rounded" required />
                <input type="text" placeholder="Situación" value={form.situacion} onChange={e => setForm({ ...form, situacion: e.target.value })} className="w-full p-2 border rounded" required />
                <input type="number" placeholder="Total" value={form.total} onChange={e => setForm({ ...form, total: parseFloat(e.target.value) })} className="w-full p-2 border rounded" required />
                <input type="text" placeholder="Factura Proveedor" value={form.nrofacturaProv} onChange={e => setForm({ ...form, nrofacturaProv: e.target.value })} className="w-full p-2 border rounded" required />
                <select value={form.CodLab} onChange={e => setForm({ ...form, CodLab: parseInt(e.target.value) })} className="w-full p-2 border rounded" required>
                  <option value="">-- Selecciona Laboratorio --</option>
                  {labs.map(l => (
                    <option key={l.CodLab} value={l.CodLab}>{l.razonSocial}</option>
                  ))}
                </select>
                <button type="submit" className="w-full py-2 rounded bg-[#f97316] text-white hover:bg-[#ea580c]">Guardar Orden</button>
              </form>
            )}

            {modalType === 'view' && selected && (
              <div className="text-black space-y-4">
                <h2 className="text-xl font-bold text-[#f97316] mb-2">Orden #{selected.NroOrdenC}</h2>
                <div>
                  <p><strong>Fecha Emisión:</strong> {selected.fechaEmision.split('T')[0]}</p>
                  <p><strong>Situación:</strong> {selected.situacion}</p>
                  <p><strong>Total:</strong> S/ {selected.total.toFixed(2)}</p>
                  <p><strong>Factura:</strong> {selected.nrofacturaProv}</p>
                </div>

                <div className="border-t pt-2">
                  <h3 className="font-semibold text-[#f97316]">Laboratorio</h3>
                  <p><strong>Razón Social:</strong> {selected.laboratorio?.razonSocial}</p>
                  <p><strong>Dirección:</strong> {selected.laboratorio?.direccion}</p>
                  <p><strong>Teléfono:</strong> {selected.laboratorio?.telefono}</p>
                  <p><strong>Email:</strong> {selected.laboratorio?.email}</p>
                  <p><strong>Contacto:</strong> {selected.laboratorio?.contacto}</p>
                </div>

                <div className="border-t pt-2">
                  <h3 className="font-semibold text-[#f97316]">Detalles</h3>
                  {selected.detalles?.length ? (
                    <table className="w-full text-sm mt-2">
                      <thead className="bg-orange-100">
                        <tr>
                          <th className="text-left p-2">Descripción</th>
                          <th className="text-right p-2">Cantidad</th>
                          <th className="text-right p-2">Precio</th>
                          <th className="text-right p-2">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.detalles.map((det) => (
                          <tr key={det.id} className="border-b">
                            <td className="p-2">{det.descripcion}</td>
                            <td className="p-2 text-right">{det.cantidad}</td>
                            <td className="p-2 text-right">S/ {det.precio.toFixed(2)}</td>
                            <td className="p-2 text-right">S/ {det.montoUni.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm">No hay detalles registrados.</p>
                  )}
                </div>
              </div>
            )}

            {modalType === 'delete' && selected && (
              <div className="text-black space-y-4">
                <h2 className="text-xl font-bold text-red-600">Eliminar Orden</h2>
                <p>¿Estás seguro que deseas eliminar la orden #{selected.NroOrdenC}?</p>
                <div className="flex justify-end gap-4">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                  <button onClick={eliminarOrden} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">Eliminar</button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
