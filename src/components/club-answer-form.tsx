"use client"
import { ClubData } from "@/data/clubs";
import { Button } from "@mui/material";
import { useState } from "react";

interface TipsProps {
    children: React.ReactNode;
    club: ClubData;
    initialState: number;
}

export default async function ClubAnswerForm({ children, club, initialState }: TipsProps) {
    const [state, setState] = useState<number>(initialState);

    const onSubmit = (e:any) => {
        e.preventDeault();
        setState(prev => prev + 1)
        console.log({state})
    }

    return (
        <>
            {children}
            <form
                onSubmit={(e) => onSubmit(e)}
            >
                <Button>
                    Responder
                </Button>
            </form>


        </>
    )
}