import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Name is required')
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email')
    if (password.length < 6) return setError('Password must be 6+ chars')
    try {
      await api('/auth/register', { method:'POST', body:{ name, email, password } })
      nav('/login')
    } catch(e){ setError(e.message) }
  }

  return (
    <div>
      <div className="nav">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border-2 border-neutral-100"></div>
          <div className="font-semibold">levitation <span className="text-xs text-neutral-400 block">infotech</span></div>
        </div>
        <Link to="/login" className="btn">Login</Link>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-3">Sign up to begin journey</h1>
          <p className="text-neutral-400 mb-6">This is basic signup page used for levitation assignment purpose.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Enter your name</label>
              <input className="input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
              <p className="text-xs text-neutral-500 mt-1">This name will be displayed with your inquiry</p>
            </div>
            <div>
              <label className="block mb-1 text-sm">Email Address</label>
              <input className="input" placeholder="Enter Email ID" value={email} onChange={e=>setEmail(e.target.value)} />
              <p className="text-xs text-neutral-500 mt-1">This email will be displayed with your inquiry</p>
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input type="password" className="input" placeholder="Enter the Password" value={password} onChange={e=>setPassword(e.target.value)} />
              <p className="text-xs text-neutral-500 mt-1">Any further updates will be forwarded on this Email ID</p>
            </div>
            {error && <div className="text-red-400">{error}</div>}
            <button className="btn">Register</button>
          </form>
        </div>
        <div className="hidden md:block rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1628157588553-5eeea00c3b3a?q=80&w=1200" alt="" />
        </div>
      </div>
    </div>
  )
}
