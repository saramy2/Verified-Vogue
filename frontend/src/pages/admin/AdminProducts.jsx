import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreateModal from "../../components/components/CreateModal";
import { BACKEND_URL } from "../../constant";


const AdminProducts = () => {

    const tableHead = ['Product ID', 'Name', 'cost', 'sale date', 'coustmer email', 'city', 'country', 'store branch', 'smart contract details', 'Edit']
    const queryClient = useQueryClient()

    const [open, setopen] = useState(false)
    const [productData, setproductData] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: 'product',
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/admin/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                async (res) => await res.json()
            );
        },
    })

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/admin/products`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess() {
            queryClient.invalidateQueries('product')
        },


    })

    return (
        <div className="flex min-h-screen max-w-[100vw] overflow-hidden w-full">
            <CreateModal open={open} setOpen={setopen} isUpdated={true} productData={productData} />

            <Sidebar isAdmin={true} />
            <div className="w-full mt-[100px]">
                <div className='max-w-[700px] xl:max-w-[1100px] mx-auto px-[40px] mt-[40px] mb-[40px]'>
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

                                            <td className="text-white text-center py-[15px] text-[16px] font-medium flex items-center gap-[10px] justify-center">
                                                <PencilIcon className="text-white h-[20px] cursor-pointer"
                                                    onClick={() => {
                                                        setproductData(item)
                                                        setopen(true)
                                                    }}
                                                />
                                                <TrashIcon className="text-white h-[20px] cursor-pointer"
                                                    onClick={() => {
                                                        if (!mutation.isPending) {
                                                            mutation.mutate({ productId: item._id })
                                                        }
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



                </div>
            </div>
        </div>
    )
}

export default AdminProducts