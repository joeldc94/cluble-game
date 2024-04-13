"use server"

import { clubs } from '@/data/clubs';
import { ClubData } from '@/data/clubs';
import { getLastClubId } from './kv-club';

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
        const currentClubId = await getLastClubId();
        if (currentClubId) {
            const club = clubs.find(club => club.id === currentClubId);
            return club || null;
        }
        return null;
    } catch (error) {
        console.error('Erro ao ler o arquivo currentClub.json:', error);
        return null;
    }
}