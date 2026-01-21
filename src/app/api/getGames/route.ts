import { getAllGameHistory } from "@/utils/sql-games"

export const dynamic = 'force-dynamic'
export async function GET() {
    const list = (await getAllGameHistory()) ?? [];
    const lastGame = list.at(-1);
    const lastGameCounter = lastGame?.id ?? 0;
    const usedClubIds = list
        .map(game => game.clubId)
        .filter((id): id is number => id !== undefined);
    return Response.json({ list, lastGameCounter, usedClubIds });
}