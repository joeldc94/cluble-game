export const dynamic = 'force-dynamic'

import { updateCurrentClub } from "@/utils/update-current-club";

export async function GET() {
    console.log("Chamada da API updateClub");
    const update = await updateCurrentClub()
    return Response.json(update);
}