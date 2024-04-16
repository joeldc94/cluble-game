"use client"
import { Autocomplete, Button, Grid, IconButton, Input, List, ListItem, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useEffect, useState } from "react";
import { checkAnswer } from "@/actions/check-answer";


interface TipsProps {
    club: ClubData;
    clubsNamesList: string[];
    state: number;
    setState: (prevState: number) => void;
    rightAnswer: boolean;
    setRightAnswer: (prevState: boolean) => void;
}

export default function AnswerForm({ club, clubsNamesList, state, rightAnswer, setRightAnswer,  setState }: TipsProps) {

    const [answer, setAnswer] = useState<string>('');
    //const [rightAnswer, setRightAnswer] = useState<boolean>(false);
    // Estado para controlar as sugestões do Autocomplete
    const [clubSuggestions, setClubSuggestions] = useState<string[]>([]);
    const [isValidAnswer, setIsValidAnswer] = useState<boolean>(false); // Novo estado para rastrear se a resposta é válida
    const [selectedClub, setSelectedClub] = useState<string>(''); // Estado para armazenar o clube selecionado

    const handleClubSelect = (club: string) => {
        console.log({ club })
        setSelectedClub(club); // Atualiza o estado com o clube selecionado
    };

    // Função para remover acentos de uma string
    const removeAccents = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Função para filtrar os clubes com base no valor de entrada
    const filterClubs = (inputValue: string) => {
        if (inputValue.length < 2) {
            return []; // Retorna uma lista vazia se o valor de entrada for menor que 2 caracteres
        }
        const inputValueWithoutAccents = removeAccents(inputValue.toLowerCase()); // Remover acentos e converter para minúsculas
        return clubsNamesList
            .filter(club => removeAccents(club.toLowerCase()).startsWith(inputValueWithoutAccents))
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit")
        if (isValidAnswer) {
            const response = await checkAnswer({ clubName: answer });
            
            setAnswer('');
            if (response.rightAnswer) {
                setRightAnswer(response.rightAnswer);
            }
            else{
                setState(state + 1)
            }
        }
    }

    useEffect(() => {
        // Verificar se a resposta é válida sempre que o valor de 'answer' mudar
        setIsValidAnswer(clubsNamesList.some(club => club.toLowerCase() === answer.toLowerCase()));
    }, [answer]);

    return (
        <>
            <form
                onSubmit={(e) => onSubmit(e)}
            >
                {state < 5 && !rightAnswer &&
                    <Grid container>
                        <Grid item xs>
                            <Autocomplete
                                freeSolo
                                options={clubSuggestions} // Usar clubSuggestions em vez de clubs.map(club => club.name)
                                inputValue={answer}
                                onInputChange={(event, newInputValue) => {
                                    setAnswer(newInputValue);
                                    if (newInputValue.length >= 2) { // Verificar se há pelo menos dois caracteres
                                        const suggestions = filterClubs(newInputValue); // Filtrar sugestões com base nos caracteres digitados
                                        setClubSuggestions(suggestions); // Atualizar as sugestões do Autocomplete
                                    } else {
                                        setClubSuggestions([]); // Limpar sugestões se o comprimento da entrada for menor que 2
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Palpite" variant="standard" />
                                )}
                            />
                        </Grid>

                        <Grid item xs='auto'>
                            <IconButton
                                type="submit"
                                disabled={!isValidAnswer || answer.length === 0}
                            >
                                <SendIcon color="primary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                }
            </form>
        </>
    )

}