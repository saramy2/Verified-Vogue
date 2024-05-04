import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import plus from '../assets/PLUS.png'
import xmark from '../assets/xmark.png'
import { TypingText } from './TypingText'


const data = [

    {
        ques: 'Our Mission?',
        ans: "Verified Vogue's mission is to ensure authenticity and trust in luxury goods. We empower customers by providing a transparent and secure platform, leveraging blockchain technology to verify product information and ownership."
    },
    {
        ques: 'Blockchain?',
        ans: 'At Verified Vogue, we utilize blockchain to create an unchangeable record of transactions. This technology enhances the security and reliability of our platform, ensuring the integrity of product information and ownership details.'
    },
    {
        ques: 'Customer Journey?',
        ans: 'The customer journey at Verified Vogue involves a seamless experience. Users can easily register, explore our platform, manage their products, and enjoy the confidence that comes with secure, authenticated transactions.'
    },

]

const FAQ = ({ active }) => {

    const [activeIndex, setActiveIndex] = useState()

    const handleSetIndex = (index) => {

        if (index === activeIndex) {
            setActiveIndex('')
        } else {

            setActiveIndex(index)
        }

    }


    useEffect(() => {

        setActiveIndex(active)

    }, [active])


    return (
        <div className=' relative max-w-[100vw] overflow-hidden mt-[40px]' id='faq' >
            <div className='md:light-blue hidden md:flex md:absolute top-0 right-[-30px] h-[250px] md:h-[300px] w-[250px] md:w-[300px] z-30' />

            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                initial='hidden'
                style={{ opacity: 0 }}
                viewport={{ once: true }}
            >
                <div className='max-w-screen-xl mx-auto px-[20px] pt-[30px] pb-[60px] md:pb-[100px]'>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-center text-[25px] sm:text-[30px] md:text-[38px] font-bold leading-9"

                        >
                            Frequently <span

                            ><TypingText title="Asked Questions" textStyles={'text-red-500'} /></span>
                        </h2>

                    </motion.div>

                    <div className='max-w-[800px] mx-auto mt-5 md:mt-8'>
                        {data.map((item, i) => (

                            <ul className="flex flex-col" key={i}>
                                <li className="bg-transparent my-2 shadow-md rounded-md" onClick={() => handleSetIndex(i)}>
                                    <div className="flex justify-between items-center cursor-pointer p-[8px]">

                                        <h2
                                            className="font-medium p-1 cursor-pointer text-[14px] md:text-[17px] "
                                        >
                                            <span>{item.ques}</span>

                                        </h2>
                                        <div>

                                            {activeIndex === i ? (
                                                <img src={xmark} alt="icon" />
                                            ) : (
                                                <img src={plus} alt="icon" />
                                            )}

                                        </div>

                                    </div>
                                    <div
                                        x-ref="tab"
                                        className={` overflow-hidden duration-500 transition-all ${activeIndex === i ? 'max-h-[400px] ' : 'max-h-0 '}`}
                                    >

                                        <p className=" py-2 md:py-4 px-2 md:px-4 text-[12px] md:text-[15px] ">
                                            {item.ans}
                                        </p>


                                    </div>
                                </li>
                            </ul >

                        ))}
                    </div>
                </div>
            </motion.div >
        </div >
    )
}

export default FAQ