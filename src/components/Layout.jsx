

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Header from './Header'
import Register from './Pages/Register'
import {  useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { checkLogin } from './Store/authSlice'

export default function Layout() {
 
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!localStorage.getItem('users')){
      localStorage.setItem('users',JSON.stringify([]));
    }
    dispatch(checkLogin())
  }, [])
  return (
    <div>
      <Router>
      {/* Load Header */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <Header />
        <Routes>
          <Route  element={<PrivateRoutes  />}>
            <Route element={<Home />} path="/" exact />
            <Route element={<Products />} path="/products" />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Router>
    </div>
  )
}
