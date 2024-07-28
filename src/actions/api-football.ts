"use server";
import "server-only";


const cacheKey = 'my-data';
const cacheTimeout = 86400; // 24 hours

//"https://v3.football.api-sports.io/teams?name=sousa&country=brazil&league=76&season=2024"
// leagueId: 
// serieC = 71
// serieC = 72
// serieC = 75
// serieD = 76

interface checkAnswerProps {
    clubApiFootballId: number;
}

export async function fetchApiFootballClubData({
    clubApiFootballId
}: checkAnswerProps) {
    //console.log(clubApiFootballId);

    try {
        const response = await fetch(`https://v3.football.api-sports.io/teams?id=${clubApiFootballId}`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': process.env.API_FOOTBALL_KEY as string,
            },
            cache: 'force-cache',
            next: { tags: ['api-football'] }
        });
        const clubData = await response.json();
        //console.log("fetch", clubData.response);
        if (!!clubData.response[0])
            return clubData.response[0];
        else
            return null
    } catch (error) {
        console.log("erro ao fazer fetch na api-football", error)
        return null
    }

}