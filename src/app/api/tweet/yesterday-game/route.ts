import { fetchApiFootballClubData } from "@/actions/api-football";
import { getGameClubInfo, getYesterdayGame } from "@/utils/sql-games";
import { postTweet, uploadMedia } from "@/utils/twitterFunction";
import { NextRequest } from "next/server";
import "server-only";

export const dynamic = 'force-dynamic';

function removeSpaces(str: string | null) {
    if(!str) return '';
    return str.replace(/\s/g, '').toLowerCase();
}

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }
    const gameData = await getYesterdayGame();
    //console.log({ gameData });
    if(!gameData) return new Response('Nenhuma partida encontrada', { status: 404 });

    const gameClubsInfo = await getGameClubInfo(gameData.clubId!, gameData.gameInfoId);
    //console.log({ gameClubsInfo });
    if (!gameClubsInfo) return new Response('Nenhum gameClubsInfo encontrado', { status: 404 });

    const hashtags = [];
    hashtags.push(`#cluble`);
    hashtags.push(`#clubletoday`);
    hashtags.push(`#${removeSpaces(gameClubsInfo.GameInfo.name)}`);
    hashtags.push(`#${removeSpaces(gameClubsInfo.division)}`);
    hashtags.push(`#${removeSpaces(gameData.Clubs.name)}`);
    hashtags.push(`#${removeSpaces(gameData.Clubs.city)}`);
    hashtags.push(`#${removeSpaces(gameData.Clubs.state)}`);

    const message = `Ontem, na edição #${gameData.id} do Cluble, tivemos o ${gameData.Clubs.fullName} como clube do dia. O clube da cidade de ${gameData.Clubs.city} - ${gameData.Clubs.state} joga a ${gameClubsInfo.division} do ${gameClubsInfo.GameInfo.name}!

Com quantas dicas você acertou?
https://cluble.today

${hashtags.map((hashtag) => `${hashtag}`).join(' ')}
`

    /* console.log("XXXXXX: ", message);
    return new Response(message, {
        status: 200,
    }); */
    
    //console.log({ club })
    const apiData = await fetchApiFootballClubData({ clubApiFootballId: gameData.Clubs.apiFootballId! });
    //console.log("tips", apiData);
    const logoUrl = apiData.team.logo;    
    //console.log({logoUrl})
    const mediaId = await uploadMedia(logoUrl);
    //console.log({mediaId})
    let xResponse;
    if(!mediaId)
        xResponse = await postTweet({text: message});
    else
        xResponse = await postTweet({text: message, mediaId});
    //console.log({xResponse})
    return Response.json({response: xResponse, message})
}