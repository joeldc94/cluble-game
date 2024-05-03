"use client"
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Stats } from "./stats";
import EqualizerIcon from '@mui/icons-material/Equalizer';


export const ShowStats = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <EqualizerIcon />
            </IconButton>
            <Stats open={open} handleClose={handleClose} />
        </>
    )
}