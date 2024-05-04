import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import QRCode from 'qrcode';


const QRCodeGeneratorModal = ({ open, setOpen, productId }) => {

    const qrRef = useRef(null);

    useEffect(() => {
        QRCode.toCanvas(qrRef.current, productId, { errorCorrectionLevel: 'M' });
    }, [productId]);

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
                                    maxWidth: '400px',
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

                                <div className='px-[10px] pb-[20px] pt-[30px] space-y-[15px]'>

                                    <div className='w-full h-[170px] flex justify-center items-center'>
                                        <canvas ref={qrRef}
                                            style={{
                                                height: '300px',
                                            }}
                                        />
                                    </div>


                                </div>

                            </Box>
                        </Box>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default QRCodeGeneratorModal;
