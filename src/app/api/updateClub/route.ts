import { updateCurrentClub } from "@/utils/update-current-club";

export async function GET() {
    const update = await updateCurrentClub()
    return Response.json(update);
}