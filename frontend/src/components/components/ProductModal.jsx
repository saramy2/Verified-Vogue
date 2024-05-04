import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useState } from 'react';



const ProductModal = ({ open, setOpen, product, value }) => {

    const [passport, setpassport] = useState()
    const [idNumber, setidNumber] = useState()
    const [password, setpassword] = useState('')
    const [isCorrect, setisCorrect] = useState(value ? true : false)
    const [error, seterror] = useState('')

    const [options, setoptions] = useState('Choose authentication method')
    const [openDropDown, setopenDropDown] = useState(false)



    return (
        <div>

            {open && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 40,
                        background: 'rgba(91, 91, 91, 0.15)',
                        backdropFilter: 'blur(12.5px)',
                    }}
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {open && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        zIndex: 40,
                        maxWidth: '1150px',
                    }}
                >
                    <motion.div
                        whileInView={{ scale: [0.7, 1], opacity: [0, 1] }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        initial='hidden'
                        style={{
                            opacity: 0,
                        }}
                        viewport={{ once: true }}

                    >

                        <Box
                        >
                            <Box padding={{ xs: '15px 20px', md: '22px 20px' }}
                                sx={{
                                    width: '90%',
                                    margin: 'auto',
                                    maxWidth: isCorrect ? '500px' : '600px',
                                    background: '#343434',
                                    borderRadius: '23px',
                                    minHeight: '380px',
                                    overflow: 'auto'
                                }}
                            >

                                <div className='flex justify-end cursor-pointer'
                                    onClick={() => setOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ width: '16px', height: '20px' }}
                                        viewBox="0 0 21 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M20.2457 18.0243C20.3371 18.1157 20.4097 18.2242 20.4591 18.3436C20.5086 18.463 20.5341 18.5911 20.5341 18.7203C20.5341 18.8496 20.5086 18.9776 20.4591 19.097C20.4097 19.2165 20.3371 19.325 20.2457 19.4164C20.1543 19.5078 20.0458 19.5803 19.9264 19.6298C19.8069 19.6792 19.6789 19.7047 19.5497 19.7047C19.4204 19.7047 19.2924 19.6792 19.173 19.6298C19.0535 19.5803 18.945 19.5078 18.8536 19.4164L10.6951 11.2567L2.53665 19.4164C2.35204 19.601 2.10166 19.7047 1.84059 19.7047C1.57951 19.7047 1.32913 19.601 1.14452 19.4164C0.959913 19.2318 0.856201 18.9814 0.856201 18.7203C0.856201 18.4593 0.959913 18.2089 1.14452 18.0243L9.30423 9.86578L1.14452 1.70731C0.959913 1.5227 0.856201 1.27232 0.856201 1.01124C0.856201 0.750165 0.959913 0.499783 1.14452 0.315175C1.32913 0.130567 1.57951 0.0268555 1.84059 0.0268555C2.10166 0.0268555 2.35204 0.130567 2.53665 0.315175L10.6951 8.47488L18.8536 0.315175C19.0382 0.130567 19.2886 0.0268555 19.5497 0.0268555C19.8107 0.0268555 20.0611 0.130567 20.2457 0.315175C20.4303 0.499783 20.5341 0.750165 20.5341 1.01124C20.5341 1.27232 20.4303 1.5227 20.2457 1.70731L12.086 9.86578L20.2457 18.0243Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                {!isCorrect && (
                                    <div>
                                        <h2 className='text-center text-[17px] text-white mt-[40px]'>
                                            scanning process was successful. To access the
                                            QR code, please enter one of the following
                                            passwords.
                                        </h2>
                                        <form className='px-[10px] pb-[20px] pt-[30px] space-y-[15px]'
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                seterror('')

                                                const isPasswordCorrect = product.passport == passport;
                                                const isProductIdCorrect = product.userPassword == password;
                                                const isIdNumberCorrect = product.idNumber == idNumber;

                                                const isAllCorrect = (isPasswordCorrect || isProductIdCorrect || isIdNumberCorrect) ? true : false;

                                                if (!isAllCorrect) {
                                                    seterror('Invalid details')
                                                    return
                                                }

                                                setisCorrect(true)
                                            }}
                                        >

                                            <div
                                                className={`relative bg-slate-500 select-none  w-full pr-[15px] pl-[15px]  sm:pr-[20px] py-[11px] cursor-pointer flex justify-between items-center   rounded-[5px]`}

                                                onClick={() => setopenDropDown(!openDropDown)}
                                            >
                                                <p
                                                    className=' text-[14px]  text-white font-medium'
                                                >
                                                    {options}
                                                </p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                    <path d="M9.77907 1.04697C9.77941 1.14896 9.7569 1.24973 9.71319 1.34188C9.66948 1.43403 9.60568 1.51521 9.52647 1.57946L5.4304 4.8768C5.30825 4.97721 5.15502 5.0321 4.9969 5.0321C4.83877 5.0321 4.68555 4.97721 4.5634 4.8768L0.467322 1.46341C0.327908 1.34753 0.240235 1.18102 0.223592 1.0005C0.206948 0.819981 0.262697 0.640244 0.378574 0.50083C0.494451 0.361415 0.660964 0.273743 0.841483 0.257099C1.022 0.240456 1.20174 0.296205 1.34115 0.412081L5.00031 3.46366L8.65947 0.514483C8.75968 0.431003 8.8817 0.377975 9.0111 0.361672C9.1405 0.34537 9.27187 0.366477 9.38965 0.422494C9.50743 0.478512 9.6067 0.567097 9.67571 0.677766C9.74472 0.788436 9.78059 0.916558 9.77907 1.04697Z" fill="#ffffff" />
                                                </svg>

                                                {openDropDown && (
                                                    <div className="absolute top-[42px] select-none sm:top-[50px] left-0 right-0 z-20 bg-white"
                                                        style={{
                                                            border: '1px solid #1DAEFF',
                                                            borderBottomLeftRadius: openDropDown && '5px',
                                                            borderBottomRightRadius: openDropDown && '5px',
                                                            borderTopColor: 'transparent'
                                                        }}
                                                    >
                                                        <p
                                                            className='text-[12px] sm:text-[15px] font-normal px-[10px] py-[11px] hover:bg-gray-100 duration-500 '

                                                            onClick={() => setoptions('Passport number')}
                                                        >
                                                            Passport number
                                                        </p>
                                                        <p
                                                            className='text-[12px] sm:text-[15px] font-normal px-[10px] py-[11px] hover:bg-gray-100 duration-500 '
                                                            onClick={() => setoptions('ID natural')}
                                                        >
                                                            ID natural
                                                        </p>
                                                        <p
                                                            className='text-[12px] sm:text-[15px] font-normal px-[10px] py-[11px] hover:bg-gray-100 duration-500 '
                                                            onClick={() => setoptions('Customer password')}
                                                        >
                                                            Customer password
                                                        </p>

                                                    </div>
                                                )}
                                            </div>

                                            {options === 'Customer password' && (
                                                <input
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setpassword(e.target.value)}
                                                    className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                                />
                                            )}


                                            {options === 'Passport number' && (

                                                <input type="number"
                                                    value={passport}
                                                    onChange={(e) => setpassport(e.target.value)}
                                                    placeholder="Passport Number"
                                                    className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                                />
                                            )}

                                            {options === 'ID natural' && (

                                                <input type="number"
                                                    value={idNumber}
                                                    onChange={(e) => setidNumber(e.target.value)}
                                                    placeholder="ID Number"
                                                    className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"

                                                />
                                            )}


                                            {error && (
                                                <h2 className='text-red-500 text-[16px]'>
                                                    {error}
                                                </h2>
                                            )}
                                            <div className="pt-[10px]">

                                                <button
                                                    type="submit"
                                                    className="w-full text-white bg-red-500 text-[18px] font-medium h-[40px] rounded-[10px] duration-700"
                                                >
                                                    Submit
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                )}

                                {isCorrect && (
                                    <div>
                                        <div className='mt-[20px] pb-[10px] space-y-[3px] px-[10px]'>
                                            <h2 className='text-white font-bold text-[35px]'>
                                                {product.name}
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Product Id: <span className='font-normal'>{product.productId}</span>
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Cost: $<span className='font-normal'>{product.cost}</span>
                                            </h2>

                                            <h2 className='text-white font-bold text-[15px]'>
                                                Smart Contract Link: <span className='font-normal' onClick={() => window.open(product.contractLink && product.contractLink)}>{product.contractLink && product.contractLink.substring(0, 40)}...</span>
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Owner Email: <span className='font-normal'>{product.coustmer}</span>
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Brand Name: <span className='font-normal'>{product.brandId.brandName}</span>
                                            </h2>
                                           
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Date of sale: <span className='font-normal'>{dayjs(product.SDate).format('DD-MM-YYYY')}</span>
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                City: <span className='font-normal'>{product.city}</span>
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Country: <span className='font-normal'>{product.country}</span>
                                            </h2>
                                            <h2 className='text-white font-bold text-[15px]'>
                                                Branch: <span className='font-normal'>{product.branch}</span>
                                            </h2>
                                        </div>
                                    </div>
                                )}


                            </Box>
                        </Box>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProductModal;
