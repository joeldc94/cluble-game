"use server"
import { kv } from "@vercel/kv";

const KEY_NAME = 'gamesHistory';

/** Retorna a ultima partida adicionada*/
export async function getLastGame(): Promise<GameData | undefined> {
    //console.log("Coletar último id adicionado")
    try {
        const lastGame = await kv.lindex(KEY_NAME, -1);
        //console.log({ lastGame });
        return lastGame
    }
    catch (error) {
        console.log({ error })
    }
    return
}

/** Retorna o tamanho da lista de partidas */
export async function getGamesListLenght(): Promise<number | undefined> {
    try {
        const listLength = await kv.llen(KEY_NAME);
        //console.log({listLength})
        return listLength
    } catch (error) {
        console.log({ error })
    }
    return;
}

/** Retorna todas partidas publicadas */
export async function getAllGameHistory(): Promise<ClubData[] | undefined> {
    try {
        const gamesList = await kv.lrange<ClubData>(KEY_NAME, 0, -1);
        console.log({ gamesList })
        return gamesList;
    } catch (error) {
        console.log({ error })
    }
    return;
}

/** Adiciona uma nova partida no final da lista */
export async function addNewGame(gameData: GameData): Promise<number | undefined> {
    try {
        const idIndex = await kv.rpush<GameData>(KEY_NAME, gameData);
        return idIndex
    } catch (error) {
        console.log({ error });
    }
    return;
}

/** Deleta lista de partidas */
export async function deleteGamesList(): Promise<number | undefined> {
    try {
        const deleted = await kv.del(KEY_NAME);
        return deleted
    } catch (error) {
        console.log({ error })
    }
    return;
}