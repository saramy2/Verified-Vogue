import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import { BACKEND_URL } from "../../constant";
import { CircularProgress } from "@mui/material";


const AdminDashboard = () => {


    const { data, isLoading } = useQuery({
        queryKey: 'customercount',
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/customer/count`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                async (res) => await res.json()
            );
        },
    })

    const { data: brand, isLoading: brandLoading } = useQuery({
        queryKey: 'brandcount',
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/brand/count`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                async (res) => await res.json()
            );
        },
    })


    return (
        <div className="flex min-h-screen max-w-[100vw] overflow-hidden w-full">

            <Sidebar isAdmin={true} />

            <div className="flex w-full justify-center items-center">
                {(isLoading || brandLoading) ? (
                    <CircularProgress sx={{ color: 'red' }} />
                ) : (
                    <div className="flex justify-center flex-wrap gap-[30px]">
                        <div className="flex justify-center items-center w-full sm:w-[400px] h-[200px] rounded-[20px] bg-[#343434]">
                            <div>
                                <h2 className="text-white text-[30px] font-bold">
                                    Customers
                                </h2>
                                <h2 className="text-white text-center text-[30px] font-bold">
                                    {data.customerCount}
                                </h2>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-[400px] h-[200px] rounded-[20px] bg-red-300">
                            <div>
                                <h2 className="text-white text-[30px] font-bold">
                                    Brands
                                </h2>
                                <h2 className="text-white text-center text-[30px] font-bold">
                                    {brand.brandCount}
                                </h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default AdminDashboard