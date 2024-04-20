import { deleteGamesList } from "@/utils/kv-games";
import { updateCurrentGame } from "@/utils/update-current-club";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}
	const del = await deleteGamesList();
	//console.log({del});
	const result = await updateCurrentGame();
	revalidatePath('/');
	return Response.json(result)

}