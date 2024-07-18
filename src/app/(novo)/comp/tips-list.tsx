"use client"
import { getGameAnswers } from "@/utils/localStorage";
import { Avatar, Box, Card, Chip, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

type NovoTipsProps = {
    tipsArray: Tip[];
    userAnswers: string[];
    rightAnswered: boolean;
}

function getTipColor(tipIndex: number, answersLength: number, right: boolean) {
    if (!right) {
        if (tipIndex <= answersLength - 1) return "#f45756"
        return "lightGrey"
    }
    if (tipIndex < answersLength - 1) return "#f45756"
    if (tipIndex == answersLength - 1) return "#1ed57a"
    return "lightGrey"
}

/** Componente que renderiza a lista de dicas */
export default function TipsList({ tipsArray, userAnswers, rightAnswered }: NovoTipsProps) {

    return (
        <List>
            {tipsArray.map((tip, index) => (
                <ListItem key={tip.label}>
                    <ListItemIcon>
                        <Avatar
                            sx={{
                                bgcolor: getTipColor(index, userAnswers.length, rightAnswered)
                            }}
                        >
                            {index + 1}
                        </Avatar>
                    </ListItemIcon>
                    <Grid container>
                        <Grid item xs="auto">
                            <Typography fontSize={20} fontWeight={600}>
                                {tip.label}:
                            </Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <Typography fontSize={20} fontWeight={400} ml={2}>
                                {tip.label != 'Cores' && tip.value}
                            </Typography>
                            {Array.isArray(tip.value) && tip.label == 'Cores' &&
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
                            {(index < userAnswers.length) ?
                                <Box sx={{ p: 0 }}>
                                    <Chip
                                        size="small"
                                        label={userAnswers[index] || "-"}
                                    />
                                </Box>
                                : <Box></Box>
                            } 
                        </Grid>
                    </Grid>
                </ListItem>
            ))
            }
        </List >
    )
}

/*
                                !rightAnswered ? (
                                    (index < userAnswers.length) &&
                                    <Chip
                                        size="small"
                                        //color={(index == userAnswers.length - 1) ? "success" : "default"}
                                        label={`🟥 ${userAnswers[index]}`}
                                    />
                                ) :
                                    (
                                        <>{
                                            (index < userAnswers.length - 1) ?
                                                <Chip
                                                    size="small"
                                                    //color={(index == userAnswers.length - 1) ? "success" : "default"}
                                                    label={`🟥 ${userAnswers[index]}`}
                                                />
                                                :


                                                (index == userAnswers.length - 1) ?
                                                    <Chip
                                                        size="small"
                                                        color="success"
                                                        label={`✅ ${userAnswers[index]}`}
                                                    />
                                                    :
                                                    (index > userAnswers.length - 1) &&
                                                    <Chip
                                                        size="small"
                                                        //color="success"
                                                        label={`🟩`}
                                                    />
                                        }
                                        </>
                                    )
                                        */