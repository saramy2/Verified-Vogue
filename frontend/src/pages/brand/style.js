import { Box, Slider, styled } from "@mui/material";


const StyledCalendar = styled(Box)(({ theme }) => ({

    "& .MuiOutlinedInput-input": {
        color: 'black',
        backgroundColor: '#f2f7fb',
        fontSize: '15px',
        padding: '10px 20px',
        borderRadius: '10px',


    },
    "& .MuiInputLabel-root": {
        color: 'black !important',
        fontSize: '15px',
        '&:focus': {
            color: 'black !important',
        },
        '&:invalid': {
            color: 'black !important',
        },

    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        color: 'black',
        border: '1px solid transparent !important',
        borderRadius: '20px',
        '&:invalid': {
            border: '1px solid transparent !important',
        },
        '&:active': {
            border: '1px solid transparent !important',
        },
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: '1px solid transparent !important',
    },
    "&:focus .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: '1px solid transparent !important',
    },

    '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '25px',
        marginRight: '5px'
    },
}))


export {
    StyledCalendar
};
