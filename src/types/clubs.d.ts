/** Dados de cada clube */
/** Dados de cada clube */
type ClubData = {
    id: number;
    apiFootballId: number | null; // Permite que apiFootballId seja null
    name: string;
    fullName: string;
    city: string;
    state: string | null;
    country: string;
    stadium: string | null;
    stadiumFullName: string;
    division?: string; // Propriedade opcional
    colors: string[];
    foundationYear: number | null; // Permite que foundationYear seja null
    idol?: string | null; // Propriedade opcional
    mascot?: string | null; // Propriedade opcional
    logo?: string; // Propriedade opcional
};


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
    clubId?: number;
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

type Tip = {
    label: string;
    value: string | string[] | number | null;
}