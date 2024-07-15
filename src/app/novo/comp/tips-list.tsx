"use client"
import { getGameAnswers } from "@/utils/localStorage";
import { Box, Card, Chip, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

type NovoTipsProps = {
    tipsArray: Tip[];
    userAnswers: string[];
    rightAnswered: boolean;
}

/** Componente que renderiza a lista de dicas */
export default function TipsList({ tipsArray, userAnswers, rightAnswered }: NovoTipsProps) {

    return (
        <List>
            {
                tipsArray.map((tip, index) => (
                    <>


                        <ListItem key={tip.label}>
                            <ListItemIcon>{index + 1}</ListItemIcon>
                            <Grid container>
                                <Grid item xs="auto">
                                    <Typography  fontSize={18} fontWeight={600}>
                                        {tip.label}: 
                                    </Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Typography fontSize={18} fontWeight={400} ml={2}>
                                        {tip.label != 'Cores' && tip.value}
                                    </Typography>
                                    {tip.label == 'Cores' &&
                                        < Card
                                            component={Paper}
                                            elevation={2}
                                            sx={{
                                                mx: 1,
                                                ml: 2,
                                                backgroundColor: tip.value?.includes('#FFFFFF') ? '#DDD' : '#FFF',
                                                border: "1px solid black",
                                            }}
                                        >
                                            <Stack direction="row" spacing={0}>
                                                {tip.value?.map((color: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            backgroundColor: color,
                                                            width: "20px",
                                                            height: "20px",
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Card>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItem sx={{ p: 0 }}>
                                        {
                                            (index < userAnswers.length) &&
                                            <Chip
                                                size="small"
                                                //color={(index == userAnswers.length - 1) ? "success" : "default"}
                                                label={`❌ ${userAnswers[index]}` }
                                            />
                                        }{
                                            (index == userAnswers.length) && rightAnswered &&
                                            <Chip
                                                size="small"
                                                color="success"
                                                label={`✅ ${userAnswers[index]}`}
                                            />

                                        }
                                        
                                    </ListItem>
                                </Grid>

                            </Grid>




                        </ListItem>

                    </>
                ))
            }
        </List >
    )
}