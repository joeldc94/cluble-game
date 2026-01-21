"use server"
import "server-only";
import { getLastGame } from "@/utils/sql-games";

interface CheckAnswerProps {
    clubName: string;
}

export async function checkAnswer(props: CheckAnswerProps) {
    const response = await getLastGame()
    const club = response?.Clubs
    if (props.clubName.toLowerCase() == club?.name.toLowerCase()) {
        return {
            rightAnswer: true
        }
    }
    else {
        return {
            rightAnswer: false
        }
    }
}