import "server-only";
import { deleteGamesList } from "@/utils/sql-games";
import { updateCurrentGame } from "@/utils/update-current-club";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}
	const del = await deleteGamesList();
    const leagueIdParam = request.nextUrl.searchParams.get('leagueId');
    const leagueId = parseInt(leagueIdParam!);
    if (!leagueIdParam || !leagueId) return new Response('Nenhum Id de jogo informado', { status: 400 });
    console.log("Atualizar jogo:", leagueId)
    const result = await updateCurrentGame(leagueId);
    //console.log({result})
	revalidatePath('/');
	return Response.json(result)

}