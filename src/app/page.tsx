import { getClubsNamesList, getCurrentClubData, getCurrentGameData } from "@/utils/get-club";
import { Box, Card, CardContent, CardHeader, Container, Divider, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Tips from "@/components/tips";
import { getCurrentDateFormatted } from "@/utils/get-date";

export const revalidate = 60 * 60 * 1;
export const dynamic = 'force-dynamic';

export default async function Home() {
    const { game, club } = await getCurrentGameData();
    console.log({game},{club})
    const clubsList = await getClubsNamesList();
    if (!club || !game) {
        return (
            <>
                <Typography variant="h1" textAlign="center">
                    CLUBLE
                </Typography>
                <Card sx={{ mx: 4, my: 2 }}>
                    <CardContent>
                        <Typography variant="h4" textAlign="center">
                            Aguarde o próximo clube!
                        </Typography>
                    </CardContent>
                </Card>
            </>
        )
    }

    return (
        <>
            <Typography variant="h1" textAlign="center">
                CLUBLE
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
                <Stack >
                    {game.gameId}
                    {getCurrentDateFormatted()}
                    {}
                </Stack>
            </Typography>
            <Divider />
            <Card component={Paper} elevation={4} sx={{ mx: 4, my: 2, p: 2 }}>
                <Tips club={club} gameId={game.gameId} clubsNamesList={clubsList}/>
            </Card>
            <Divider />
        </>
    );
}
