"use client"

import { getTips } from "@/actions/get-tips";
import { getGameAnswers, getLocalStorageRightAnswer, setLocalStorageNewGame, setLocalStorageRightAnswer, setNewAnswer } from "@/utils/localStorage";
import { Autocomplete, Avatar, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, Suspense, useEffect, useRef, useState, useTransition } from "react";
import TipsList from "./tips-list";
import { filterClubs } from "@/utils/string";
import SendIcon from '@mui/icons-material/Send';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { ShareCard } from "@/components/share-card2";
import Image from "next/image";
import CloudinaryImage from "@/app/teste/cloudinary-image";

interface GameComponentProps {
    gameData: GameData;
    clubsNamesList: string[];
    gameEdition: number;
}
export default function GameComponent(props: GameComponentProps) {
    const respostaCardRef = useRef<HTMLDivElement>(null);

    const [historyInitialized, setHistoryInitialized] = useState<boolean>(false)
    const [initialized, setInitialized] = useState<boolean>(false)
    const [gameState, setGameState] = useState<number>(0);
    const [gameRightAnswer, setGameRightAnswer] = useState<boolean>(false);
    const [tips, setTips] = useState<Tip[]>([]);

    const [finalAnswer, setFinalAnswer] = useState<ClubData | null>(null);

    const [answer, setAnswer] = useState<string>('');
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [clubSuggestions, setClubSuggestions] = useState<string[]>([]);
    const [isValidAnswer, setIsValidAnswer] = useState<boolean>(false); // Novo estado para rastrear se a resposta é válida
    const [pendingNextTip, startTransitionNextTip] = useTransition();
    const [pendingAnswer, startTransitionAnswer] = useTransition();

    /**Inicializa/coleta histórico no localStorage */
    useEffect(() => {
        //verificar se o registro do jogo já existe
        const novoRegistro = setLocalStorageNewGame(props.gameData.gameId);
        if (novoRegistro > 0) {
            const right = getLocalStorageRightAnswer(props.gameData.gameId)
            setGameRightAnswer(right);
        }
        setGameState(novoRegistro);
        setHistoryInitialized(true);
        setUserAnswers(getGameAnswers(props.gameData.gameId));
    }, [])

    /**Consulta dicas para o estado atual */
    useEffect(() => {
        const getInitialTips: any = async (gameId: string, state: number, rightAnswer: boolean) => {
            const response = await getTips({
                gameId,
                state,
                rightAnswer
            })
            return response
        }

        if (gameState != null && historyInitialized) {
            getInitialTips(props.gameData.gameId, gameState, gameRightAnswer).then((response: any) => {
                if (response.success) {
                    setTips(response.tips);
                    //setGameState(response.tips?.length - 1)
                    if (response.rightAnswer && gameState >= 5) {
                        setLocalStorageRightAnswer(props.gameData.gameId, response.rightAnswer);
                        setGameRightAnswer(response.rightAnswer);
                    }
                    //console.log("Get tips response:", response);
                    if (response.clubData) {
                        setFinalAnswer(response.clubData);
                        /* if (respostaCardRef.current) {
                            respostaCardRef.current.scrollIntoView({ behavior: 'smooth' });
                        } */
                    }
                    setInitialized(true);
                }
            });
        }
    }, [historyInitialized])

    /** */
    useEffect(() => {
        // Verificar se a resposta é válida sempre que o valor de 'answer' mudar
        setIsValidAnswer(props.clubsNamesList.some(club => club.toLowerCase() === answer.toLowerCase()));
    }, [answer]);


    useEffect(() => {
        if (gameState != null && (gameState >= 5 || gameRightAnswer)) {
            if (respostaCardRef.current) {
                respostaCardRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
        //console.log({ finalAnswer })
    }, [finalAnswer]);

    /** Skeleton para renderizar enquanto não estiver inicializado */
    if (!initialized) {
        return (
            <List sx={{ width: '100%' }}>
                <ListItem >
                    <Skeleton width="100%" />
                </ListItem>
            </List>

        )
    }

    const onSubmitNextTip = () => {
        startTransitionNextTip(async () => {
            //console.log({ gameState })
            const response = await getTips({
                gameId: props.gameData.gameId,
                state: gameState + 1 || 0,
                answer: ""
            })

            // criar mais um campo para os dados do clube correto (separar do right Answer no local storage)

            if (response.success) {
                //console.log(response)
                setNewAnswer(props.gameData.gameId, response.userAnswer ?? "");
                setAnswer('');
                setTips(response.tips);
                setUserAnswers(getGameAnswers(props.gameData.gameId));
                setGameState((prev) => prev + 1);
                if (response.clubData) {
                    setFinalAnswer(response.clubData)
                }
            }


            //e.preventDefault();
            //console.log("submit")
            //setNewAnswer(gameId, '');
            //await checkAnswer({ clubName: '' });
            //setAnswer('');
            //setState(state + 1)
        })
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidAnswer)
            return
        startTransitionAnswer(async () => {

            const response = await getTips({
                gameId: props.gameData.gameId,
                state: gameState + 1 || 0,
                answer
            })
            //console.log({ response })
            if (response.success) {
                setNewAnswer(props.gameData.gameId, response.userAnswer ?? "");
                setAnswer('');
                setTips(response.tips);
                setUserAnswers(getGameAnswers(props.gameData.gameId));
                if (response.rightAnswer) {
                    //console.log("RESPOSTA CERTA")
                    setGameRightAnswer(true);
                    setLocalStorageRightAnswer(props.gameData.gameId, true);

                }
                setGameState((prev) => prev + 1);
                if (response.clubData) {
                    setFinalAnswer(response.clubData)
                }
            }
        })
    }

    return (
        <>
            {/** Lista de dicas */}
            {tips.length > 0 &&
                <TipsList tipsArray={tips} userAnswers={userAnswers} rightAnswered={gameRightAnswer} />
            }
            {/** Formulário de resposta */}
            {(gameState != null && gameState < 5 && !gameRightAnswer) && (
                <form
                    onSubmit={(e) => onSubmit(e)}
                >
                    <Grid container sx={{ my: 2 }}>
                        <Grid item xs='auto'>
                            <IconButton
                                onClick={(e) => onSubmitNextTip()}
                                disabled={pendingNextTip}
                            >
                                <ModelTrainingIcon color={
                                    (pendingNextTip) ? "disabled" : "secondary"} />
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <Autocomplete
                                freeSolo
                                options={clubSuggestions}
                                getOptionDisabled={(option) => userAnswers.includes(option)}
                                inputValue={answer}
                                onInputChange={(_, newInputValue) => {
                                    setAnswer(newInputValue);
                                    if (newInputValue.length >= 2) { // Verificar se há pelo menos dois caracteres
                                        const suggestions = filterClubs(props.clubsNamesList, newInputValue); // Filtrar sugestões com base nos caracteres digitados
                                        setClubSuggestions(suggestions); // Atualizar as sugestões do Autocomplete
                                    } else {
                                        setClubSuggestions([]); // Limpar sugestões se o comprimento da entrada for menor que 2
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        disabled={pendingNextTip || pendingAnswer}
                                        label="Palpite"
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs='auto'>
                            <IconButton
                                type="submit"
                                disabled={!isValidAnswer || answer.length === 0 || pendingAnswer}
                            >
                                <SendIcon color={
                                    (!isValidAnswer || answer.length === 0 || pendingAnswer) ? "disabled" : "primary"}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            )}
            {/** Resposta final e compartilhar */}
            {gameState != null && (gameState >= 5 || gameRightAnswer) &&
                <>
                    {finalAnswer &&
                        <Card ref={respostaCardRef} component={Paper} elevation={2} sx={{ mb: 2 }}>
                            <CardHeader title="Resposta" sx={{ textAlign: 'center' }} />
                            <CardContent sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ width: '100%' }}
                                >
                                    {!!finalAnswer.logo && !!finalAnswer.logo &&
                                        <>
                                            {/* <>
                                            <Image
                                                src={finalAnswer.logo}
                                                alt={`${finalAnswer.name}_logo`}
                                                sizes="30vw"
                                                style={{
                                                    width: 'auto',
                                                    height: '150px',
                                                }}
                                                width={150}
                                                height={150}
                                            />
                                            </> 
                                            */}
                                            <Suspense fallback={"...loading"}>
                                                <CloudinaryImage
                                                    src={"/" + finalAnswer.logo}
                                                    width={150}
                                                    height={150}
                                                />
                                            </Suspense>

                                        </>
                                    }
                                    <Typography variant="h4">
                                        <strong>{finalAnswer.name}</strong>
                                    </Typography>
                                </Stack>

                            </CardContent>
                        </Card>
                    }

                    <ShareCard
                        rightAnswer={gameRightAnswer}
                        tipsNeeded={getGameAnswers(props.gameData.gameId).length}
                        gameEdition={props.gameData.id}
                    />

                </>
            }
        </>
    )
}