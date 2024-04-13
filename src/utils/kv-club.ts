"use server"
import { kv } from "@vercel/kv";

/** Retorna o último id adicionado*/
export async function getLastClubId(): Promise<number | undefined> {
    //console.log("Coletar último id adicionado")
    try {
        const lastId = await kv.lindex('currentClubId', -1);
        //console.log({ lastId });
        return lastId
    }
    catch (error) {
        console.log({ error })
    }
    return
}

/** Retorna o tamanho da lista de ids */
export async function getClubIdListLenght(): Promise<number | undefined> {
    try {
        const listLength = await kv.llen('currentClubId');
        //console.log({listLength})
        return listLength
    } catch (error) {
        console.log({ error })
    }
    return;
}

/** Retorna todos os ids da lista */
export async function getAllClubIds(): Promise<string[] | undefined> {
    try {
        const idsList = await kv.lrange('currentClubId', 0, -1);
        return idsList
    } catch (error) {
        console.log({ error })
    }
    return;
}

/** Adiciona um id no final da lista */
export async function AddClubId(id: number): Promise<number | undefined> {
    try {
        const idIndex = await kv.rpush('currentClubId', id);
        return idIndex
    } catch (error) {
        console.log({ error })
    }
    return;
}

/** Deleta lista de ids */
export async function deleteClubIdList(): Promise<number | undefined> {
    try {
        const deleted = await kv.del('currentClubId');
        return deleted
    } catch (error) {
        console.log({ error })
    }
    return;
}