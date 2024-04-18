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
    //console.log({ history })
    return history
}

/** Cadastra nova resposta no local storage. 
 * Caso ainda não tena registro do jogo, inicializa o registro
*/
export const setNewAnswer = (gameId: number, answer: string) => {
    const history = getUserGamesHistory();
    let lastGame = null;
    if (history) {
        lastGame = history[history.length - 1]
    }
    if (!lastGame || lastGame.gameId != gameId) {
        history.push({
            gameId,
            answers: [answer],
            rightAnswer: false,
            //date: 
        })
    }
    else {
        lastGame.answers.push(answer);
        history[history.length - 1] = lastGame;
    }
    localStorage.setItem(DEFAULT_GAMES_HISTORY_KEY, JSON.stringify(history));
}

/** Obtém as respostas de um jogo pelo gameId */
export const getGameAnswers = (gameId: number) => {
    const historyString = localStorage.getItem(DEFAULT_GAMES_HISTORY_KEY) || '';
    //console.log({ historyString })
    let history = [];
    let answers = [];
    if (historyString.length > 0) {
        history = JSON.parse(historyString);
        answers = history.find((game: GameHistoryLocalStorage) => game.gameId = gameId).answers
    }
    //console.log({ answers })
    return answers
}

/** Cadastra resposta correta */
export const setLocalStorageRightAnswer = (gameId: number, answer: boolean) => {
    const history = getUserGamesHistory();
    let lastGame = null;
    if (history) {
        lastGame = history[history.length - 1]
    }
    lastGame.rightAnswer = answer;
    history[history.length - 1] = lastGame;
    localStorage.setItem(DEFAULT_GAMES_HISTORY_KEY, JSON.stringify(history));
}

/** Cadastra resposta correta */
export const getLocalStorageRightAnswer = (gameId: number) => {
    //console.log("obter right anser do local storage")
    const history = getUserGamesHistory();
    //console.log({ history })
    if (history.length == 0) return false
    //console.log(history[history.length - 1].rightAnswer)
    return history[history.length - 1].rightAnswer;

}