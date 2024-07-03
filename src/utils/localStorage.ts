"use client"

import { getCurrentDay } from "./get-date";

const DEFAULT_GAMES_HISTORY_KEY = 'cluble-history_2';

/** Obtem o histórico de jogos do Local Storage */
export const getUserGamesHistory = () => {
    const historyString = localStorage.getItem(DEFAULT_GAMES_HISTORY_KEY) || '';
    //console.log({historyString})
    let history = [];
    if (historyString.length > 0) {
        history = JSON.parse(historyString);
    }
    //console.log("Função getUserGamesHistory()", { history })
    return history
}

/** Cadastra nova resposta no local storage. 
 * Caso ainda não tena registro do jogo, inicializa o registro
*/
export const setNewAnswer = (gameId: string, answer: string) => {
    const history = getUserGamesHistory();
    if (history) {
        const gameIndex = history.findIndex((game: GameHistoryLocalStorage) => game.gameId === gameId);
        if (gameIndex !== -1) {
            history[gameIndex].answers.push(answer);
        } else {
            history.push({
                gameId,
                answers: [answer],
                rightAnswer: false,
                date: getCurrentDay() 
            });
        }
        localStorage.setItem(DEFAULT_GAMES_HISTORY_KEY, JSON.stringify(history));
    }
}

/** Obtém as respostas de um jogo pelo gameId */
export const getGameAnswers = (gameId: string) => {
    const history = getUserGamesHistory();
    let answers: string[] = [];
    if (history) {
        const game = history.find((game: GameHistoryLocalStorage) => game.gameId === gameId);
        if (game) {
            answers = game.answers || [];
        }
    }
    return answers;
}

/** Cadastra resposta correta */
export const setLocalStorageRightAnswer = (gameId: string, answer: boolean) => {
    const history = getUserGamesHistory();
    if (history) {
        const gameIndex = history.findIndex((game: GameHistoryLocalStorage) => game.gameId === gameId);
        if (gameIndex !== -1) {
            history[gameIndex].rightAnswer = answer;
            localStorage.setItem(DEFAULT_GAMES_HISTORY_KEY, JSON.stringify(history));
        }
    }
}

/** Obtém resposta correta de um jogo pelo gameId */
export const getLocalStorageRightAnswer = (gameId: string) => {
    const history = getUserGamesHistory();
    let rightAnswer: boolean = false;
    if (history) {
        const game = history.find((game: GameHistoryLocalStorage) => game.gameId === gameId);
        if (game) {
            rightAnswer = game.rightAnswer ?? false;
        }
    }
    return rightAnswer;
}

/** Insere novo jogo no registro */
export const setLocalStorageNewGame = (gameId: string) => {
    const history = getUserGamesHistory();
    if (history) {
        const gameIndex = history.findIndex((game: GameHistoryLocalStorage) => game.gameId === gameId);
        console.log(gameIndex, history)
        if (gameIndex == -1) {
            history.push({
                gameId,
                answers: [],
                rightAnswer: false,
                date: getCurrentDay() 
            });
        }
        console.log(history)
        localStorage.setItem(DEFAULT_GAMES_HISTORY_KEY+'_2', JSON.stringify(history));
    }
}