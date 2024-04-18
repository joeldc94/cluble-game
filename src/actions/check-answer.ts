"use server"
import "server-only";
import { getCurrentClubData, getCurrentGameData } from "@/utils/get-club";

interface checkAnswerProps {
    clubName: string;
}

export async function checkAnswer({ clubName }: checkAnswerProps) {
    //console.log("Checar a resposta: ", clubName);
    const { club } = await getCurrentGameData()
    //console.log({ club })
    if (clubName.toLowerCase() == club?.name.toLowerCase()) {
        //console.log("RESPOSTA CERTA")
        return {
            rightAnswer: true
        }
    }
    else {
        //console.log("RESPOSTA ERRADA")
        return {
            rightAnswer: false
        }
    }
}