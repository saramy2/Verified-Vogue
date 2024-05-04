import { useContext, useEffect, useState } from "react";
import StatesContext from "../context/StatesContext";

const UserData = ({ search, data, setemail }) => {

    const context = useContext(StatesContext)
    const { state } = context

    const dataArray = Object.values(data);
    const [filteredData, setFilteredData] = useState([]);
    const [open, setopen] = useState(true)
    const [selectedItem, setselectedItem] = useState('')

    useEffect(() => {

            const filtered = dataArray.filter(
                (item) =>
                    item.email.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);

 }, [search]);


 useEffect(() => {
    if (search === selectedItem && open) {
        setopen(false);
    } else if (search !== selectedItem && !open) {
        setopen(true);
    }
}, [search, selectedItem, open]);



    return (
        <>
            {open && search && filteredData.length > 0 && (
                <div className='absolute left-0 right-0 top-[40px] sm:top-[45px] bg-white shadow-sm z-30'
                    style={{
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}
                >
                    <div className='h-[150px] overflow-auto w-full sm:mt-[4px]'>
                        {filteredData.length > 0 && filteredData.map((item, i) => (
                            <div key={i}
                                onClick={() => {
                                    setselectedItem(item.email)
                                    setemail(item.email)
                                }}
                                style={{
                                    display : item.email === state.user.email ? 'none' : 'block'
                                }}
                                className="cursor-pointer px-[20px] py-[8px] hover:bg-slate-50 duration-700">
                                <h2 className="text-[12px] sm:text-[15px]">
                                    {item.email}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserData;
