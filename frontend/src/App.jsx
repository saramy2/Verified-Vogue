import { useContext, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StatesContext from "./context/StatesContext"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Brand from "./pages/brand/Brand"
import Product from "./pages/brand/Product"
import Profile from "./pages/customer/Profile"
import Purchases from "./pages/customer/Purchases"

import { useQuery } from "@tanstack/react-query"
import { BACKEND_URL } from "./constant.js"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminDashboard from "./pages/admin/AdminDashboard"
import { Bars3Icon } from "@heroicons/react/24/solid"
import Sidebar from "./components/Sidebar.jsx"


const App = () => {

  const context = useContext(StatesContext)
  const { state, handleStateChange } = context

  const { pathname } = useLocation()

  const { data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return fetch(`${BACKEND_URL}/api/user/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then(
        async (res) => await res.json()
      );
    },
  })

  useEffect(() => {

    if (!isFetching && !data) {
      localStorage.removeItem('LoggedInTime')
      localStorage.removeItem('authUser')
    }

    if (data && data.user) {
      handleStateChange({ isAuthenticated: true, user: data.user });
      localStorage.setItem('authUser', JSON.stringify(data.user));
    }

  }, [isFetching, data])

  useEffect(() => {

    if (state.error) {
      toast.error(state.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastClassName: "rounded-lg",
        className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
        style: { borderRadius: '15px' },
      });
      handleStateChange({ error: '' })
    }

    if (state.success) {
      toast.success(state.success, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastClassName: "rounded-lg",
        className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
        style: { borderRadius: '15px' },
      });
      handleStateChange({ success: '' })
    }

  }, [state.error, state.success])

  useEffect(() => {

    window.scrollTo(0, 0)

  }, [pathname])

  useEffect(() => {
    if (localStorage.getItem('admin')) {
      handleStateChange({
        user: {
          role: 'admin',
          name: 'admin'
        }
      })
    }
  }, [])



  return (

    <div className="">
      <div className="min-h-screen">

        {/* <Sidebar customer={true} /> */}

        {!state.isSideBarOpen && (
          <div className="absolute top-[10px] left-[10px]">
            <Bars3Icon className='text-red-500 h-[30px] cursor-pointer'
              onClick={() => handleStateChange({ isSideBarOpen: true })}
            />
          </div>
        )}



        <div className={`h-full bg-white border-gray-600 md:border-r-[3px]  ${state.isSideBarOpen ? 'md:mr-[50px]  ' : 'md:mx-[50px] md:border-l-[3px] '} `}>


          <ToastContainer />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/brand/profile" element={<Brand />} />
            <Route path="/brand/product" element={<Product />} />

            <Route path="/customer/profile" element={<Profile />} />
            <Route path="/customer/purchases" element={<Purchases />} />

            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App