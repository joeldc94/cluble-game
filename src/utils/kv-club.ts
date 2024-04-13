export const dynamic = 'force-dynamic'
import { kv } from "@vercel/kv";

/** Retorna os dados de um único clube pelo Id do clube*/
export async function getLastClubId(): Promise<string[] | undefined> {
    console.log("Coletar último id adicionado")
    try{
        const idPush = await kv.rpush('currentClubId', 15)
        console.log({idPush});
        //const lastId = await kv.lrange('currentClubId', 0, -1);

        const lastId = await kv.lindex('currentClubId', -1);
        console.log({lastId});
        return lastId
    }
    catch (error){
        console.log({error})       
    }
    return
}