import { useContext, useState } from "react"
import Sidebar from "../../components/Sidebar"
import StatesContext from "../../context/StatesContext"
import { useMutation } from "@tanstack/react-query"
import { BACKEND_URL } from "../../constant"
import { CircularProgress } from "@mui/material"

import img from '../../assets/logo.png'
import { motion } from 'framer-motion';


const Brand = () => {

    const context = useContext(StatesContext)
    const { state, handleStateChange } = context

    const [name, setname] = useState(state.user.brandName)
    const [email, setemail] = useState(state.user.email)
    const [brandType, setbrandType] = useState(state.user.brandType)

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/user/update`, {
                method: 'PUT',
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
                localStorage.setItem('authUser', JSON.stringify(res.user));
                handleStateChange({ success: 'Profile updated successfully' })

            } else {
                handleStateChange({ error: res.message })
            }
        },


    })

    return (
        <div className="flex md:min-h-screen">
            <Sidebar />


            <div className="mt-[150px] md:mt-0 relative w-full flex justify-center items-center px-[20px] py-[40px]">

                <div className="absolute hidden md:flex top-[10px] left-0 right-0 justify-center">
                    <img src={img} alt="" className="h-[80px]" />
                </div>
                <motion.div
                    whileInView={{ y: [70, 0], opacity: [0, 1] }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    initial='hidden'
                    style={{
                        opacity: 0,
                    }}
                    viewport={{ once: true }}

                >
                    <div className="w-[450px] bg-[#343434] rounded-[15px] p-[30px]">
                        <h2 className="text-center font-bold text-white text-[40px]">
                            Brand Id #{state.user.brandId}
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                mutation.mutate({ email, brandName: name, role: state.user.role, brandType })
                            }}
                            className="mt-[30px] max-w-[350px] mx-auto space-y-[20px]">
                            <input type="text"
                                placeholder="Brand Name"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px] font-medium text-[16px]  placeholder-opacity-50"
                                required
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                            <input type="text"
                                placeholder="Brand Type"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px] font-medium text-[16px]  placeholder-opacity-50"
                                required
                                value={brandType}
                                onChange={(e) => setbrandType(e.target.value)}
                            />
                            <input type="email"
                                placeholder="Email"
                                className="w-full  outline-none rounded-[10px] px-[15px] py-[10px] font-medium text-[16px] placeholder-opacity-50"
                                required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />

                            <div className="pt-[10px]">
                                <button className="w-full text-white bg-red-500 text-[18px] font-medium h-[40px] rounded-[10px] duration-700 "
                                    disabled={mutation.isPending}
                                    type="submit"
                                >
                                    {mutation.isPending ? <CircularProgress sx={{ color: 'red' }} size={18} /> : 'Save'}

                                </button>
                            </div>



                        </form>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Brand