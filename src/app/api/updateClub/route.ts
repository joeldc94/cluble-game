export const dynamic = 'force-dynamic'

import { getRandomClub } from "@/utils/get-club";
import { updateCurrentClub } from "@/utils/update-current-club";

export async function GET() {
    /*  console.log("Chamada da API updateClub");
     const update = await updateCurrentClub()
     return Response.json(update); */
    // SET userSession jsonObject
    let responseData;
    const newId = await getRandomClub();
    await fetch(`${process.env.KV_REST_API_URL}/set/clubId`, {
        headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        body: JSON.stringify({
            id: newId.id
        }),
        method: 'POST',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            responseData = data
        });
    return Response.json(responseData)

}