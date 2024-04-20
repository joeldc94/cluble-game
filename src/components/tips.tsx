"use client"
import { useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, Input, List, ListItem, TextField, Typography } from "@mui/material";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import AnswerForm from "./answer-form";
import { getGameAnswers, getLocalStorageRightAnswer, getUserGamesHistory } from "@/utils/localStorage";

interface TipsProps {
    club: ClubData;
    gameId: string;
    //initialState: number;
    clubsNamesList: string[];
}

export default function Tips({ club, gameId, clubsNamesList }: TipsProps) {

    const isMobileDevice = typeof navigator !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const [state, setState] = useState<number>(0);
    const [answeredClubs, setAnsweredClubs] = useState<string[]>([]);
    const [rightAnswer, setRightAnswer] = useState<boolean>(false);


    useEffect(() => {
        const rightAnswered = getLocalStorageRightAnswer(gameId);
        const answersList = getGameAnswers(gameId);
        setState(answersList.length);
        setAnsweredClubs(answersList)
        setRightAnswer(rightAnswered);
    }, [])
    useEffect(() => {
        if (rightAnswer) {
            setState(5);
        }
        else {
            const answersList = getGameAnswers(gameId);
            setAnsweredClubs(answersList)
        }
    }, [state])

    // Função para gerar o link de compartilhamento
    const handleCompartilharWhatsApp = () => {
        if (!isMobileDevice) return;
        const mensagemCodificada = encodeURIComponent(rightAnswer ? `Veja o clube de hoje no CLUBLE! Eu acertei em ${getGameAnswers(gameId).length} tentativas!` : `Não acertei o clube de hoje no CLUBLE. Você consegue?`);
        const linkWhatsApp = `whatsapp://send?text=${mensagemCodificada}`;
        const siteLink = "https://cluble-game.vercel.app";
        const linkWithBreak = `${mensagemCodificada}%0A${siteLink}`;
        const linkWhatsAppWithBreak = `whatsapp://send?text=${linkWithBreak}`;
        window.location.href = linkWhatsAppWithBreak;
    };

    return (
        <>
            <List>
                {state >= 0 && (
                    <ListItem>
                        <Typography variant="body1" textAlign="center">
                            1 - <strong>Estado: </strong> {club.state}
                        </Typography>
                    </ListItem>
                )}
                {state >= 1 && (
                    <ListItem>
                        <Typography variant="body1" textAlign="center">
                            2 - <strong>Ano de fundação: </strong>{club.foundationYear}
                        </Typography>
                    </ListItem>
                )}
                {state >= 2 && (
                    <ListItem>
                        <Typography variant="body1" textAlign="center">
                            3 - <strong>Cores: </strong>
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
                        </Typography>
                    </ListItem>
                )}
                {state >= 3 && (
                    <ListItem>
                        <Typography variant="body1" textAlign="center">
                            4 - <strong>Estádio: </strong>{club.stadium}
                        </Typography>
                    </ListItem>
                )}
                {state >= 4 && (
                    <ListItem>
                        <Typography variant="body1" textAlign="center">
                            5 - <strong>Ídolo: </strong>{club.idol}
                        </Typography>
                    </ListItem>
                )}
                {(state >= 5 || rightAnswer) && (
                    <ListItem>
                        <Typography variant="h4" textAlign="center">
                            Resposta: <strong>{club.name}</strong>
                        </Typography>
                    </ListItem>
                )}

            </List>

            {(state < 5 && !rightAnswer) ? (
                <AnswerForm
                    club={club}
                    gameId={gameId}
                    state={state}
                    setState={setState}
                    rightAnswer={rightAnswer}
                    setRightAnswer={setRightAnswer}
                    clubsNamesList={clubsNamesList}
                />
            ) : (
                <Card>
                    <CardActionArea onClick={handleCompartilharWhatsApp}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {rightAnswer ?
                                    (`Acertei com ${getGameAnswers(gameId).length} palpites!!`)
                                    :
                                    (`Não consegui acertar`)
                                }
                            </Typography>
                            {isMobileDevice &&
                                <Typography variant="body2" color="text.secondary">
                                    Compartilhar via WhatsApp
                                </Typography>
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>

            )
            }
        </>
    )

}