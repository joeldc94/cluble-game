import { addNewGame, getAllGameHistory, getLastGame } from "@/utils/kv-games"

export const dynamic = 'force-dynamic'
export async function GET() {
    
    const list = await getAllGameHistory()
    console.log("API", {list})
    return Response.json({ list })
}