"use server";
import "server-only";


const cacheKey = 'my-data';
const cacheTimeout = 86400; // 24 hours

//"https://v3.football.api-sports.io/teams?name=sousa&country=brazil&league=76&season=2024"
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


    const response = await fetch(`https://v3.football.api-sports.io/teams?id=${clubApiFootballId}`, {
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.API_FOOTBALL_KEY as string,
        },
        cache: 'force-cache',
        next: { tags: ['api-football'] }
    });
    const clubData = await response.json();
    //console.log(clubData.response);
    return clubData.response[0];
}