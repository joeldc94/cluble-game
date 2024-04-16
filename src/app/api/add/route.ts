import { addNewGame } from "@/utils/kv-games"

export async function GET() {
    const date = new Date();
    console.log(date.toLocaleString('pt-BR'))
    const list = await addNewGame({
        gameId: 3,
        clubId: 3,
        date
    })

    return Response.json({ list, date })
}