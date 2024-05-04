/* eslint-disable react/no-unescaped-entities */
import { useLocation, useNavigate } from "react-router-dom"
import StaticNav from "../../components/Nav/StaticNav"
import { useMutation } from "@tanstack/react-query"
import { BACKEND_URL } from "../../constant"
import { useContext, useState } from "react"
import { CircularProgress } from "@mui/material"
import StatesContext from "../../context/StatesContext"

import img from '../../assets/img3.png'
import Sidebar from "../../components/Sidebar"

const Login = () => {


    const context = useContext(StatesContext)
    const { handleStateChange } = context

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()
    const { state } = useLocation()

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess(data) {
            let res = await data.json()
            if (res.success) {
                handleStateChange({ user: res.user })
                localStorage.setItem('LoggedInTime', new Date().getTime())
                localStorage.setItem('authUser', JSON.stringify(res.user));
                if (state && state.from === 'customer') {
                    navigate('/customer/profile')
                } else {
                    navigate('/brand/profile')
                }
            } else {
                handleStateChange({ error: res.message })
            }
        },


    })


    return (
        <div className="min-h-screen flex relative">

            <div className='relative z-40'>
                <Sidebar />
            </div>

            <div className='w-full mx-auto relative'>
                <StaticNav />

                <div className="min-h-[80vh] flex justify-center  items-center py-[50px] px-[20px]">

                    <div className="w-[450px] bg-red-600 rounded-[15px] p-[25px]">
                        <h2 className="text-center font-bold text-white text-[40px]">
                            Login
                        </h2>


                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (email === 'admin@gmail.com' && password === 'admin') {
                                    navigate('/admin/dashboard')
                                    localStorage.setItem('admin', 'true')
                                    handleStateChange({
                                        user: {
                                            role: 'admin',
                                            name: 'admin'
                                        }
                                    })

                                    return
                                }
                                mutation.mutate({ email, password, role: state.from })
                            }}

                            className="mt-[30px] max-w-[350px] mx-auto space-y-[20px]">
                            <input type="email"
                                placeholder="Email"
                                className="w-full outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px] placeholder-opacity-50"
                                required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <input type="password"
                                placeholder="Password"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px] font-medium text-[16px] placeholder-opacity-50"
                                required
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <div className="pt-[10px]">
                                <button
                                    disabled={mutation.isPending}
                                    type="submit"
                                    className="w-full bg-white text-[18px] font-medium h-[40px] rounded-[10px]  duration-700 "

                                >
                                    {mutation.isPending ? <CircularProgress sx={{ color: 'red' }} size={18} /> : 'Login'}
                                </button>
                            </div>

                            <h6 className="text-center text-white font-normal pb-[20px] text-[14px]">
                                Don't have an account? <span className="cursor-pointer underline underline-offset-4 font-semibold" onClick={() => navigate('/register', { state: state })}>Register</span>
                            </h6>

                        </form>

                    </div>

                </div>

                <div className="absolute bottom-0 left-[-5%]">
                    <img src={img} alt="" className="h-[50vh]" />
                </div>
            </div>

        </div>
    )
}

export default Login