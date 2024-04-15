import { getCurrentClubData } from "@/utils/get-club";
import { Box, Card, CardContent, CardHeader, Container, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import Tips from "@/components/tips";
import { getCurrentDateFormatted } from "@/utils/get-date";

export const revalidate = 60 * 60 * 1;
export const dynamic = 'force-dynamic';

export default async function Home() {
    const club = await getCurrentClubData();
    //console.log(club);
    if (!club) {
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
                {getCurrentDateFormatted()}
            </Typography>
            <Divider />
            <Card component={Paper} elevation={4} sx={{ mx: 4, my: 2, p: 2 }}>
                <Tips club={club} initialState={0} />
            </Card>
            <Divider />
            {/* 
            <Card component={Paper} elevation={4} sx={{ mx: 4, my: 2 }}>
                <CardContent>
                    <Typography variant="h4" textAlign="center">
                        {club.name}
                    </Typography>

                    <Card
                        component={Paper}
                        elevation={2}
                        sx={{
                            py: 1, px: 3,
                            backgroundColor: '#EEE',
                            width: 'fit-content',
                            height: 'fit-content',
                            margin: 'auto',
                            border: '1px solid #DDD',
                            display: 'flex',
                        }}>
                        {
                            club.colors.map((color: string, index: number) => (
                                <SportsBaseballIcon key={index} fontSize="small"
                                    sx={{
                                        color,
                                        m: 0,
                                        p: 0,
                                        //textShadow: '1px 1px 4px red)'
                                    }} />
                            ))
                        }
                    </Card>

                    <Typography variant="body1" textAlign="center">
                        Cidade: {club.city} / {club.state}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        Estádio: {club.stadium}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        Ano de fundação: {club.foundationYear}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        Ídolo: {club.idol}
                    </Typography>
                </CardContent>

            </Card>
            <Divider />
             */}
        </>
    );
}
