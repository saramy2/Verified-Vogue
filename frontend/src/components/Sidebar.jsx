import { Bars3Icon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import StatesContext from '../context/StatesContext';
import FailedQrModal from './components/FailedQrModal';
import ProductModal from './components/ProductModal';
import QRCodeModal from './components/QrCodeModal';


const brandRoutes = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Scan Qr Code',
    },
    {
        name: 'Brand Profile',
        route: '/brand/profile'
    },
    {
        name: 'Manage Product',
        route: '/brand/product'
    },
    {
        name: 'Logout',
        route: '/'
    }
]

const customerRoutes = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Scan Qr Code',
    },
    {
        name: 'User Profile',
        route: '/customer/profile'
    },
    {
        name: 'Purchases',
        route: '/customer/purchases'
    },
    {
        name: 'Logout',
        route: '/'
    }
]

const adminRoutes = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Dashboard',
        route: '/admin/dashboard'
    },
    {
        name: 'Manage Users',
        route: '/admin/users'
    },
    {
        name: 'Manage Product',
        route: '/admin/products'
    },
    {
        name: 'Logout',
        route: '/'
    }
]


const PublicRoutes = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Scan Qr Code',
    },



]

const Sidebar = ({ customer, isAdmin }) => {

    const context = useContext(StatesContext)
    const { handleLogout, state, handleStateChange } = context

    const navigate = useNavigate()


    let x = PublicRoutes
    if (state.user) {
        if (isAdmin) {
            x = adminRoutes
        } else {
            x = customer ? customerRoutes : brandRoutes
        }
    }

    const { pathname } = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isSmallerScreen = window.innerWidth < 768

    const [open, setopen] = useState(false)
    const [data, setData] = useState('');
    const [opensold, setopensold] = useState(false)
    const [productData, setproductData] = useState('')
    const [openPrductModal, setopenPrductModal] = useState('')
    const [routes, setroutes] = useState(x)



    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        let routes = x
        if (state.user) {
            if (state.user.role === 'admin') {
                routes = adminRoutes
            } else {
                routes = state.user.role === 'customer' ? customerRoutes : brandRoutes
            }
        } else {
            routes = PublicRoutes
        }
        setroutes(routes)

    }, [state])


    return (

        <div className='md:h-full '>
            {(state.isSideBarOpen || isSmallerScreen) && (
                <div className={`md:min-h-screen flex-shrink-0 bg-[#343434] ${isSidebarOpen ? 'fixed inset-0 z-50 h-full' : 'fixed top-0 left-0 right-0 md:h-full md:relative md:w-[300px]'} `}>


                    {open && (
                        <QRCodeModal open={open} setOpen={setopen} data={data} setData={setData} setopensold={setopensold} setproductData={setproductData} productData={productData} setopenPrductModal={setopenPrductModal} />
                    )}

                    <FailedQrModal open={opensold} setOpen={setopensold} />

                    {openPrductModal && (
                        <ProductModal open={openPrductModal} setOpen={setopenPrductModal} product={productData} />
                    )}


                    <div className='hidden md:flex justify-end gap-[10px] p-[8px]'>
                        <Bars3Icon className='text-red-500 h-[30px] cursor-pointer'
                            onClick={() => handleStateChange({ isSideBarOpen: false })}
                        />

                    </div>
                    <div className='flex justify-between items-center md:justify-normal md:hidden'>
                        <div className='flex md:justify-center md:py-[20px] ml-[10px]'>
                            <img src={logo} alt="" className='h-[50px] md:h-[100px]' />
                        </div>
                        <div className="flex justify-end p-4 md:hidden">
                            {isSidebarOpen ? (
                                // Render cross icon if the sidebar is open
                                <FaTimes className="text-white text-[25px] cursor-pointer" onClick={() => {
                                    handleToggleSidebar()
                                }} />
                            ) : (
                                // Render menu icon if the sidebar is closed
                                <div className='relative z-50'


                                >
                                    <FaBars className="text-white text-[25px] cursor-pointer" onClick={() => {
                                        handleStateChange({ isSideBarOpen: false })
                                        handleToggleSidebar()
                                    }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>



                    <div className='px-[10px] pt-[100px] space-y-[19px] hidden md:block'>
                        {routes.map((route, index) => (
                            <div key={index} className={`text-[15px] hover:scale-95 duration-700 font-semibold cursor-pointer py-[7px] rounded-[10px] px-[20px] ${pathname === route.route ? 'bg-white' : 'bg-slate-400 '} `}
                                onClick={() => {

                                    if (route.name === 'Logout') {
                                        handleLogout()
                                    } else {
                                        if (route.route) {
                                            navigate(route.route)
                                        } else {
                                            setData('')
                                            setopen(true)
                                            setopensold(false)
                                            setproductData('')
                                        }
                                    }
                                }}
                            >
                                {route.name}
                            </div>
                        ))}

                    </div>


                    {isSidebarOpen && (
                        <div className='px-[10px] pt-[20px] space-y-[25px] mt-[50px]'>
                            {routes.map((route, index) => (
                                <div key={index} className={`text-[15px] text-white hover:scale-95 duration-700 font-semibold cursor-pointer py-[7px] rounded-[10px] px-[20px] ${pathname === '/brand/profile' ? 'bg-sky-800' : 'bg-slate-700 '} `}
                                    onClick={() => {
                                        if (route.name === 'Logout') {
                                            handleLogout()
                                        } else {
                                            navigate(route.route)
                                        }
                                    }}
                                >
                                    {route.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
