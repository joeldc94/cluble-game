"use server"
import prisma from "./prisma";

/** Retorna o id do clube a partir do id do game*/
export async function getClubIdByGameId(gameId: string): Promise<number | null> {
    //console.log("Coletar último id adicionado")
    try {
        const game = await prisma.gamesHistory.findFirst({
            where: {
                gameId: gameId
            }
        });

        if (game) {
            return game.clubId;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar o ID do clube:", error);
        return null;
    }
}

/** Retorna os dados do clube a partir do id do game*/
export async function getClubDataByGameId(gameId: string): Promise<any | null> {
    //console.log("Coletar os dados do clube pelo id do jogo")
    try {
        const dbResponse = await prisma.gamesHistory.findFirst({
            where: { gameId: gameId },
            include: { Clubs: true }
        });

        if (!!dbResponse && !!dbResponse.Clubs) {
            return dbResponse.Clubs;
        }
    } catch (error) {
        console.error("Erro ao buscar o ID do clube:", error);
    }
    return null;
}


type LastGameResponse = GameData & {
    Clubs: ClubData; // Dados do clube, se necessário
};
/** Retorna a ultima partida adicionada*/
export async function getLastGame(): Promise<LastGameResponse | null> {
    //console.log("Coletar último id adicionado")
    try {
        const lastGame = await prisma.gamesHistory.findFirst({ 
            orderBy: { id: 'desc' }, 
            include: { Clubs: true } 
        })
        if (!lastGame) return null;
        //console.log({lastGame})
        return lastGame; // Retorna o objeto formatado
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

/** Retorna as últimas partidas publicadas */
export async function getLastGamesHistory(gamesCount: number): Promise<GameData[] | undefined> {
    try {
        //const gamesList = await prisma.gamesHistory.findMany();
        const gamesList = await prisma.gamesHistory.findMany({
            take: gamesCount,
            orderBy: {
                id: 'desc' // Ordena pelo ID, do mais alto para o mais baixo
            }
        });
        //console.log("function", { gamesList })
        return gamesList;
    } catch (error) {
        console.error({ error })
    }
    return;
}

/** Adiciona uma nova partida no final da tabela */
export async function addNewGame(gameData: any): Promise<GameData | undefined> {
    try {
        const newGame = await prisma.gamesHistory.create({
            data: {
                gameId: gameData.gameId,
                clubId: gameData.clubId
            }
        })
        return newGame
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


/**
 * 
 */
export async function getClubsNamesListSQL(): Promise<string[] | null> {
    //console.log("Coletar lista de times")
    try {
        const dbResponse = await prisma.clubs.findMany({ select: { name: true }, orderBy: { name: 'asc' } });
        //console.log( dbResponse )
        const clubsList = dbResponse.map((club) => club.name);
        //console.log( clubsList )
        return clubsList
    }
    catch (error) {
        console.error({ error })
    }
    return null
}

export async function getClubsIdsListSQL(): Promise<number[] | null> {
    //console.log("Coletar lista de times")
    try {
        const dbResponse = await prisma.clubs.findMany({ select: { id: true } });
        //console.log( dbResponse )
        const clubsList = dbResponse.map((club) => club.id);
        //console.log( clubsList )
        return clubsList
    }
    catch (error) {
        console.error({ error })
    }
    return null
}