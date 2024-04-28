/** Dados de cada clube */
type ClubData = {
    id: number;
    name: string;
    fullName: string;
    city: string;
    state: string | null;    
    country: string;
    stadium: string | null;
    stadiumFullName: string;
    division: string;
    colors: string[];
    foundationYear: number | null;
    idol: string | null;
    mascot: string;
}

/** Dados da partida no kv */
/* type GameData = {
    gameId: string;
    gameCounter: number;
    clubId: number;
    date: Date;
} */

/** Dados da partida no kv */
type GameData = {
    id: number;
    gameId: string;
    clubId: number;
    createdAt: Date;
}

/** Dados das partidas salvos no localStorage */
type GameHistoryLocalStorage = {
    gameId: string;
    //gameCounter: number;
    answers: string[];
    rightAnswer: boolean;
    date: string;
}