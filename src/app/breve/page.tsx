import { Typography, Divider, Box } from "@mui/material";


import localFont from 'next/font/local';

// Define your local font
const myFont = localFont({
    src: [
        {
            path: '../../theme/fonts/old_newspaper/OldNewspaperTypes.ttf', // Path to your regular font
            style: 'normal',
        }
    ],
    variable: '--my-font', // Optional: CSS variable for the font
});


export default function PageBreve() {
    return (
        <>
            <Typography variant="h1" textAlign="center">
                CLUBLE
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    className={myFont.className}
                    sx={{
                        mx: 4,
                        my: 4,
                        width: '80%',
                        height: 400,
                        backgroundColor: 'grey.200',
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        //color: 'common.white',
                        transform: 'rotateX(-20deg) rotateY(5deg)', // Set the tilt angle
                        perspective: 1000, // Set perspective for 3D effect
                        boxShadow: 2, // Optional: Add shadow for depth
                        flexDirection: 'column',
                        p: 4,
                    }}
                >
                    <Typography
                        variant="h2"
                        textAlign="center"
                        style={{ fontFamily: 'var(--my-font)' }} // Apply local font
                        fontSize={'3.8rem'}
                        paragraph
                        sx={{ whiteSpace: 'nowrap' }} // Prevent text wrapping
                    >
                        CLUBLE
                    </Typography>
                    <Typography
                        variant="h2"
                        textAlign="center"
                        style={{ fontFamily: 'var(--my-font)' }} // Apply local font
                        fontSize={'3.8rem'}
                        paragraph
                        sx={{ whiteSpace: 'nowrap' }} // Prevent text wrapping
                    >
                        BREVE
                    </Typography>
                    <Typography
                        variant="h2"
                        textAlign="center"
                        style={{ fontFamily: 'var(--my-font)' }} // Apply local font
                        fontSize={'2.8rem'}
                        paragraph
                        sx={{ whiteSpace: 'nowrap' }} // Prevent text wrapping
                    >
                        VOLTARÁ
                    </Typography>
                </Box>
            </Box>
        </>
    )
}