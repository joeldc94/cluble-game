import { deleteGamesList } from "@/utils/kv-games";
import { updateCurrentGame } from "@/utils/update-current-club";
import { revalidatePath } from "next/cache";

export async function GET() {
    await deleteGamesList();
	const result = await updateCurrentGame();
	revalidatePath('/');
	return Response.json(result)

}