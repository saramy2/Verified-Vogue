import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StaticNav from '../components/Nav/StaticNav'
import { BACKEND_URL } from '../constant'

import img3 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img1 from '../assets/img3.png'
import FAQ from '../components/FAQ'

import { motion } from 'framer-motion'
import { TypingText } from '../components/TypingText'
import Sidebar from '../components/Sidebar'
import StatesContext from '../context/StatesContext'


const Home = () => {

    const context = useContext(StatesContext)
    const { state } = context

    const navigate = useNavigate()

    const [search, setsearch] = useState('')
    const [active, setactive] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: ['products', { search }],
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/products?search=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                async (res) => await res.json()
            );
        },
    });

    return (
        <div className='min-h-screen relative flex'>

            <div className='relative z-40'>
                <Sidebar  />
            </div>

            <div className='w-full mx-auto'>
                <StaticNav setsearch={setsearch} />

                <div className='max-w-[1300px] mx-auto px-[20px] md:px-[40px] py-[30px] md:mt-[50px]'>

                    {search && (
                        <h2 className='text-red-500 font-extrabold text-[25px] md:text-[40px] text-center md:text-start'>
                            {search}
                        </h2>
                    )}

                    {!search && state.user && (
                        <h2 className='text-center text-[35px] font-bold mt-[0px] sm:mt-[70px]'>
                            Hello {state.user.name || state.user.brandName || 'Admin'}
                        </h2>
                    )}

                    {!search && (

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-[60px] md:gap-[30px] mt-[60px] sm:mt-[150px]'>
                            <motion.div
                                whileInView={{ x: [-70, 0], opacity: [0, 1] }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                                initial='hidden'
                                style={{ opacity: 0 }}
                                viewport={{ once: true }}
                                className='mx-auto w-full flex justify-center'
                            >
                                <div className=' cursor-pointer rounded-[20px] flex flex-col items-center md:gap-[20px]  relative'
                                    onClick={() => {
                                        setactive(0)
                                        const Element = document.getElementById('faq');
                                        if (Element) {
                                            Element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <img src={img1} alt="" className='h-[250px] sm:h-[320px] object-contain' />
                                    <h2>
                                        <span className=' font-bold text-[25px] sm:text-[35px] text-center'>Our Mission</span>
                                    </h2>
                                </div>
                            </motion.div>
                            <div className=' cursor-pointer rounded-[20px] flex flex-col items-center md:gap-[20px]  relative'
                                onClick={() => {
                                    setactive(2)
                                    const Element = document.getElementById('faq');
                                    if (Element) {
                                        Element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                <img src={img2} alt="" className='h-[250px] sm:h-[320px] object-contain bounce' />

                                <motion.div
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                >
                                    <h2 className="font-semibold text-[25px] sm:text-[35px]  text-center"

                                    >
                                        Customer <span

                                        ><TypingText title="Journey" textStyles={'text-red-500'} /></span>
                                    </h2>

                                </motion.div>

                            </div>
                            <motion.div
                                whileInView={{ x: [70, 0], opacity: [0, 1] }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                                initial='hidden'
                                style={{ opacity: 0 }}
                                viewport={{ once: true }}
                                className='mx-auto w-full flex justify-center'
                            >
                                <div className=' cursor-pointer  rounded-[20px] flex flex-col items-center md:gap-[20px]  relative'
                                    onClick={() => {
                                        setactive(1)
                                        const Element = document.getElementById('faq');
                                        if (Element) {
                                            Element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <img src={img3} alt="" className='h-[250px] sm:h-[320px] object-contain' />
                                    <h2>
                                        <span className=' font-bold text-[25px] sm:text-[35px]  text-center'>Blockchain</span>
                                    </h2>
                                </div>
                            </motion.div>
                        </div>

                    )}

                    {search && (
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[20px]  mt-[40px]'>
                                {data && data.products.length > 0 && data.products.map((item, i) => (
                                    <div key={i} className='full bg-gray-400 rounded-[20px]'>
                                        <div className='m-[12px]'>
                                            <div className='rounded-[20px] bg-red-500 w-fit px-[15px] py-[2px]'>
                                                <h2 className='text-[16px] font-medium text-white'>
                                                    #{i + 1}
                                                </h2>
                                            </div>

                                            <div className='mt-[20px] pb-[10px] space-y-[3px]'>
                                                <h2 className='text-white font-bold text-[35px]'>
                                                    {item.name}
                                                </h2>
                                               
                                                <h2 className='text-white font-bold text-[15px]'>
                                                    Date of sale: <span className='font-normal'>{dayjs(item.SDate).format('DD-MM-YYYY')}</span>
                                                </h2>
                                                <h2 className='text-white font-bold text-[15px]'>
                                                    City: <span className='font-normal'>{item.city}</span>
                                                </h2>
                                                <h2 className='text-white font-bold text-[15px]'>
                                                    Country: <span className='font-normal'>{item.country}</span>
                                                </h2>
                                                <h2 className='text-white font-bold text-[15px]'>
                                                    Branch: <span className='font-normal'>{item.branch}</span>
                                                </h2>
                                            </div>

                                        </div>
                                    </div>
                                ))}


                            </div>
                            {isLoading && (
                                <div className='flex justify-center items-center pt-[40px] pb-[100px]'>
                                    <CircularProgress sx={{ color: 'rgb(239,68,68 )' }} />
                                </div>
                            )}

                            {data && data.products.length === 0 && (
                                <h2 className='text-center text-[16px] text-gray-500 pt-[40px] pb-[100px]'>
                                    No Products Found
                                </h2>
                            )}

                        </div>
                    )}

                    {!state.user && (
                        <motion.div
                            whileInView={{ scale: [0.7, 1], opacity: [0, 1] }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            initial='hidden'
                            style={{ opacity: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className='w-full sm:w-[370px] h-[250px] sm:h-[320px] mx-auto border-[6px] border-gray-600 rounded-[20px] flex justify-center items-center mt-[90px]'>
                                <div className='flex flex-col justify-center items-center gap-[20px]'>
                                    <button className='bg-red-100 hover:bg-red-200 duration-700 h-[45px] w-[240px] text-[17px] font-medium rounded-[20px]'
                                        onClick={() => navigate('/login', { state: { from: 'customer' } })}
                                    >
                                        Customer
                                    </button>
                                    <button className='bg-red-500 hover:bg-red-600 text-white duration-700 h-[45px] w-[240px] text-[17px] font-medium rounded-[20px]'
                                        onClick={() => navigate('/login', { state: { from: 'brand' } })}
                                    >
                                        Brand
                                    </button>

                                </div>
                            </div>
                        </motion.div>
                    )}


                </div>

                <FAQ active={active} />

            </div>
        </div>
    )
}

export default Home