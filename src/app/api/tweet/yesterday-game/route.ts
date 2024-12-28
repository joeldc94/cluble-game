import { getYesterdayGame } from "@/utils/sql-games";
import { postTweet } from "@/utils/twitterFunction";
import { NextRequest } from "next/server";
import "server-only";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }
    const gameData = await getYesterdayGame();
    //console.log({ gameData })
    if(!gameData) return new Response('Nenhuma partida encontrada', { status: 404 });
    const message = `Ontem, na edição #${gameData.id} do Cluble, tivemos o ${gameData.Clubs.fullName} como clube do dia. O clube da cidade de ${gameData.Clubs.city} - ${gameData.Clubs.state} joga a ${gameData.Clubs.division} do Brasileirão 2024!`
    //console.log({jogodeontem})
    const xResponse = await postTweet(message);
    return Response.json({response: xResponse, message})
}