import { getAllGameHistory } from "@/utils/kv-games"

export const dynamic = 'force-dynamic'
export async function GET() {
    const list = await getAllGameHistory();
    //let lastGame: GameData;
    let lastGameCounter: number = 0;
    let usedClubIds: number[] = [];

    if (list && list.length > 0) {
        const lastGame = list[list.length - 1];
        lastGameCounter = lastGame.gameCounter || 0;
        usedClubIds = list?.map((game) => game.clubId);
    }
    //console.log({ lastGameCounter });
    //console.log({ usedClubIds })
    //console.log("API", { list, lastGameCounter, usedClubIds })
    return Response.json({ list })
}