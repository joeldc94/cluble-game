import { deleteClubIdList } from "@/utils/kv-club";
import { updateCurrentClub } from "@/utils/update-current-club"
import { revalidatePath } from "next/cache";

export async function GET() {
    await deleteClubIdList();
	const result = await updateCurrentClub();
	revalidatePath('/');
	return Response.json(result)

}