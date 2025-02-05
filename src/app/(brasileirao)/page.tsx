import GameComponent from "./comp/game-component";
import { Typography, Card, CardContent, Divider, Box } from "@mui/material";
import { DateHeader } from "./comp/date-header";
import { LeagueTitle } from "./comp/league-title";
import { getClubsNamesListSQLFromGameClubs, getLastGameData } from "@/utils/sql-games";
import { LEAGUE_ID } from "./config";
import { Suspense } from "react";

const GAME_INFOS_ID = LEAGUE_ID;

export default async function PageBrasileirao() {
    const lastGameData = await getLastGameData(GAME_INFOS_ID);
    const clubsList = await getClubsNamesListSQLFromGameClubs(GAME_INFOS_ID);
    
    if (!lastGameData || !clubsList) {
        return (
            <>
                <Divider />
                <LeagueTitle leagueId={GAME_INFOS_ID} />
                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="subtitle1" textAlign="center">
                            Aguarde o próximo clube!
                        </Typography>
                    </CardContent>
                </Card>
            </>
        )
    }

    return (
        <>
            <Divider />
            <DateHeader gameEdition={lastGameData.id} />
            <Divider />
            <LeagueTitle leagueId={GAME_INFOS_ID} />
            <Box sx={{
                mx: { xs: 0, sm: 2 },
                mb: 4
            }}>
                <GameComponent
                    gameData={lastGameData}
                    clubsNamesList={clubsList}
                    gameEdition={lastGameData.id}
                />
            </Box>
        </>
    )
}