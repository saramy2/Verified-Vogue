/* eslint-disable react/no-unescaped-entities */
import { useLocation, useNavigate } from "react-router-dom"
import StaticNav from "../../components/Nav/StaticNav"
import { useContext, useState } from "react"
import StatesContext from "../../context/StatesContext"
import { useMutation } from "@tanstack/react-query"
import { BACKEND_URL } from "../../constant"
import { CircularProgress } from "@mui/material"

import img from '../../assets/img3.png'
import Sidebar from "../../components/Sidebar"


const Register = () => {

    const context = useContext(StatesContext)
    const { handleStateChange } = context

    const navigate = useNavigate()
    const { state } = useLocation()

    const [firstName, setfirstName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [passport, setpassport] = useState('')
    const [brandName, setbrandName] = useState('')
    const [idNumber, setidNumber] = useState('')
    const [brandType, setbrandType] = useState('')
    const [walletUrl, setwalletUrl] = useState('')

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/register`, {
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
        onError(error) {
            console.log(error)
        }


    })

    return (
        <div className="min-h-screen relative flex">

            <div className='relative z-40'>
                <Sidebar />
            </div>

            <div className='w-full mx-auto relative'>
                <StaticNav />

                <div className="min-h-[80vh] mt-[50px] flex justify-center items-center py-[50px] px-[20px]">

                    <div className="w-[450px] bg-red-600 rounded-[15px] p-[25px]">
                        <h2 className="text-center text-white font-bold  text-[40px]">
                            Register
                        </h2>


                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (state.from === 'customer') {
                                    if (passport.toString().length !== 6) {
                                        handleStateChange({ error: 'Passport number should be of length 6' })
                                        return
                                    }
                                    if (idNumber.toString().length !== 10) {
                                        handleStateChange({ error: 'Id number should be of length 10' })
                                        return
                                    }
                                }
                                if (password !== confirmPassword) {
                                    handleStateChange({ error: 'Password does not match' })
                                    return
                                }
                                const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
                                if (!passwordRegex.test(password)) {
                                    handleStateChange({ error: 'Password must be at least six characters long and include a special character' });
                                    return;
                                }
                                mutation.mutate({ name: firstName, email, password, passport, idNumber, brandName, role: state.from, brandType, walletUrl })
                            }}

                            className="mt-[30px] max-w-[350px] mx-auto space-y-[20px]">
                            {state && state.from === 'customer' && (
                                <input type="text"
                                    placeholder="Enter Name"
                                    className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                    required
                                    value={firstName}
                                    onChange={(e) => setfirstName(e.target.value)}
                                />
                            )}
                            {state && state.from === 'brand' && (
                                <input type="text"
                                    placeholder="Brand Name"
                                    className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                    required
                                    value={brandName}
                                    onChange={(e) => setbrandName(e.target.value)}
                                />
                            )}

                            {state && state.from === 'brand' && (
                                <input type="text"
                                    placeholder="Brand Type"
                                    className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                    required
                                    value={brandType}
                                    onChange={(e) => setbrandType(e.target.value)}
                                />
                            )}

                            <input type="email"
                                placeholder="Email"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            {state && state.from === 'customer' && (
                                <input type="number"
                                    placeholder="Passport Number"
                                    className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                    required
                                    value={passport}
                                    onChange={(e) => setpassport(e.target.value)}
                                />
                            )}
                            {state && state.from === 'customer' && (
                                <input type="text"
                                    placeholder="Wallet Url"
                                    className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                    required
                                    value={walletUrl}
                                    onChange={(e) => setwalletUrl(e.target.value)}
                                />
                            )}
                            {state && state.from === 'customer' && (
                                <input type="number"
                                    placeholder="Id Number"
                                    className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                    required
                                    value={idNumber}
                                    onChange={(e) => setidNumber(e.target.value)}
                                />
                            )}
                            <input type="password"
                                placeholder="Password"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                required
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <input type="password"
                                placeholder="Confirm Password"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px]  font-medium text-[16px]  placeholder-opacity-50"
                                required
                                value={confirmPassword}
                                onChange={(e) => setconfirmPassword(e.target.value)}
                            />
                            <div className="pt-[10px]">
                                <button
                                    type="submit"
                                    className="w-full  bg-white text-[18px] font-medium h-[40px] rounded-[10px]  duration-700 "
                                    disabled={mutation.isPending}
                                >

                                    {mutation.isPending ? <CircularProgress sx={{ color: 'red' }} size={18} /> : 'Register'}
                                </button>
                            </div>

                            <h6 className="text-center text-white font-normal pb-[20px] text-[14px]">
                                Already have an account? <span className="cursor-pointer underline underline-offset-4 font-semibold" onClick={() => navigate('/login', { state: state })}>Login</span>
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

export default Register