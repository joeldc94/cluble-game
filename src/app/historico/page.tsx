"use client"
import { getCurrentDateFormatted } from "@/utils/get-date"
import { getUserGamesHistory } from "@/utils/localStorage"
import { Typography, Divider, Grid, List, ListItem, ListItemText, Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"


export default function BugPage() {
    const [userHistory, setUserHistory] = useState<GameHistoryLocalStorage[]>()
    const listRef = useRef<HTMLUListElement>(null); // Referência para o componente List

     // Função para copiar o texto para a área de transferência
     const copyToClipboard = () => {
        if (listRef.current) {
            const textToCopy = listRef.current.innerText; // Obtém o texto dentro do componente List
            navigator.clipboard.writeText(textToCopy); // Copia o texto para a área de transferência
            alert("Texto copiado");
        }
    };
    
    useEffect(() => {
        setUserHistory(getUserGamesHistory())
    }, [])
    return (
        <>
            <Typography variant="h1" textAlign="center">
                CLUBLE
            </Typography>
            <Divider />
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item xs={1} />
                <Grid item xs>
                    <Typography variant="subtitle1" textAlign="center">
                        {getCurrentDateFormatted()}
                    </Typography>
                </Grid>
                <Grid item xs={1} />
            </Grid>
            <Divider  />
            {/* Botão para copiar o texto para a área de transferência */}
            <Button sx={{mt:2}} variant="contained" color="primary" onClick={copyToClipboard}>
                Copiar Histórico
            </Button>
            <List ref={listRef}>
                {userHistory?.map((gameHistory: GameHistoryLocalStorage) => {
                    return (
                        <>
                            <p><strong>Data: </strong>{gameHistory.date}</p>
                            <p><strong>ID do jogo: </strong>{gameHistory.gameId}</p>
                            <p><strong>Resposta certa: </strong>{gameHistory.rightAnswer ? "Sim" : "Não"}</p>
                            <p><strong>Palpites: </strong>{`${gameHistory.answers} `}</p>
                            <Divider />

                        </>
                    )
                })}
            </List>
        </>
    )
}