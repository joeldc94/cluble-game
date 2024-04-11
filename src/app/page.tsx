import { clubs } from "@/data/clubs";
import { getRandomClub } from "@/utils/random-club";
import { Box, Card, CardContent, CardHeader, Container, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Home() {
    const club = getRandomClub();
    console.log(club);
    return (
        <main>
            <Container maxWidth="sm">
                <Typography variant="h1" textAlign="center">
                    CLUBLE
                </Typography>
                <Divider />
                <Card sx={{ mx: 4, my: 2}}>
                    <CardContent>
                        <Typography variant="h4" textAlign="center">
                            {club.name}
                        </Typography>
                        <Typography variant="body1" textAlign="center">
                            Cidade: {club.city} / {club.state}
                        </Typography>
                        <Typography variant="body1" textAlign="center">
                            Estádio: {club.staduim}
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
                <List>
                    {
                        clubs.map((club) => {
                            return (
                                <ListItem key={club.name}>
                                    <ListItemText
                                        primary={club.name}
                                        secondary={`${club.city} / ${club.state?.toUpperCase()}`}
                                    />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Container>
        </main>
    );
}
