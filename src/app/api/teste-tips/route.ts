import { checkAnswer } from "@/actions/check-answer";
import { getClubById } from "@/utils/get-club";
import { getClubIdByGameId } from "@/utils/sql-games";
import { NextRequest } from "next/server";

//export const dynamic = 'force-dynamic'
export async function POST(request: NextRequest) {
    //tenho que receber o gameId
    // receber o array de respostas = estado
    // 

    const body = await request.json();
    const { gameId, /* state, */ answersArray, rightAnswer } = body;
    console.log({ gameId }, { answersArray });
    const clubId = await getClubIdByGameId(gameId);
    console.log({ clubId });
    if (!clubId) return Response.json("Clube não encontrado");

    const club = await getClubById(clubId);

    const tips = [
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
    ]

    const state = answersArray.length;

    let lastAnswer = ""
    let right = false;
    if (state > 0) {
        lastAnswer = answersArray[length - 1]
        const resp = await checkAnswer({ clubName: lastAnswer })
        right = resp.rightAnswer;
    }

    if (!right)
        tips.splice(state + 1);
    console.log({ tips })

    return Response.json({ tips });
}