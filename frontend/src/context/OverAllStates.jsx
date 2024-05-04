import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import StatesContext from "./StatesContext";


const OverAllStates = (props) => {

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    let user = ''

    const loggedInTime = localStorage.getItem('LoggedInTime')
    const authUserString = localStorage.getItem('authUser')

    if (loggedInTime && authUserString) {
        const currentDate = new Date().getTime()
        if ((loggedInTime + 604800000) > currentDate) {
            user = JSON.parse(authUserString)
        } else {
            localStorage.removeItem('LoggedInTime')
            localStorage.removeItem('authUser')
        }
    }

    const defaultStates = {
        user,
        success: '',
        error: '',
        isSideBarOpen: false,
    }


    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${BACKEND_URL}/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        },
        onSuccess: () => {
            navigate('/')
            localStorage.removeItem('authUser');
            localStorage.removeItem('LoggedInTime')
            queryClient.clear()
            handleStateChange({ user: '' })
        }

    })

    const [state, setstate] = useState(defaultStates)

    const handleStateChange = (value) => {

        setstate((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleLogout = () => {

        localStorage.removeItem('admin')
        mutation.mutate()

    }

    return (
        <StatesContext.Provider
            value={{
                state,
                handleStateChange,
                handleLogout
            }}>
            {props.children}
        </StatesContext.Provider>
    )
}
export default OverAllStates;