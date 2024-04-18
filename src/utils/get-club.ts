"use server"
import "server-only";
import { clubs } from '@/data/clubs';
import { getLastGameClubId } from "./kv-games";

/** Retorna lista de nomes dos clubes */
/** Retorna os dados de um único clube pelo Id do clube*/
export async function getClubsNamesList(): Promise<string[]> {
    let clubsList: string[] = []
    clubs.forEach((club) => clubsList.push(club.name));
    return clubsList;
}

/** Retorna os dados de um único clube pelo Id do clube*/
export async function getClubById(id: number): Promise<ClubData> {
    return clubs[id];
}

/** Retorna os dados de um clube aleatório */
export async function getRandomClub(): Promise<ClubData> {
    const randomIndex = Math.floor(Math.random() * clubs.length);
    return clubs[randomIndex];
}

/** Retorna os dados do clube atual */
export async function getCurrentClubData(): Promise<ClubData | null> {
    try {
        const currentClubId = await getLastGameClubId();
        if (currentClubId) {
            const club = clubs.find(club => club.id === currentClubId);
            return club || null;
        }
        return null;
    } catch (error) {
        console.error('Erro ao obter o clube atual', error);
        return null;
    }
}