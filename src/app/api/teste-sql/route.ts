
import { addNewGame, deleteGamesList, getAllGameHistory, getGamesListLenght, getLastGame, getLastGameClubId, getLastGameId } from "@/utils/sql-games"

export const dynamic = 'force-dynamic'
export async function GET() {
    /* const game = await addNewGame({
        gameId: '56789',
        clubId: 6,
        gameCounter: 2        
    }) */
    //
    //const game = await getLastGame();
    //
    //const game = await getLastGameId();
    //
    //const game = await getLastGameClubId();
    //
    //const game = await getGamesListLenght();
    //
    const game = await getAllGameHistory();
    //
    //const game = await deleteGamesList();
    console.log({game});
    return Response.json({ game }) 
}