import { createTheme, colors } from "@mui/material";

/******************************************************************************
    THEME
*******************************************************************************/
const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#75868a",
            dark: "#465153",
            light: "#d6dbdc",
        },
        
    },
    typography: {
        button: {
            textTransform: 'none', // Set text transform to none for buttons
          },
    },
    components: {
        // MuiButton: {
        //     variants: [
        //         {
        //             props: {
        //                 variant: "outlined",
        //             },
        //             style: {
        //                 fontSize: 14,
        //             },
        //         },
        //     ],
        //     styleOverrides: {
        //         root: {
        //             "& .MuiTouchRipple-root": {
        //                 color: "#75868a",
        //             },
                    
        //         },
        //     },
        // },
    },
});

export default theme;