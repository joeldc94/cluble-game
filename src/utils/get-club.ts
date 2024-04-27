"use server"
import "server-only";
import { clubs } from '@/data/clubs';
import { getLastGame, getLastGameClubId } from "./sql-games";

/** Retorna lista de nomes dos clubes */
/** Retorna os dados de um único clube pelo Id do clube*/
export async function getClubsNamesList(): Promise<string[]> {
    let clubsList: string[] = []
    clubs.forEach((club) => clubsList.push(club.name));
    return [...clubsList].sort()
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

type CurrentGameDataResponse = {
    game: GameData | undefined | null;
    club: ClubData | undefined | null;
};
/** Retorna os dados da partida corrente */
export async function getCurrentGameData(): Promise<CurrentGameDataResponse> {
    try {
        const currentGame = await getLastGame();
        const currentClubId = currentGame?.clubId;
        let club: ClubData | undefined;
        if (currentClubId) {
            club = clubs.find(club => club.id === currentClubId);
        }
        return {
            game: currentGame,
            club
        };
    } catch (error) {
        console.error('Erro ao obter o clube atual', error);
        return {
            game: null,
            club: null
        };
    }
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