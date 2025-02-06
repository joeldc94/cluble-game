import { fetchApiFootballClubData } from "@/actions/api-football";
import { getGameClubInfo, getYesterdayGame } from "@/utils/sql-games";
import { postTweet, uploadMedia } from "@/utils/twitterFunction";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

export const dynamic = 'force-dynamic';

function removeSpaces(str: string | null) {
    if (!str) return '';
    return str.replace(/\s/g, '').toLowerCase();
}

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json('Unauthorized', {
            status: 401,
        });
    }

    try {
        const gameData = await getYesterdayGame();
        //console.log({ gameData });
        if (!gameData) return NextResponse.json('Nenhuma partida encontrada', { status: 404 });

        const gameClubsInfo = await getGameClubInfo(gameData.clubId!, gameData.gameInfoId);
        //console.log({ gameClubsInfo });
        if (!gameClubsInfo) return NextResponse.json('Nenhum gameClubsInfo encontrado', { status: 404 });

        const hashtags = [];
        hashtags.push(`#cluble`);
        //hashtags.push(`#clubletoday`);
        hashtags.push(`#${removeSpaces(gameClubsInfo.GameInfo.name)}`);
        //hashtags.push(`#${removeSpaces(gameClubsInfo.division)}`);
        hashtags.push(`#${removeSpaces(gameData.Clubs.name)}`);
        hashtags.push(`#${removeSpaces(gameData.Clubs.city)}`);
        hashtags.push(`#${removeSpaces(gameData.Clubs.state)}`);

        const message = `Ontem tivemos ${gameData.Clubs.fullName} na edição #${gameData.id} do Cluble. O clube da cidade de ${gameData.Clubs.city} - ${gameData.Clubs.state} joga a ${gameClubsInfo.division} do ${gameClubsInfo.GameInfo.name}!

Com quantas dicas você acertou?
https://cluble.today

${hashtags.map((hashtag) => `${hashtag}`).join(' ')}
`

        /* console.log("XXXXXX: ", message);
        return NextResponse.json(message, {
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
        if (!mediaId)
            xResponse = await postTweet({ text: message });
        else
            xResponse = await postTweet({ text: message, mediaId });
        console.log("XRESPONSE:", { xResponse })

        if (xResponse.error) return NextResponse.json({
            message: "Erro ao gerar publicação no X: " + xResponse.error,
            ...xResponse
        }, { status: 500 });

        return NextResponse.json({ xResponse, message }, { status: 200 })
    } catch (error) {
        console.error("Erro ao gerar publicação no X:", { error });
        return NextResponse.json(`Erro ao gerar publicação no X: ${error}`, { status: 500 });
    }


}