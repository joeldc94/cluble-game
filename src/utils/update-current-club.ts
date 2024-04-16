"use server"
import { getRandomClub } from '@/utils/get-club';
import { clubs } from '@/data/clubs';
import { AddClubId, deleteClubIdList, getAllClubIds } from './kv-club';

interface UpdateCurrentClubResult {
    success: boolean;
    club?: ClubData;
    message?: string;
}
/** Escreve um novo Id de clube na lista de clubes */
export async function updateCurrentClub(): Promise<UpdateCurrentClubResult> {
    let message: string = '';
    try {
        // Ler a lista  de clues utilizados
        const clubIdsListSaved = await getAllClubIds();
        let usedClubIds = clubIdsListSaved;
        // verifica se a lista existe e se é maior do que a lista de clubes cadastrados
        if (clubIdsListSaved && clubIdsListSaved.length >= clubs.length) {
            await deleteClubIdList(); // Reiniciar currentClub
            usedClubIds = [];
            message = 'Lista reiniciada';
        }

        let randomClub: ClubData | null = null;

        // Selecionar um clube aleatório cujo ID ainda não foi selecionado
        while (!randomClub) {
            const tempRandomClub = await getRandomClub(); // Supondo que essa função retorne um clube aleatório
            if (!usedClubIds || !usedClubIds.includes(tempRandomClub.id.toString())) {
                randomClub = tempRandomClub;
            }
        }

        // Adicionar o novo ID a currentClub
        await AddClubId(randomClub.id);
        return { 
            success: true, 
            club: randomClub, 
            ...(message && { message }) 
        };
    } catch (error) {
        console.error('Erro ao atualizar o clube atual:', error);
        return { success: false };
    }

}