import GameComponent from "./comp/game-component";
import { Typography, Card, CardContent, Divider, Box } from "@mui/material";
import { DateHeader } from "./comp/date-header";
import { LeagueTitle } from "./comp/league-title";
import { getClubsNamesListSQL, getLastGame } from "@/utils/sql-games";

export default async function PageBrasileirao() {
    const game = await getLastGame();
    const clubsList = await getClubsNamesListSQL();
    
    if (!game || !clubsList) {
        return (
            <>
                <Divider />
                <LeagueTitle />
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
            <DateHeader gameEdition={game.id} />
            <Divider />
            <LeagueTitle />
            <Box sx={{
                mx: { xs: 0, sm: 2 },
                mb: 4
            }}>
                <GameComponent
                    game={game}
                    clubsNamesList={clubsList}
                    gameEdition={game.id}
                />
            </Box>
        </>
    )
}