import { TrashIcon } from "@heroicons/react/24/solid";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import { BACKEND_URL } from "../../constant";


const AdminUsers = () => {

    const tableHead = ['ID', 'Name', 'email', 'role', 'passport', 'idNumber', 'brandName', 'brandId', 'actions']
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: 'user',
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/admin/users`, {
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
            return fetch(`${BACKEND_URL}/api/admin/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess() {
            queryClient.invalidateQueries('user')
            queryClient.invalidateQueries('customercount')
            queryClient.invalidateQueries('brandcount')
        },


    })

    return (
        <div className="flex min-h-screen max-w-[100vw] overflow-hidden w-full">

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
                                    {data && data.user.length > 0 && data.user.map((item, i) => (
                                        <tr
                                            key={i}

                                        >
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item._id}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.name}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.email}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.role}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.passport}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.idNumber}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.brandName}
                                            </td>
                                            <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                                {item.brandId}
                                            </td>

                                            <td className="text-white text-center py-[15px] text-[16px] font-medium flex items-center gap-[10px] justify-center">

                                                <TrashIcon className="text-white h-[20px] cursor-pointer"
                                                    onClick={() => {
                                                        if (!mutation.isPending) {
                                                            mutation.mutate({ userId: item._id })
                                                        }
                                                    }}
                                                />
                                            </td>

                                        </tr>
                                    ))}

                                    <tr

                                    >
                                        {isLoading && (
                                            <td colSpan={'9'} className="py-[85px] text-center">
                                                <CircularProgress sx={{ color: 'white' }} />
                                            </td>
                                        )}
                                        {!isLoading && data && data.user.length === 0 && (
                                            <td colSpan={'9'} className="text-[15px] py-[100px] font-medium text-[#87909C] text-center">
                                                No user yet!
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

export default AdminUsers