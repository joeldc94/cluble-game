"use server"
import "server-only";
import { getCurrentClubData } from "@/utils/get-club";

interface checkAnswerProps {
    clubName: string;
}

export async function checkAnswer({ clubName } : checkAnswerProps) {
    const club = await getCurrentClubData();
    if(clubName.toLowerCase() == club?.name.toLowerCase()){
        return {
            rightAnswer: true
        }
    }
    else{
        return {
            rightAnswer: false
        }
    }
}