"use client"
import { Card, List, ListItem, Paper, Skeleton, Stack, Typography } from "@mui/material";

type NovoTipsProps = {
    tipsArray: Tip[];
}

/** Componente que renderiza a lista de dicas */
export default function TipsList({ tipsArray }: NovoTipsProps) {

    return (
        <List>
            {
                tipsArray.map((tip, index) => (
                    <ListItem key={tip.label}>
                        <Typography variant="body1" textAlign="center">
                            {index + 1} - <strong>{tip.label}: </strong>{tip.label != 'Cores' && tip.value}
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
                ))
            }
        </List >
    )
}