import { getClubsNamesList, getCurrentGameData } from "@/utils/get-club";
import NovoTipsComponent from "./comp/novo-client-component";
import { ShowStats } from "@/components/show-stats";
import { getCurrentDateFormatted } from "@/utils/get-date";
import { Typography, Card, CardContent, Divider, Grid, Box } from "@mui/material";


export default async function PageNovo() {
    const { game } = await getCurrentGameData();
    const clubsList = await getClubsNamesList();


    if (!game) {
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
            <Divider />
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
                <Grid item xs={1} textAlign="center">
                    <ShowStats />
                </Grid>
            </Grid>
            <Divider />
            <Box sx={{
                my: { xs: 0 },
                p: { xs: 0, sm: 2 }
            }}
            >
                <NovoTipsComponent  
                    game={game} 
                    clubsNamesList={clubsList} 
                    gameEdition={game.id} 
                />
            </Box>
        </>
    )
}