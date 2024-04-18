"use client"
const DEFAULT_GAMES_HISTORY_KEY = 'cluble-history';

/** Obtem o histórico de jogos do Local Storage */
export const getUserGamesHistory = () => {
    const historyString = localStorage.getItem(DEFAULT_GAMES_HISTORY_KEY) || '';
    //console.log({historyString})
    let history = [];
    if (historyString.length > 0) {
        history = JSON.parse(historyString);
    }
    console.log({history})
    return history
}

/** Cadastra novo jogo no local storage, caso ainda não tenha registro */
export const setNewAnswer = (gameId: number, answer: string) => {
    const history = getUserGamesHistory();
    let lastGame = null;
    if(history){
        lastGame = history[history.length - 1]
    }
    if(!lastGame || lastGame.gameId != gameId){
        history.push({
            gameId,
            answers: [answer],
            rightAnswer: false,
            //date: 
        })
    }
    else{
        lastGame.answers.push(answer);
        history[history.length - 1] = lastGame;
    }
    localStorage.setItem(DEFAULT_GAMES_HISTORY_KEY, JSON.stringify(history));
}

export const getGameAnswers = (gameId: number) => {
    const historyString = localStorage.getItem(DEFAULT_GAMES_HISTORY_KEY) || '';
    console.log({historyString})
    let history = [];
    if (historyString.length > 0) {
        history = JSON.parse(historyString);
    }
    const answers = history.find((game: GameHistoryLocalStorage)=>game.gameId = gameId).answers
    console.log({answers})
    return answers
}