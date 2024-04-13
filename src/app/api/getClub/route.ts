

export async function GET() {
    let resp
    await fetch(`${process.env.KV_REST_API_URL}/get/clubId`, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
        resp = data.result.id
        console.log(resp)    
    });
    return Response.json(resp)

}