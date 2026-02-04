"use server";
import "server-only";
import { getClubDataByGameId } from "@/utils/sql-games";

interface GetTipsProps {
    gameId: string;
    state: number;
    answer?: string;
    rightAnswer?: boolean;
}

export async function getTips({
    gameId,
    state,
    answer,
    rightAnswer,
}: GetTipsProps) {
    const club = await getClubDataByGameId(gameId);

    if (!club)
        return {
            success: false,
            message: "Não foi possível identificar o clube de hoje",
            tips: []
        };

    const tips: Tip[] = [
        {
            label: "Cores",
            value: club.colors,
        },
        {
            label: "Mascote",
            value: club.mascot,
        },
        {
            label: "Ano de fundação",
            value: club.foundationYear,
        },
        {
            label: "Estádio",
            value: club.stadium,
        },
        {
            label: "Estado",
            value: club.state,
        },
    ];

    let checkRightResponse = !!rightAnswer

    if (!!answer && !checkRightResponse) {
        if (answer.toLowerCase() == club?.name.toLowerCase()) {
            checkRightResponse = true;
        }
    }

    if (checkRightResponse) {
        return {
            success: true,
            message: "Resposta correta",
            userAnswer: answer,
            rightAnswer: true,
            clubData: club,
            tips,
        };
    }
    if ((answer || answer == "") && !checkRightResponse && state < 5) {
        //divulga proxima dica
        tips.splice(state + 1);
        return {
            success: true,
            message: answer ? "Resposta incorreta" : "Próxima dica revelada",
            userAnswer: answer,
            rightAnswer: false,
            clubData: null,
            tips,
        };
    }
    if (state >= 5 && !checkRightResponse) {
        return {
            success: true,
            message: "Resposta não encontrada",
            userAnswer: answer,
            rightAnswer: false,
            clubData: club,
            tips,
        };
    }

    tips.splice(state + 1);
    return {
        success: true,
        message: "Retornando dicas",
        userAnswer: null,
        rightAnswer: false,
        clubData: null,
        tips,
    };
}
