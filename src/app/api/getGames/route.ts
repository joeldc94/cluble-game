import { addNewGame, getAllGameHistory, getLastGame } from "@/utils/kv-games"

export const dynamic = 'force-dynamic'
export async function GET() {
    
    const list = await getLastGame()
    //console.log(list.clubId)
    return Response.json({ list })
}