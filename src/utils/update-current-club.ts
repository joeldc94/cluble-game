"use server"
import "server-only";
import { v4 as uuidv4 } from 'uuid';
import { getRandomClub } from '@/utils/get-club';
import { clubs } from '@/data/clubs';
import { addNewGame, deleteGamesList, getAllGameHistory } from './kv-games';

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
        const gamesListSaved = await getAllGameHistory();
        //console.log("update", { gamesListSaved })

        let lastGame: GameData;
        let lastGameCounter: number = 0;
        let usedClubIds: number[] = [];

        if (gamesListSaved && gamesListSaved.length > 0) {
            const lastGame = gamesListSaved[gamesListSaved.length - 1];
            lastGameCounter = lastGame.gameCounter || 0;
            //console.log({ lastGameCounter });

            usedClubIds = gamesListSaved?.map((game) => game.clubId);
            //console.log({ usedClubIds })
        }

        // verifica se a lista existe e se é maior do que a lista de clubes cadastrados
        if (gamesListSaved && gamesListSaved.length >= clubs.length) {
            await deleteGamesList(); // Reiniciar currentClub
            //lastGameCounter = 0;
            usedClubIds = [];
            message = 'Lista reiniciada';
        }

        let randomClub: ClubData | null = null;

        // Selecionar um clube aleatório cujo ID ainda não foi selecionado
        while (!randomClub) {
            const tempRandomClub = await getRandomClub();
            if (!usedClubIds || !usedClubIds.includes(tempRandomClub.id)) {
                randomClub = tempRandomClub;
            }
        }
        const gameCounter = lastGameCounter + 1;
        const date = new Date();

        const newGame = {
            gameId: uuidv4(),
            gameCounter: gameCounter,
            clubId: randomClub.id,
            date
        }
        // Adicionar o nova partida
        const index = await addNewGame(newGame);
        //console.log("Update index:", index)
        return {
            success: true,
            club: randomClub,
            game: newGame,
            ...(message && { message })
        };
    } catch (error) {
        console.error('Erro ao atualizar  partida:', error);
        return { success: false };
    }

}