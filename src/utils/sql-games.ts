"use server"
import prisma from "./prisma";

/** Retorna a ultima partida adicionada*/
export async function getLastGame(): Promise<GameData | null> {
    //console.log("Coletar último id adicionado")
    try {
        const lastGame = await prisma.gamesHistory.findMany()
        const size = lastGame.length;
        if (size > 0)
            return lastGame[size-1]
        return null
    }
    catch (error) {
        console.error({ error })
    }
    return null
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
        const listLength = await prisma.gamesHistory.count()
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
        const gamesList = await prisma.gamesHistory.findMany();
        //console.log("function", { gamesList })
        return gamesList;
    } catch (error) {
        console.error({ error })
    }
    return;
}

/** Adiciona uma nova partida no final da tabela */
export async function addNewGame(gameData: any): Promise<any | undefined> {
    try {
        const idIndex = await prisma.gamesHistory.create({
            data: {
                gameId: gameData.gameId,
                clubId: gameData.clubId
            }
        })
        return idIndex
    } catch (error) {
        console.error({ error });
    }
    return;
}

/** Deleta lista de partidas */
export async function deleteGamesList(): Promise<any | undefined> {
    try {
        const deleted = await prisma.gamesHistory.deleteMany()
        return deleted
    } catch (error) {
        console.error({ error })
    }
    return;
}
