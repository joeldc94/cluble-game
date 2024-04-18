"use server"
import { getRandomClub } from '@/utils/get-club';
import { clubs } from '@/data/clubs';
import { AddClubId, deleteClubIdList, getAllClubIds } from './kv-club';
import { addNewGame, deleteGamesList, getAllGameHistory, getLastGameId } from './kv-games';

interface UpdateCurrentGameResult {
    success: boolean;
    club?: ClubData;
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
        let lastGameId: number = 0;
        let usedClubIds: number[] = [];

        if (gamesListSaved && gamesListSaved.length > 0) {
            const lastGame = gamesListSaved[gamesListSaved.length - 1];
            lastGameId = lastGame.gameId;
            //console.log({ lastGameId });

            usedClubIds = gamesListSaved?.map((game) => game.clubId);
            //console.log({ usedClubIds })

        }

        // verifica se a lista existe e se é maior do que a lista de clubes cadastrados
        if (gamesListSaved && gamesListSaved.length >= clubs.length) {
            await deleteGamesList(); // Reiniciar currentClub
            usedClubIds = [];
            message = 'Lista reiniciada';
        }

        let randomClub: ClubData | null = null;

        // Selecionar um clube aleatório cujo ID ainda não foi selecionado
        while (!randomClub) {
            const tempRandomClub = await getRandomClub(); // Supondo que essa função retorne um clube aleatório
            if (!usedClubIds || !usedClubIds.includes(tempRandomClub.id)) {
                randomClub = tempRandomClub;
            }
        }
        const date = new Date();


        // Adicionar o novo ID a currentClub
        await addNewGame({
            gameId: lastGameId + 1,
            clubId: randomClub.id,
            date
        });
        return {
            success: true,
            club: randomClub,
            ...(message && { message })
        };
    } catch (error) {
        console.error('Erro ao atualizar  partida:', error);
        return { success: false };
    }

}