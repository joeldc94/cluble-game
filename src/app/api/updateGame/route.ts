import "server-only";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { updateCurrentGame } from "@/utils/update-current-club";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}
	const result = await updateCurrentGame();
	revalidatePath('/');
	return Response.json(result)
}