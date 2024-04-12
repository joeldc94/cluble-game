"use server"
import fs from 'fs';
import path from 'path'; 

import { clubs } from '@/data/clubs';
import { ClubData, CurrentClub } from '@/data/clubs';
import { CURRENT_CLUB_FILE_PATH } from '@/config';

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
    console.log({CURRENT_CLUB_FILE_PATH})
    try {
        const currentClubJSON = fs.readFileSync(CURRENT_CLUB_FILE_PATH, 'utf-8');
        const currentClubData: CurrentClub = JSON.parse(currentClubJSON);
        if (currentClubData.id !== null && currentClubData.id.length > 0) {
            const currentClubId = currentClubData.id[currentClubData.id.length-1];
            const club = clubs.find(club => club.id === currentClubId);
            return club || null;
        }
        return null;
    } catch (error) {
        console.error('Erro ao ler o arquivo currentClub.json:', error);
        return null;
    }
}