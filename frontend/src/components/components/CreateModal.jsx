import { Box, TextField } from '@mui/material';
import { motion } from 'framer-motion';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StyledCalendar } from '../../pages/brand/style';
import SaveCreateModal from './SaveCreateModal';


const CreateModal = ({ open, setOpen, productData }) => {


    const [saveCreateOpen, setsaveCreateOpen] = useState(false)

    const [data, setdata] = useState({
        name: '',
        cost: '',
        MDate: dayjs(new Date(new Date().getTime())),
        SDate: dayjs(new Date(new Date().getTime())),
        coustmer: '',
        city: '',
        country: '',
        branch: '',
        wallet: '',
        passport: '',
        idNumber: ''
    })

    useEffect(() => {
        if (productData) {
            setdata({
                name: productData.name || '',
                cost: productData.cost || '',
                MDate: dayjs(new Date(productData.MDate)) || dayjs(),
                SDate: dayjs(new Date(productData.SDate)) || dayjs(),
                coustmer: productData.coustmer || '',
                city: productData.city || '',
                country: productData.country || '',
                branch: productData.branch || '',
                wallet: productData.wallet || '',
                passport: productData.passport || '',
                idNumber: productData.idNumber || '',
            });
        }
    }, [productData]);


    const handleInputChange = (field, value) => {
        setdata((prevData) => ({ ...prevData, [field]: value }));
    };


    return (
        <div>

            <SaveCreateModal open={saveCreateOpen} setOpen={setsaveCreateOpen} data={data} handleInputChange={handleInputChange} setdata={setdata} productData={productData} />

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
                                    maxWidth: '600px',
                                    background: '#343434',
                                    borderRadius: '23px',
                                    maxHeight: { xs: '600px', lg: '670px', xl: '100%' },
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


                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        setsaveCreateOpen(true)
                                        setOpen(false)
                                    }}
                                    className="px-[10px] pb-[20px] pt-[30px] space-y-[15px]">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={data.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Cost "
                                        value={data.cost}
                                        required
                                        onChange={(e) => handleInputChange('cost', e.target.value)}
                                        className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Customer Email"
                                        value={data.coustmer}
                                        required
                                        onChange={(e) => handleInputChange('coustmer', e.target.value)}
                                        className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                    />

                                   
                                    <div>
                                        <h2 className='text-white text-[16px] font-medium pb-[4px]'>
                                            Sale date
                                        </h2>
                                        <StyledCalendar>
                                            <div className='relative'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                    <DatePicker
                                                        value={data.SDate}
                                                        minDate={new Date()}
                                                        onChange={(date) => handleInputChange('SDate', date)}
                                                        DialogProps
                                                        inputProps={{ readOnly: true }}
                                                        renderInput={(params) => <TextField required {...params} fullWidth />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </StyledCalendar>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={data.city}
                                        required
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        value={data.country}
                                        required
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Store branch"
                                        value={data.branch}
                                        required
                                        onChange={(e) => handleInputChange('branch', e.target.value)}
                                        className="w-full bg-slate-500 outline-none rounded-[10px] px-[15px] py-[10px] text-white font-medium text-[16px] placeholder-white placeholder-opacity-50"
                                    />
                                    <div className="pt-[10px]">
                                        <button
                                            type='submit'
                                            className="w-full text-white bg-red-500 text-[18px] font-medium h-[40px] rounded-[10px] duration-700 "
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>


                            </Box>
                        </Box>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CreateModal;
