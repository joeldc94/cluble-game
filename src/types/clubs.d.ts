/** Dados de cada clube */
type ClubData = {
    id: number;
    name: string;
    colors: string[];
    state: string | null;
    city: string;
    stadium: string | null;
    foundationYear: number | null;
    idol: string | null;
}

/** Dados da partida no kv */
type GameData = {
    gameId: number;
    clubId: number;
    date: Date;
}