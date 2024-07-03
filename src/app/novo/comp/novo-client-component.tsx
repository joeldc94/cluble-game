"use client"

import { setLocalStorageNewGame } from "@/utils/localStorage";
import { useEffect } from "react";

type NovoTipsProps = {
    game: GameData;
    clubsNamesList: string[];
    gameEdition: number;
}
export default function NovoTipsComponent({ game, clubsNamesList, gameEdition }: NovoTipsProps) {

    useEffect(() => {
        //verificar se o registro do jogo já existe
        setLocalStorageNewGame(game.gameId);
    }, [])
    

    return (
        <></>
    )
}