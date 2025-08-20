// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setAuth } from '../store'
// import { api } from '../lib/api'

// export default function Login(){
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [error,setError] = useState('')
//   const nav = useNavigate()
//   const dispatch = useDispatch()

//   const onSubmit = async (e)=>{
//     e.preventDefault()
//     setError('')
//     if (!/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email')
//     if (!password) return setError('Password is required')
//     try {
//       const data = await api('/auth/login', { method:'POST', body:{ email, password } })
//       dispatch(setAuth(data))
//       nav('/products')
//     } catch(e){ setError(e.message) }
//   }

//   return (
//     <div>
//       <div className="nav">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 rounded-md border-2 border-neutral-100"></div>
//           <div className="font-semibold">levitation <span className="text-xs text-neutral-400 block">infotech</span></div>
//         </div>
//         <a href="#" className="btn">Connecting People With Technology</a>
//       </div>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
//         <div className="hidden md:block rounded-2xl overflow-hidden">
//           <img src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200" alt="" />
//         </div>
//         <div className="flex flex-col justify-center">
//           <h1 className="text-4xl font-extrabold mb-3">Let the Journey Begin!</h1>
//           <p className="text-neutral-400 mb-6">This is basic login page used for levitation assignment purpose.</p>
//           <form onSubmit={onSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 text-sm">Email Address</label>
//               <input className="input" placeholder="Enter Email ID" value={email} onChange={e=>setEmail(e.target.value)} />
//               <p className="text-xs text-neutral-500 mt-1">This email will be displayed with your inquiry</p>
//             </div>
//             <div>
//               <label className="block mb-1 text-sm">Current Password</label>
//               <input type="password" className="input" placeholder="Enter the Password" value={password} onChange={e=>setPassword(e.target.value)} />
//             </div>
//             {error && <div className="text-red-400">{error}</div>}
//             <div className="flex items-center gap-4">
//               <button className="btn">Login now</button>
//               <Link to="/register" className="text-neutral-400 hover:text-neutral-200">Create account?</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store';
import { api } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email');
    if (!password) return setError('Password is required');

    try {
      const data = await api('/auth/login', { method: 'POST', body: { email, password } });
      dispatch(setAuth(data));
      nav('/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="nav">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border-2 border-neutral-100"></div>
          <div className="font-semibold">
            levitation <span className="text-xs text-neutral-400 block">infotech</span>
          </div>
        </div>
        <a href="#" className="btn">
          Connecting People With Technology
        </a>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
        <div className="hidden md:block rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-3">Let the Journey Begin!</h1>
          <p className="text-neutral-400 mb-6">
            This is basic login page used for levitation assignment purpose.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Email Address</label>
              <input
                className="input"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-neutral-500 mt-1">
                This email will be displayed with your inquiry
              </p>
            </div>
            <div>
              <label className="block mb-1 text-sm">Current Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter the Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-400">{error}</div>}
            <div className="flex items-center gap-4">
              <button className="btn">Login now</button>
              <Link to="/register" className="text-neutral-400 hover:text-neutral-200">
                Create account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

