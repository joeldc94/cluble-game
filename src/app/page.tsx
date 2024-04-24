import { getClubsNamesList, getCurrentGameData } from "@/utils/get-club";
import { Box, Card, CardContent, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Tips from "@/components/tips";
import { getCurrentDateFormatted } from "@/utils/get-date";

//export const revalidate = 60 * 60 * 1;
//export const dynamic = 'force-dynamic';

export default async function Home() {
    console.log("Criando página inicial");
    const { game, club } = await getCurrentGameData();
    //console.log({game},{club})
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
            <Divider/>
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item xs={1}>
                    <Typography variant="subtitle1" textAlign="left">
                        #{String(game.id).padStart(3, '0')}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle1" textAlign="center">
                        {getCurrentDateFormatted()}
                    </Typography>
                </Grid>
                <Grid item xs={1} />


            </Grid>
            <Divider />
            <Box sx={{ my: 2, p: 2 }}>
                <Tips club={club} gameId={game.gameId} clubsNamesList={clubsList} />
            </Box>
            <Divider />
        </>
    );
}
