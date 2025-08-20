import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import './index.css'
import store from './store'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'

function Protected({ children }) {
  const token = useSelector(s => s.auth.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Protected><Products /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
