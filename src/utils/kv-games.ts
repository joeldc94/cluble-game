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
        console.error({ error })
    }
    return
}

/** Retorna o id da última partida */
export async function getLastGameId(): Promise<string | undefined> {
    //console.log("Coletar último id adicionado")
    try {
        const lastGame = await getLastGame();
        //console.log({ lastGame });
        return lastGame?.gameId
    }
    catch (error) {
        console.error({ error })
    }
    return
}

/** Retorna o club id da última partida */
export async function getLastGameClubId(): Promise<number | undefined> {
    //console.log("Coletar último id adicionado")
    try {
        const lastGame = await getLastGame();
        //console.log({ lastGame });
        return lastGame?.clubId
    }
    catch (error) {
        console.error({ error })
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
        console.error({ error })
    }
    return;
}

/** Retorna todas partidas publicadas */
export async function getAllGameHistory(): Promise<GameData[] | undefined> {
    try {
        const gamesList = await kv.lrange<GameData>(KEY_NAME, 0, -1);
        //console.log("function", { gamesList })
        return gamesList;
    } catch (error) {
        console.error({ error })
    }
    return;
}

/** Adiciona uma nova partida no final da lista */
export async function addNewGame(gameData: GameData): Promise<number | undefined> {
    try {
        const idIndex = await kv.rpush<GameData>(KEY_NAME, gameData);
        return idIndex
    } catch (error) {
        console.error({ error });
    }
    return;
}

/** Deleta lista de partidas */
export async function deleteGamesList(): Promise<number | undefined> {
    try {
        const deleted = await kv.del(KEY_NAME);
        return deleted
    } catch (error) {
        console.error({ error })
    }
    return;
}

/** Define o contador */
export async function setGameCounter(value: number): Promise<number | "OK" | null> {
    try {
        const res = await kv.set('gameCounter', value);
        return res
    } catch (error) {
        console.error({ error })
    }
    return null;
}
/** Define o contador */
export async function getGameCounter(): Promise<number | null> {
    try {
        const counter = await kv.get<number>('gameCounter');
        return counter
    } catch (error) {
        console.error({ error })
    }
    return null;
}