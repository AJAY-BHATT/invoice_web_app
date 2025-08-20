import React, { useMemo, useState } from 'react'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct, reset } from '../store'
import { api } from '../lib/api'

export default function Products(){
  const dispatch = useDispatch()
  const items = useSelector(s => s.products.items)
  const token = useSelector(s => s.auth.token)
  const user = useSelector(s => s.auth.user)

  const [name,setName] = useState('')
  const [qty,setQty] = useState('1')
  const [rate,setRate] = useState('0')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const subtotal = useMemo(()=> items.reduce((s,p)=> s + p.qty*p.rate, 0), [items])
  const gst = +(subtotal * 0.18).toFixed(2)
  const total = +(subtotal + gst).toFixed(2)

  const onAdd = ()=>{
    setError('')
    if (!name.trim()) return setError('Product name required')
    const q = parseInt(qty,10); const r = parseFloat(rate)
    if (!Number.isFinite(q) || q<=0) return setError('Qty must be positive')
    if (!Number.isFinite(r) || r<0) return setError('Rate must be 0 or more')
    dispatch(addProduct({ name, qty:q, rate:r }))
    setName(''); setQty('1'); setRate('0')
  }

  const generate = async ()=>{
    if (items.length===0) { setError('Add at least one product'); return; }
    setLoading(true); setError('')
    try{
      const res = await api('/invoices', { method:'POST', body:{ products: items, gstPercent: 18 }, token })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${user?.name||'user'}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      dispatch(reset())
    } catch(e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <Nav />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onAdd} className="btn">Add Product ＋</button>
          <div></div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="th">Product name</th>
                  <th className="th">Price</th>
                  <th className="th">Quantity</th>
                  <th className="th">Total Price</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p,i)=> (
                  <tr key={i}>
                    <td className="td italic">(Productname-{i+1}) {p.name}</td>
                    <td className="td">{p.rate}</td>
                    <td className="td">{p.qty}</td>
                    <td className="td">INR {(p.qty*p.rate).toFixed(2)}</td>
                    <td className="td"><button className="text-red-400" onClick={()=>dispatch(removeProduct(i))}>Remove</button></td>
                  </tr>
                ))}
                <tr><td className="td" colSpan="3">Sub-Total</td><td className="td">INR {subtotal.toFixed(2)}</td><td className="td"></td></tr>
                <tr><td className="td" colSpan="3">Incl + GST 18%</td><td className="td">INR {total.toFixed(2)}</td><td className="td"></td></tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-4 gap-3 mt-6">
            <input className="input" placeholder="Product name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="input" placeholder="Qty" value={qty} onChange={e=>setQty(e.target.value)} />
            <input className="input" placeholder="Rate" value={rate} onChange={e=>setRate(e.target.value)} />
            <button className="btn" onClick={onAdd}>Add</button>
          </div>

          {error && <div className="text-red-400 mt-4">{error}</div>}

          <div className="flex justify-center mt-6">
            <button className="btn" onClick={generate} disabled={loading}>{loading?'Generating...':'Generate PDF Invoice'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
