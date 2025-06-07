"use client"

import { useEffect, useState } from "react"
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react"
import { Dialog } from "@headlessui/react"

interface Medicamento {
  CodMedicamento: number
  descripcionMed: string
  presentacion: string
  stock: number
  precioVentaUni: number
  precioVentaPres: number
  marca: string
  fechaFabricacion: string
  fechaVencimiento: string
}

export default function MedicamentosPage() {
  const [data, setData] = useState<Medicamento[]>([])
  const [modalType, setModalType] = useState<'add' | 'view' | 'edit' | 'delete' | null>(null)
  const [selected, setSelected] = useState<Medicamento | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    descripcionMed: '', presentacion: '', stock: '', precioVentaUni: '', precioVentaPres: '', marca: '', fechaFabricacion: '', fechaVencimiento: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('/api/medicamentos')
      .then(res => res.json())
      .then(setData)
  }

  const openModal = (type: typeof modalType, med?: Medicamento) => {
    setModalType(type)
    setSelected(med || null)
    if (type === 'edit' && med) {
      setForm({
        descripcionMed: med.descripcionMed,
        presentacion: med.presentacion,
        stock: String(med.stock),
        precioVentaUni: String(med.precioVentaUni),
        precioVentaPres: String(med.precioVentaPres),
        marca: med.marca,
        fechaFabricacion: med.fechaFabricacion.split('T')[0],
        fechaVencimiento: med.fechaVencimiento.split('T')[0]
      })
    } else {
      setForm({ descripcionMed: '', presentacion: '', stock: '', precioVentaUni: '', precioVentaPres: '', marca: '', fechaFabricacion: '', fechaVencimiento: '' })
    }
    setOpen(true)
  }

  const closeModal = () => {
    setModalType(null)
    setSelected(null)
    setForm({ descripcionMed: '', presentacion: '', stock: '', precioVentaUni: '', precioVentaPres: '', marca: '', fechaFabricacion: '', fechaVencimiento: '' })
    setOpen(false)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const payload = {
      descripcionMed: form.descripcionMed,
      presentacion: form.presentacion,
      stock: parseInt(form.stock),
      precioVentaUni: parseFloat(form.precioVentaUni),
      precioVentaPres: parseFloat(form.precioVentaPres),
      marca: form.marca,
      fechaFabricacion: new Date(form.fechaFabricacion),
      fechaVencimiento: new Date(form.fechaVencimiento)
    }
    if (modalType === 'add') {
      await fetch('/api/medicamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }
    if (modalType === 'edit' && selected) {
      await fetch(`/api/medicamentos/${selected.CodMedicamento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }
    fetchData()
    closeModal()
  }

  const handleDelete = async () => {
    if (selected) {
      await fetch(`/api/medicamentos/${selected.CodMedicamento}`, {
        method: 'DELETE'
      })
      fetchData()
      closeModal()
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#f97316]">Medicamentos</h1>
        <button
          onClick={() => openModal('add')}
          className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded hover:bg-white hover:text-[#f97316] transition"
        >
          <PlusCircle /> Agregar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-[#f97316] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Presentación</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Precio Uni</th>
              <th className="p-3 text-left">Precio Pres</th>
              <th className="p-3 text-left">Marca</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((med) => (
              <tr
                key={med.CodMedicamento}
                className={med.stock < 50 ? "bg-red-100 text-black" : "bg-gray-50 text-black"}
              >
                <td className="p-3">{med.CodMedicamento}</td>
                <td className="p-3">{med.descripcionMed}</td>
                <td className="p-3">{med.presentacion}</td>
                <td className="p-3">{med.stock}</td>
                <td className="p-3">S/ {med.precioVentaUni.toFixed(2)}</td>
                <td className="p-3">S/ {med.precioVentaPres.toFixed(2)}</td>
                <td className="p-3">{med.marca}</td>
                <td className="p-3 text-center">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => openModal('view', med)} className="text-[#0f0f0f] hover:text-[#f97316]">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => openModal('edit', med)} className="text-[#0f0f0f] hover:text-[#f97316]">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => openModal('delete', med)} className="text-[#0f0f0f] hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 shadow-xl">
            {(modalType === 'add' || modalType === 'edit') && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-[#f97316]">
                  {modalType === 'add' ? 'Agregar Medicamento' : `Editar: ${selected?.descripcionMed}`}
                </h2>
                <input name="descripcionMed" value={form.descripcionMed} onChange={(e) => setForm({ ...form, descripcionMed: e.target.value })} placeholder="Descripción" className="w-full p-2 border rounded text-black" required />
                <input name="presentacion" value={form.presentacion} onChange={(e) => setForm({ ...form, presentacion: e.target.value })} placeholder="Presentación" className="w-full p-2 border rounded text-black" required />
                <input name="stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock" className="w-full p-2 border rounded text-black" required />
                <input name="precioVentaUni" type="number" step="0.01" value={form.precioVentaUni} onChange={(e) => setForm({ ...form, precioVentaUni: e.target.value })} placeholder="Precio Unitario" className="w-full p-2 border rounded text-black" required />
                <input name="precioVentaPres" type="number" step="0.01" value={form.precioVentaPres} onChange={(e) => setForm({ ...form, precioVentaPres: e.target.value })} placeholder="Precio Presentación" className="w-full p-2 border rounded text-black" required />
                <input name="marca" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} placeholder="Marca" className="w-full p-2 border rounded text-black" required />
                <label htmlFor="fechaFabricacion" className="block mb-2 text-sm  text-black font-semibold">Fecha Fabricación</label>
                <input name="fechaFabricacion"  type="date" value={form.fechaFabricacion} onChange={(e) => setForm({ ...form, fechaFabricacion: e.target.value })} className="w-full p-2 border rounded text-black" required />
                <label htmlFor="fechaVencimiento" className="block mb-2 text-sm text-black font-semibold">Fecha Vencimiento</label>
                <input name="fechaVencimiento" type="date" value={form.fechaVencimiento} onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })} className="w-full p-2 border rounded text-black" required />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-[#f97316] text-white rounded hover:bg-[#d65d0e]">Guardar</button>
                </div>
              </form>
            )}
            {modalType === 'view' && (
              <div>
                <h2 className="text-xl font-bold text-[#f97316]">{selected?.descripcionMed}</h2>
                <p className="text-[#adacac]"><strong className="text-[#737171]">Presentación:</strong> {selected?.presentacion}</p>
                <p className="text-[#adacac]"><strong className="text-[#737171]">Stock:</strong> {selected?.stock}</p>
                <p className="text-[#adacac]"><strong className="text-[#737171]">Precio Unitario:</strong> S/ {selected?.precioVentaUni}</p>
                <p className="text-[#adacac]"><strong className="text-[#737171]">Precio Presentación:</strong> S/ {selected?.precioVentaPres}</p>
                <p className="text-[#adacac]"><strong className="text-[#737171]">Marca:</strong> {selected?.marca}</p>
                <p className="text-[#adacac]"><strong className="text-[#737171]">F. Fabricación:</strong> {selected?.fechaFabricacion?.split("T")[0]}</p>
                <p className="text-[#adacac]"><strong className="text-[#737171]">F. Vencimiento:</strong> {selected?.fechaVencimiento?.split("T")[0]}</p>
              </div>
            )}
            {modalType === 'delete' && (
              <div>
                <p className="text-lg font-bold text-red-600 mb-4">¿Deseas eliminar este medicamento?</p>
                <p className="mb-2 text-black">{selected?.descripcionMed}</p>
                <div className="flex justify-end gap-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                  <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Eliminar</button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
