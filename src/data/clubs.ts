export type ClubData = {
    id: number;
    name: string;
    colors: string[];
    state: string | null;
    city: string;
    staduim: string | null;
    foundationYear: number | null;
    idol: string | null;
}

export const clubs: ClubData[] = [
    {
        id: 1,
        name: 'Flamengo',
        colors: ['red','black'],
        state: 'RJ',
        city: 'Rio de janeiro',
        staduim: 'Maracanã',
        foundationYear: 1895,
        idol: 'Zico'
    },
    {
        id: 2,
        name: 'São Paulo',
        colors: ['red', 'white', 'black'],
        state: 'SP',
        city: 'São Paulo',
        staduim: 'MorumBis',
        foundationYear: 1930,
        idol: 'Rogério Ceni'
    },
    {
        id: 3,
        name: 'Corinthians',
        colors: ['black', 'white'],
        state: 'SP',
        city: 'São Paulo',
        staduim: 'Arena Corinthians',
        foundationYear: 1910,
        idol: 'Sócrates'
    },
    {
        id: 4,
        name: 'Cruzeiro',
        colors: ['blue', 'white'],
        state: 'MG',
        city: 'Belo Horizonte',
        staduim: 'Mineirão',
        foundationYear: 1921,
        idol: 'Tostão'
    },
    {
        id: 5,
        name: 'Grêmio',
        colors: ['blue', 'black', 'white'],
        state: 'RS',
        city: 'porto Alegre',
        staduim: 'Arena do Grêmio',
        foundationYear: 1903,
        idol: 'Renato Portaluppi'
    },
]