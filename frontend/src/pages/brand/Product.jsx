import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreateModal from "../../components/components/CreateModal";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "../../constant";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import QRCodeGeneratorModal from "../../components/components/QrCodeGeneratorModal";

import img from '../../assets/logo.png'



const Product = () => {

    const tableHead = ['Product ID', 'Name', 'cost', 'sale date', 'coustmer email', 'city', 'country', 'store branch', 'smart contract details', 'QR Code', 'Edit']

    const [open, setopen] = useState(false)
    const [productData, setproductData] = useState('')
    const [openQrModal, setopenQrModal] = useState(false)
    const [productId, setproductId] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: 'product',
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/product/brand`, {
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


    return (
        <div className="flex min-h-screen max-w-[100vw] overflow-hidden w-full">
            <CreateModal open={open} setOpen={setopen} isUpdated={true} productData={productData} />

            {
                openQrModal && (
                    <QRCodeGeneratorModal open={openQrModal} setOpen={setopenQrModal} productId={productId} />
                )
            }

            <Sidebar />
            <div className="relative mx-auto w-full  mt-[200px] md:mt-0">

                <div className="absolute hidden md:flex top-[10px] left-0 right-0 justify-center">
                    <img src={img} alt="" className="h-[80px]" />
                </div>

                <div className='max-w-[700px] md:mt-[200px] xl:max-w-[1100px] mx-auto px-[40px] '>
                    <div className='flex flex-col items-center w-full p-[15px] rounded-[10px]'
                        style={{

                            background: '#343434'

                        }}
                    >
                        <div className={`relative rounded-[10px] w-full overflow-x-auto max-h-[500px]`}

                        >

                            <table className="min-w-[1600px] w-full"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.04)'
                                }}
                            >
                                <thead className="text-[14px] font-medium text-[#87909C]">
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

                                        >
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.productId}
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
                                                {item.coustmer}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.city}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.country}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.branch}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.contractLink && item.contractLink.substring(0, 15) + '...'}
                                            </td>
                                            <td className="text-white text-center font-medium">
                                                <button
                                                    onClick={() => {
                                                        setopenQrModal(true)
                                                        setproductId(item._id)
                                                    }}
                                                    className="bg-gray-600 duration-700 text-white text-[12px] h-[30px] w-[70px] rounded-[5px]">
                                                    Generate
                                                </button>

                                            </td>

                                            <td className="text-white text-center py-[15px] text-[16px] font-medium flex justify-center">
                                                <PencilIcon className="text-white h-[20px] cursor-pointer"
                                                    onClick={() => {
                                                        setproductData(item)
                                                        setopen(true)
                                                    }}
                                                />
                                            </td>

                                        </tr>
                                    ))}

                                    <tr

                                    >
                                        {isLoading && (
                                            <td colSpan={'11'} className="py-[85px] text-center">
                                                <CircularProgress sx={{ color: 'white' }} />
                                            </td>
                                        )}
                                        {!isLoading && data && data.products.length === 0 && (
                                            <td colSpan={'11'} className="text-[15px] py-[100px] font-medium text-[#87909C] text-center">
                                                No products yet!
                                            </td>
                                        )}

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end mt-[20px]" onClick={() => {
                        setopen(true)
                        setproductData('')
                    }}>
                        <button className="bg-red-500 duration-700 text-white text-[17px] h-[37px] w-[100px] rounded-[10px]">
                            Add
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product