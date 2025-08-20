import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store'

export default function Nav() {
  const dispatch = useDispatch()
  const user = useSelector(s => s.auth.user)
  return (
    <div className="nav">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md border-2 border-neutral-100"></div>
        <div className="font-semibold">levitation <span className="text-xs text-neutral-400 block">infotech</span></div>
      </div>
      <div className="flex items-center gap-4">
        {user && <div className="text-sm text-neutral-300">Hi, {user.name}</div>}
        <button className="btn" onClick={()=>dispatch(logout())}>Logout</button>
      </div>
    </div>
  )
}
