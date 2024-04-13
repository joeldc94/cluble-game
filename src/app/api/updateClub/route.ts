import { updateCurrentClub } from "@/utils/update-current-club"
import { revalidatePath } from "next/cache";

export async function GET() {
	const result = await updateCurrentClub();
	revalidatePath('/');
	return Response.json(result)
}