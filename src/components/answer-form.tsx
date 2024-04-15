"use client"
import { ClubData, clubs } from "@/data/clubs";
import { getClubById } from "@/utils/get-club";
import { Autocomplete, Button, Grid, IconButton, Input, List, ListItem, TextField, Typography } from "@mui/material";
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SendIcon from '@mui/icons-material/Send';
import { FormEvent, useEffect, useState } from "react";


interface TipsProps {
    club: ClubData;
    state: number;
    setState: (prevState: number) => void;
}

export default function AnswerForm({ club, state, setState }: TipsProps) {

    const [answer, setAnswer] = useState<string>('');
    // Estado para controlar as sugestões do Autocomplete
    const [clubSuggestions, setClubSuggestions] = useState<string[]>([]);
    const [isValidAnswer, setIsValidAnswer] = useState<boolean>(false); // Novo estado para rastrear se a resposta é válida
    const [selectedClub, setSelectedClub] = useState<ClubData | null>(null); // Estado para armazenar o clube selecionado

    const rightAnswer = false;

    const handleClubSelect = (club: ClubData | null) => {
        console.log({club})
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
        return clubs
            .filter(club => removeAccents(club.name.toLowerCase()).startsWith(inputValueWithoutAccents))
            .map(club => club.name); // Retorna apenas o nome do clube
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidAnswer) {
            //console.log(selectedClub?.id)
            setAnswer('');
            setState(state + 1)
        }
    }

    useEffect(() => {
        // Verificar se a resposta é válida sempre que o valor de 'answer' mudar
        setIsValidAnswer(clubs.some(club => club.name.toLowerCase() === answer.toLowerCase()));
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