import fs from 'fs';
import path from 'path';
import { getRandomClub } from '@/utils/get-club';
import { ClubData, clubs, CurrentClub } from '@/data/clubs';
import { revalidatePath } from 'next/cache';

const currentClubFilePath = path.join(process.cwd(), 'src/data/currentClub.json');

interface UpdateCurrentClubResult {
    success: boolean;
    club?: number;
    message?: string;
}
/**  */
export async function updateCurrentClub(): Promise<UpdateCurrentClubResult> {
    let message: string = '';
    try {
        // Ler o arquivo currentClub
        // Ler o arquivo currentClub
        const currentClubData = fs.readFileSync(currentClubFilePath, 'utf-8');
        const currentClubIdsObj: { id: number[] } = JSON.parse(currentClubData);
        //console.log({ currentClubData }, { currentClubIdsObj })
        // Extrair a matriz de IDs do objeto
        const currentClubIds = currentClubIdsObj.id;

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

        // Escrever o arquivo atualizado
        fs.writeFileSync(currentClubFilePath, JSON.stringify({ id: currentClubIds }));
        // Revalidar o caminho após a atualização
        //revalidatePath('/');

        return { success: true, club: randomClub.id, ...(message && { message }) };
    } catch (error) {
        console.error('Erro ao atualizar o clube atual:', error);
        return { success: false };
    }



    /* try {
        const randomClub = await getRandomClub();

        const currentClubData: CurrentClub = {
            id: randomClub.id
        };

        const currentClubJSON = JSON.stringify(currentClubData);

        await fs.writeFileSync(currentClubFilePath, currentClubJSON);
        revalidatePath('/')
        return { success: true, club: randomClub.id };
    } catch (error) {
        console.error('Erro ao atualizar o clube atual:', error);
        return { success: false };
    } */

}