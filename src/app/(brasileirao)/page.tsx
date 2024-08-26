import { getClubsNamesList, getCurrentGameData } from "@/utils/get-club";
import GameComponent from "./comp/game-component";
import { Typography, Card, CardContent, Divider, Grid, Box } from "@mui/material";
import { DateHeader } from "./comp/date-header";
import { LeagueTitle } from "./comp/league-title";

export default async function PageBrasileirao() {
    const { game } = await getCurrentGameData();
    const clubsList = await getClubsNamesList();

    if (!game) {
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
                mx: { xs: 0, sm: 2 }
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