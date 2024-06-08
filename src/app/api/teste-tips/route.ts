
import { getClubById } from "@/utils/get-club";
import { getClubIdByGameId } from "@/utils/sql-games";
import { NextRequest } from "next/server";

//export const dynamic = 'force-dynamic'
export async function PUT(request: NextRequest) {
    //tenho que receber o estado, o gameId e o palpite. Também pode receber o estado da resposta certa ou não

    const body = await request.json();
    const { gameId, state, answer, rightAnswer } = body;
    const clubId = await getClubIdByGameId(gameId);
    if(!clubId) return Response.json("Clube não encontrado");

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

    tips.splice(state+1);
    console.log({tips})

    return Response.json({tips});
}