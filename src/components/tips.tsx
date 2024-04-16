"use client"
import { useEffect, useState } from "react";
import { Input, List, ListItem, TextField, Typography } from "@mui/material";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import AnswerForm from "./answer-form";

interface TipsProps {
    club: ClubData;
    initialState: number;
    clubsNamesList: string[];
}

export default function Tips({ club, initialState, clubsNamesList }: TipsProps) {

    const [state, setState] = useState<number>(initialState);
    const [rightAnswer, setRightAnswer] = useState<boolean>(false);

    useEffect(()=>{
        const localStorageKey = "answeredClubs";
        const answeredClubs: string[] = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        setState(answeredClubs.length)
        const answered = JSON.parse(localStorage.getItem("rightAnswer") || "null") as boolean;
        setRightAnswer(answered)
    },[])

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

            <AnswerForm
                club={club}
                state={state}
                setState={setState}
                rightAnswer={rightAnswer}
                setRightAnswer={setRightAnswer}
                clubsNamesList={clubsNamesList}
            />
        </>
    )

}