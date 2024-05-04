import { CircularProgress, Switch } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import OwnerShipModal from "../../components/components/OwnerShipModal";
import { BACKEND_URL } from "../../constant";
import dayjs from "dayjs";
import ProductModal from "../../components/components/ProductModal";
import { motion } from 'framer-motion';

import img from '../../assets/logo.png'



const Purchases = () => {

    const queryClient = useQueryClient()

    const tableHead = ['Product ID', 'brand Name', 'item Name', 'cost', 'sale date', 'smart contract details', 'ownership', 'private information']

    const [open, setopen] = useState(false)
    const [productId, setproductId] = useState('')
    const [productOpen, setproductOpen] = useState('')
    const [productData, setproductData] = useState('')

    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    const { data, isLoading } = useQuery({
        queryKey: 'product',
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/product/customer`, {
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



    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/product/update`, {
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
                queryClient.invalidateQueries('product')
            }
        },


    })



    return (
        <div className="flex max-w-[100vw] md:min-h-screen overflow-hidden w-full">

            <OwnerShipModal open={open} setOpen={setopen} productId={productId} />


            <ProductModal open={productOpen} setOpen={setproductOpen} product={productData} value={true} />

            <Sidebar customer={true} />
            <div className="relative mx-auto w-full  mt-[100px] md:mt-0">
                <div className="absolute hidden md:flex top-[10px] left-0 right-0 justify-center">
                    <img src={img} alt="" className="h-[80px]" />
                </div>

                <div className="w-full md:mt-[200px]">
                    <div className='max-w-[700px] xl:max-w-[1000px] mx-auto px-[40px] mt-[40px] mb-[40px]'>
                        <motion.div
                            whileInView={{ y: [70, 0], opacity: [0, 1] }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            initial='hidden'
                            style={{
                                opacity: 0,
                            }}
                            viewport={{ once: true }}

                        >
                            <div className='flex flex-col items-center w-full p-[15px] rounded-[10px] bg-[#343434]'
                                style={{
                                    border: '1px solid rgba(217, 217, 217, 0.50)',

                                }}
                            >
                                <div className={`relative rounded-[10px] w-full overflow-x-auto max-h-[500px]`}

                                >

                                    <table className="min-w-[1400px] w-full">
                                        <thead className="text-[14px] font-medium text-[#87909C]" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                                            <tr className='border-b-[0.5px] border-gray-700'>
                                                {tableHead.map((item, i) => (
                                                    <th scope="col" className={`py-[16px] px-[30px] text-center`} key={i}>
                                                        {item}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {data && data.products.length > 0 && data.products.map((item, i) => (
                                                <tr
                                                    key={i}
                                                    style={{
                                                        background: 'rgba(255, 255, 255, 0.04)'
                                                    }}
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setproductData(item)
                                                        setproductOpen(true)
                                                    }}
                                                >
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        {item.productId}
                                                    </td>
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        {item.brandId.brandName}
                                                    </td>
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        {item.name}
                                                    </td>
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        ${item.cost}
                                                    </td>

                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        {dayjs(item.SDate).format('DD-MM-YYYY')}

                                                    </td>
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        {item.contractLink && item.contractLink.substring(0, 15) + '...'}

                                                    </td>
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                        <div className="flex justify-center" onClick={(e) => {
                                                            e.stopPropagation()
                                                            setopen(true)
                                                            setproductId(item.productId)
                                                        }}>
                                                            <button className="bg-red-500 duration-700 text-white text-[12px] h-[30px] w-[115px] rounded-[10px]">
                                                                change Ownership
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-white text-center py-[15px] text-[16px] font-medium flex justify-center">
                                                        <div
                                                            onClick={() => {
                                                                mutation.mutate({ ...item, private: !item.private, productId: item._id })
                                                            }}
                                                        >
                                                            <Switch {...label} checked={item.private} />
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}

                                            <tr
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.04)',
                                                }}
                                            >
                                                {isLoading && (
                                                    <td colSpan={'9'} className="py-[85px] text-center">
                                                        <CircularProgress sx={{ color: 'white' }} />
                                                    </td>
                                                )}

                                                {!isLoading && data && data.products.length === 0 && (
                                                    <td colSpan={'9'} className="text-[15px] py-[100px] font-medium text-[#87909C] text-center">
                                                        No products yet!
                                                    </td>
                                                )}

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Purchases