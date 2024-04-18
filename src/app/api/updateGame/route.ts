import { updateCurrentGame } from "@/utils/update-current-club";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic'

export async function GET() {
	const result = await updateCurrentGame();
	revalidatePath('/');
	return Response.json(result)
}