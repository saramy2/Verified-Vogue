import { HomeIcon, MagnifyingGlassIcon, QrCodeIcon } from "@heroicons/react/24/solid"
import { useLocation, useNavigate } from "react-router-dom"
import logo from '../../assets/logo.png'
import QRCodeModal from "../components/QrCodeModal"
import { useState } from "react"
import FailedQrModal from "../components/FailedQrModal"
import ProductModal from "../components/ProductModal"

import { motion } from 'framer-motion'


const StaticNav = ({ setsearch = () => { } }) => {


    const [open, setopen] = useState(false)
    const [data, setData] = useState('');
    const [opensold, setopensold] = useState(false)
    const [productData, setproductData] = useState('')
    const [openPrductModal, setopenPrductModal] = useState('')

    const navigate = useNavigate()
    const { pathname } = useLocation()




    return (

        <div className="relative">
            {open && (
                <QRCodeModal open={open} setOpen={setopen} data={data} setData={setData} setopensold={setopensold} setproductData={setproductData} productData={productData} setopenPrductModal={setopenPrductModal} />
            )}

            <FailedQrModal open={opensold} setOpen={setopensold} />

            {openPrductModal && (
                <ProductModal open={openPrductModal} setOpen={setopenPrductModal} product={productData} />
            )}

            <div className='absolute top-[80px] hidden md:block sm:top-[70px] lg:top-0 left-0 right-0'>
                <div className='flex justify-center py-[10px]'>
                    <motion.div
                        whileInView={{ scale: [0.7, 1], opacity: [0, 1] }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        initial='hidden'
                        style={{ opacity: 0 }}
                        viewport={{ once: true }}
                        className='mx-auto w-full flex justify-center'
                    >
                        <img src={logo} alt="" className={` ${pathname === '/' ? 'h-[110px] sm:h-[180px]' : 'h-[110px]'}`} />
                    </motion.div>
                </div>
            </div>

            <div className='relative z-10 py-[20px] sm:py-[10px] px-[20px] flex items-center gap-[15px]'>
                <MagnifyingGlassIcon className='text-red-500 hidden sm:block h-[30px] cursor-pointer' />
                <input type="text"
                    placeholder="Search"
                    className="w-[150px] sm:w-[250px] border border-gray-400 outline-none rounded-[10px] px-[15px] py-[6px] font-medium text-[16px] placeholder-opacity-50"
                    onChange={(e) => setsearch(e.target.value)}
                />
            </div>
        </div>
    )
}

export default StaticNav