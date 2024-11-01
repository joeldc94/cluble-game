"use server"
import "server-only";
import { v4 as uuidv4 } from 'uuid';
import { getRandomClub } from '@/utils/get-club';
import { clubs } from '@/data/clubs';
import { addNewGame, getLastGamesHistory } from "./sql-games";
const GAMES_COUNT = 100;

interface UpdateCurrentGameResult {
    success: boolean;
    club?: ClubData;
    game?: GameData;
    message?: string;
}
/** Escreve um novo Id de clube na lista de clubes */
export async function updateCurrentGame(): Promise<UpdateCurrentGameResult> {
    let message: string = '';
    try {
        // Ler a lista  de clues utilizados
        //const gamesListSaved = await getAllGameHistory();
        const gamesListSaved = await getLastGamesHistory(GAMES_COUNT);
        console.log("update", { gamesListSaved })

        let lastGame: GameData;
        let lastGameCounter: number = 0;
        let usedClubIds: number[] = [];

        if (gamesListSaved && gamesListSaved.length > 0) {
            //pegar o primeiro id se estiver solicitando uma lista limitada em ordem descendente de id
            lastGame = gamesListSaved[0];
            //se estiver solicitando a lista completa, pega o ultimo
            //lastGame = gamesListSaved[gamesListSaved.length - 1];
            lastGameCounter = lastGame.id || 0;
            usedClubIds = gamesListSaved?.map((game) => game.clubId);
        }
        //const gC = await getGameCounter()
        //lastGameCounter = gC || 0;

        // verifica se a lista existe e se é maior do que a lista de clubes cadastrados
        // função desabilitada, pois serão retornados somente os ultimos X clubes do histórico
        /* if (gamesListSaved && gamesListSaved.length >= clubs.length) {
            await deleteGamesList(); // Reiniciar currentClub
            //lastGameCounter = 0;
            usedClubIds = [];
            message = 'Lista reiniciada';
        } */

        let randomClub: ClubData | null = null;

        // Selecionar um clube aleatório cujo ID ainda não foi selecionado
        while (!randomClub) {
            const tempRandomClub = await getRandomClub();
            if (!usedClubIds || !usedClubIds.includes(tempRandomClub.id)) {
                randomClub = tempRandomClub;
            }
        }

        //const date = new Date();
        const newGame = {
            gameId: uuidv4(),
            //gameCounter: gameCounter,
            clubId: randomClub.id,
            //date
        }
        // Adicionar o nova partida
        const gameSet = await addNewGame(newGame);
        
        //await setGameCounter(gameCounter);
        //console.log("Update index:", index)
        return {
            success: true,
            club: randomClub,
            game: gameSet,
            ...(message && { message })
        };
    } catch (error) {
        console.error('Erro ao atualizar  partida:', error);
        return { success: false };
    }

}