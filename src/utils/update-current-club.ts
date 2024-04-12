"use server"
import fs from 'fs';
import path from 'path';
import { getRandomClub } from '@/utils/get-club';
import { ClubData, clubs, CurrentClub } from '@/data/clubs';
import { revalidatePath } from 'next/cache';
import { CURRENT_CLUB_FILE_PATH } from '@/config';

interface UpdateCurrentClubResult {
    success: boolean;
    club?: ClubData;
    message?: string;
}
/**  */
export async function updateCurrentClub(): Promise<UpdateCurrentClubResult> {
    console.log("Atualizar currentClub...", {CURRENT_CLUB_FILE_PATH});
    let message: string = '';
    try {
        // Ler o arquivo currentClub
        // Ler o arquivo currentClub
        const currentClubData = fs.readFileSync(CURRENT_CLUB_FILE_PATH, 'utf-8');
        const currentClubIdsObj: { id: number[] } = JSON.parse(currentClubData);
        //console.log({ currentClubData }, { currentClubIdsObj })
        // Extrair a matriz de IDs do objeto
        const currentClubIds = currentClubIdsObj.id;
        console.log({currentClubIds});

        if (currentClubIds.length >= clubs.length) {
            currentClubIds.length = 0; // Reiniciar currentClub
            message = 'Lista reiniciada';
        }

        let randomClub: ClubData | null = null;

        // Selecionar um clube aleatório cujo ID ainda não foi selecionado
        while (!randomClub) {
            const tempRandomClub = await getRandomClub(); // Supondo que essa função retorne um clube aleatório
            if (!currentClubIds.includes(tempRandomClub.id)) {
                randomClub = tempRandomClub;
            }
        }

        // Adicionar o novo ID a currentClub
        currentClubIds.push(randomClub.id);
        console.log({randomClub});


        // Escrever o arquivo atualizado
        fs.writeFileSync(CURRENT_CLUB_FILE_PATH, JSON.stringify({ id: currentClubIds }));
        // Revalidar o caminho após a atualização
        //revalidatePath('/');

        return { success: true, club: randomClub, ...(message && { message }) };
    } catch (error) {
        console.error('Erro ao atualizar o clube atual:', error);
        return { success: false };
    }

}