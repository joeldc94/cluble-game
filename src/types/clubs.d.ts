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
    stadiumFullName?: string;
    division?: string |null; // Propriedade opcional
    colors: string[];
    foundationYear: number | null; // Permite que foundationYear seja null
    idol?: string | null; // Propriedade opcional
    mascot?: string | null; // Propriedade opcional
    logo?: string | null; // Propriedade opcional
};


/** Dados da de um jogo */
type GameInfo = {
    id: number;
    name: string;
    fullName: string;
    description?: string | null;
}

/** Dados da partida no kv */
type GameData = {
    id: number;
    gameInfoId: number;
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