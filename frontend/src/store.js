import { configureStore, createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: token || null, user },
  reducers: {
    setAuth(state, { payload }) {
      state.token = payload.token
      state.user = payload.user
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {
    addProduct(state, { payload }) { state.items.push(payload) },
    removeProduct(state, { payload }) { state.items.splice(payload,1) },
    reset(state) { state.items = [] }
  }
})

export const { setAuth, logout } = authSlice.actions
export const { addProduct, removeProduct, reset } = productsSlice.actions

const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productsSlice.reducer }
})

export default store
