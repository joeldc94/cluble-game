"use client"

import { getTips } from "@/actions/get-tips";
import { getLocalStorageRightAnswer, setLocalStorageNewGame, setLocalStorageRightAnswer } from "@/utils/localStorage";
import { Card, List, ListItem, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type NovoTipsProps = {
    game: GameData;
    clubsNamesList: string[];
    gameEdition: number;
}
export default function NovoTipsComponent({ game, clubsNamesList, gameEdition }: NovoTipsProps) {

    const [initialized, setInitialized] = useState<boolean>(false)
    const [gameState, setGameState] = useState<number | null>(null);
    const [gameRightAnswer, setGameRightAnswer] = useState<boolean>(false);
    const [tips, setTips] = useState([]);

    useEffect(() => {
        //verificar se o registro do jogo já existe
        const novoRegistro = setLocalStorageNewGame(game.gameId);
        if (novoRegistro > 0) {
            const right = getLocalStorageRightAnswer(game.gameId)
            setGameRightAnswer(right);
        }
        setGameState(novoRegistro);
        setInitialized(true);
    }, [])

    useEffect(() => {
        const sendStateGetTips = async (gameId, state, rightAnswer) => {
            const response = await getTips({
                gameId,
                state,
                rightAnswer
            })
            return response

        }

        if (gameState != null) {
            sendStateGetTips(game.gameId, gameState, gameRightAnswer).then((data) => {
                if (data.success) {
                    setTips(data.tips);
                    setGameState(data.tips?.length - 1)
                    if (data.rightAnswer) {
                        setLocalStorageRightAnswer(game.gameId, data.rightAnswer);
                        setGameRightAnswer(data.rightAnswer);
                    }
                    console.log(data);
                }
            }
            );
        }
    }, [initialized])

    if(!initialized){
        return(
            <List sx={{ width: '100%'}}>
                <ListItem >
                    <Skeleton width="100%"/>
                </ListItem>
            </List>
            
        )
    }
    
    return (
        <List>
            {
                tips.map((tip, index) => (
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
                                    backgroundColor: tip.value.includes('#FFFFFF') ? '#DDD' : '#FFF',
                                    border: "1px solid black",
                                }}
                            >
                                <Stack direction="row" spacing={0}>
                                    {tip.value.map((color: string, index: number) => (
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