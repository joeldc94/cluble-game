"use client"
import { getGameAnswers } from "@/utils/localStorage";
import { Card, Chip, List, ListItem, ListItemIcon, ListItemText, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

type NovoTipsProps = {
    tipsArray: Tip[];
    userAnswers: string[];
}

/** Componente que renderiza a lista de dicas */
export default function TipsList({ tipsArray, userAnswers }: NovoTipsProps) {

    return (
        <List>
            {
                tipsArray.map((tip, index) => (
                    <>
                        <ListItem key={tip.label}>
                            <ListItemIcon>{index + 1}</ListItemIcon>
                            <Typography variant="body1" textAlign="center">
                                <strong>{tip.label}: </strong>{tip.label != 'Cores' && tip.value}
                            </Typography>
                            {tip.label == 'Cores' &&
                                < Card
                                    component={Paper}
                                    elevation={2}
                                    sx={{
                                        mx: 1,
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
                        </ListItem>
                        {(!!userAnswers[index] || userAnswers[index] == "") &&
                            <ListItem sx={{ pt: 0, ml: 8 }}>
                                <Chip size="small" label={userAnswers.length >= index ? userAnswers[index] == "" ? "-" : userAnswers[index] : ""} />
                            </ListItem>
                        }

                    </>
                ))
            }
        </List >
    )
}