"use server"
import "server-only";
import { getLastGame } from "@/utils/sql-games";

interface checkAnswerProps {
    clubName: string;
}

export async function checkAnswer(props: checkAnswerProps) {
    //console.log("Checar a resposta: ", clubName);
    const response = await getLastGame()
    const club = response?.Clubs
    //console.log({ club })
    if (props.clubName.toLowerCase() == club?.name.toLowerCase()) {
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