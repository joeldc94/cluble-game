export type ClubData = {
    id: number;
    name: string;
    colors: string[];
    state: string | null;
    city: string;
    stadium: string | null;
    foundationYear: number | null;
    idol: string | null;
}

export type CurrentClub = {
    id: number[];
}

export const clubs: ClubData[] = [
    {
        id: 1,
        name: 'Flamengo',
        colors: ['red', 'black'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'Maracanã',
        foundationYear: 1895,
        idol: 'Zico'
    },
    {
        id: 2,
        name: 'São Paulo',
        colors: ['red', 'white', 'black'],
        state: 'SP',
        city: 'São Paulo',
        stadium: 'Morumbi',
        foundationYear: 1930,
        idol: 'Rogério Ceni'
    },
    {
        id: 3,
        name: 'Corinthians',
        colors: ['black', 'white'],
        state: 'SP',
        city: 'São Paulo',
        stadium: 'Arena Corinthians',
        foundationYear: 1910,
        idol: 'Sócrates'
    },
    {
        id: 4,
        name: 'Cruzeiro',
        colors: ['blue', 'white'],
        state: 'MG',
        city: 'Belo Horizonte',
        stadium: 'Mineirão',
        foundationYear: 1921,
        idol: 'Tostão'
    },
    {
        id: 5,
        name: 'Grêmio',
        colors: ['blue', 'black', 'white'],
        state: 'RS',
        city: 'Porto Alegre',
        stadium: 'Arena do Grêmio',
        foundationYear: 1903,
        idol: 'Renato Portaluppi'
    },
    {
        id: 6,
        name: 'Palmeiras',
        colors: ['green', 'white'],
        state: 'SP',
        city: 'São Paulo',
        stadium: 'Allianz Parque',
        foundationYear: 1914,
        idol: 'Ademir da Guia'
    },
    {
        id: 7,
        name: 'Internacional',
        colors: ['red', 'white'],
        state: 'RS',
        city: 'Porto Alegre',
        stadium: 'Beira-Rio',
        foundationYear: 1909,
        idol: 'Falcão'
    },
    {
        id: 8,
        name: 'Vasco da Gama',
        colors: ['black', 'white'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'São Januário',
        foundationYear: 1898,
        idol: 'Romário'
    },
    {
        id: 9,
        name: 'Athletico Paranaense',
        colors: ['black', 'red'],
        state: 'PR',
        city: 'Curitiba',
        stadium: 'Arena da Baixada',
        foundationYear: 1924,
        idol: 'Petraglia'
    },
    {
        id: 10,
        name: 'Fluminense',
        colors: ['green', 'white'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'Maracanã',
        foundationYear: 1902,
        idol: 'Fernando Diniz'
    },
    {
        id: 11,
        name: 'Botafogo',
        colors: ['black', 'white'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'Nilton Santos',
        foundationYear: 1904,
        idol: 'Nilton Santos'
    },
    {
        id: 12,
        name: 'Santos',
        colors: ['white', 'black'],
        state: 'SP',
        city: 'Santos',
        stadium: 'Vila Belmiro',
        foundationYear: 1912,
        idol: 'Pelé'
    },
    {
        id: 13,
        name: 'Fortaleza',
        colors: ['blue', 'red'],
        state: 'CE',
        city: 'Fortaleza',
        stadium: 'Castelão',
        foundationYear: 1918,
        idol: 'Clodoaldo'
    },
    {
        id: 14,
        name: 'Bahia',
        colors: ['blue', 'red', 'white'],
        state: 'BA',
        city: 'Salvador',
        stadium: 'Fonte Nova',
        foundationYear: 1931,
        idol: 'Bobô'
    },
    {
        id: 15,
        name: 'Goiás',
        colors: ['green', 'white'],
        state: 'GO',
        city: 'Goiânia',
        stadium: 'Serra Dourada',
        foundationYear: 1943,
        idol: 'Túlio Maravilha'
    },
    {
        id: 16,
        name: 'Atlético Mineiro',
        colors: ['black', 'white'],
        state: 'MG',
        city: 'Belo Horizonte',
        stadium: 'Mineirão',
        foundationYear: 1908,
        idol: 'Reinaldo'
    },
    {
        id: 17,
        name: 'Ceará',
        colors: ['black', 'white'],
        state: 'CE',
        city: 'Fortaleza',
        stadium: 'Castelão',
        foundationYear: 1914,
        idol: 'César Sampaio'
    },
    {
        id: 18,
        name: 'Sport Recife',
        colors: ['red', 'black'],
        state: 'PE',
        city: 'Recife',
        stadium: 'Ilha do Retiro',
        foundationYear: 1905,
        idol: 'Juninho Pernambucano'
    },
    {
        id: 19,
        name: 'Vitória',
        colors: ['red', 'black'],
        state: 'BA',
        city: 'Salvador',
        stadium: 'Barradão',
        foundationYear: 1899,
        idol: 'Bebeto'
    },
    {
        id: 20,
        name: 'Atlético Goianiense',
        colors: ['black', 'red'],
        state: 'GO',
        city: 'Goiânia',
        stadium: 'Antônio Accioly',
        foundationYear: 1937,
        idol: 'Zé Carlos'
    },
    {
        id: 21,
        name: 'Coritiba',
        colors: ['green', 'white'],
        state: 'PR',
        city: 'Curitiba',
        stadium: 'Couto Pereira',
        foundationYear: 1909,
        idol: 'Dirceu Krüger'
    },
    {
        id: 22,
        name: 'Santa Cruz',
        colors: ['black', 'white'],
        state: 'PE',
        city: 'Recife',
        stadium: 'Arruda',
        foundationYear: 1914,
        idol: 'Bebeto'
    },
    {
        id: 23,
        name: 'Paraná',
        colors: ['red', 'blue', 'white'],
        state: 'PR',
        city: 'Curitiba',
        stadium: 'Durival Britto',
        foundationYear: 1989,
        idol: 'Balotelli'
    },
    {
        id: 24,
        name: 'Paysandu',
        colors: ['black', 'white'],
        state: 'PA',
        city: 'Belém',
        stadium: 'Curuzu',
        foundationYear: 1914,
        idol: 'Messias'
    },
    {
        id: 25,
        name: 'Remo',
        colors: ['blue', 'white'],
        state: 'PA',
        city: 'Belém',
        stadium: 'Baenão',
        foundationYear: 1905,
        idol: 'Quarentinha'
    },
    {
        id: 26,
        name: 'Joinville',
        colors: ['white', 'black'],
        state: 'SC',
        city: 'Joinville',
        stadium: 'Arena Joinville',
        foundationYear: 1976,
        idol: 'Sorato'
    },
    {
        id: 27,
        name: 'CRB',
        colors: ['red', 'white'],
        state: 'AL',
        city: 'Maceió',
        stadium: 'Rei Pelé',
        foundationYear: 1912,
        idol: 'Zinho'
    },
    {
        id: 28,
        name: 'CSA',
        colors: ['blue', 'white'],
        state: 'AL',
        city: 'Maceió',
        stadium: 'Rei Pelé',
        foundationYear: 1913,
        idol: 'Mazinho'
    },
    {
        id: 29,
        name: 'Sampaio Corrêa',
        colors: ['yellow', 'green'],
        state: 'MA',
        city: 'São Luís',
        stadium: 'Castelão',
        foundationYear: 1923,
        idol: 'Jorge Pinheiro'
    },
    {
        id: 30,
        name: 'América Mineiro',
        colors: ['green', 'white'],
        state: 'MG',
        city: 'Belo Horizonte',
        stadium: 'Independência',
        foundationYear: 1912,
        idol: 'Toninho Cerezo'
    },
    {
        id: 31,
        name: 'Figueirense',
        colors: ['black', 'white'],
        state: 'SC',
        city: 'Florianópolis',
        stadium: 'Orlando Scarpelli',
        foundationYear: 1921,
        idol: 'Marquinhos'
    },
    {
        id: 32,
        name: 'Brasil de Pelotas',
        colors: ['yellow', 'black'],
        state: 'RS',
        city: 'Pelotas',
        stadium: 'Bento Freitas',
        foundationYear: 1911,
        idol: 'Itamar'
    },
    {
        id: 33,
        name: 'Chapecoense',
        colors: ['green', 'white'],
        state: 'SC',
        city: 'Chapecó',
        stadium: 'Arena Condá',
        foundationYear: 1973,
        idol: 'Cleber Santana'
    },
    {
        id: 34,
        name: 'Avaí',
        colors: ['blue', 'white'],
        state: 'SC',
        city: 'Florianópolis',
        stadium: 'Ressacada',
        foundationYear: 1923,
        idol: 'Milton Cruz'
    },
    {
        id: 35,
        name: 'Guarani',
        colors: ['green', 'white'],
        state: 'SP',
        city: 'Campinas',
        stadium: 'Brinco de Ouro',
        foundationYear: 1911,
        idol: 'Careca'
    },
    {
        id: 36,
        name: 'Ponte Preta',
        colors: ['black', 'white'],
        state: 'SP',
        city: 'Campinas',
        stadium: 'Moisés Lucarelli',
        foundationYear: 1900,
        idol: 'Dicá'
    },
    {
        id: 37,
        name: 'CRAC',
        colors: ['yellow', 'blue'],
        state: 'GO',
        city: 'Catalão',
        stadium: 'Genervino da Fonseca',
        foundationYear: 1954,
        idol: 'Tulio'
    },
    {
        id: 38,
        name: 'Londrina',
        colors: ['blue', 'white'],
        state: 'PR',
        city: 'Londrina',
        stadium: 'Estádio do Café',
        foundationYear: 1956,
        idol: 'Paulinho'
    },
    {
        id: 39,
        name: 'Náutico',
        colors: ['red', 'white'],
        state: 'PE',
        city: 'Recife',
        stadium: 'Aflitos',
        foundationYear: 1901,
        idol: 'Kuki'
    },
    {
        id: 40,
        name: 'ABC',
        colors: ['black', 'white'],
        state: 'RN',
        city: 'Natal',
        stadium: 'Frasqueirão',
        foundationYear: 1915,
        idol: 'Marinho Chagas'
    },
    {
        id: 41,
        name: 'Luverdense',
        colors: ['green', 'white'],
        state: 'MT',
        city: 'Lucas do Rio Verde',
        stadium: 'Passo das Emas',
        foundationYear: 2004,
        idol: 'Maurílio'
    },
    {
        id: 42,
        name: 'Juventude',
        colors: ['green', 'white'],
        state: 'RS',
        city: 'Caxias do Sul',
        stadium: 'Alfredo Jaconi',
        foundationYear: 1913,
        idol: 'Valdomiro'
    },
    {
        id: 43,
        name: 'Atlético Goianiense',
        colors: ['black', 'red'],
        state: 'GO',
        city: 'Goiânia',
        stadium: 'Antônio Accioly',
        foundationYear: 1937,
        idol: 'Zé Carlos'
    },
    {
        id: 44,
        name: 'Operário Ferroviário',
        colors: ['black', 'white'],
        state: 'PR',
        city: 'Ponta Grossa',
        stadium: 'Germano Krüger',
        foundationYear: 1912,
        idol: 'Fernandes'
    },
    {
        id: 45,
        name: 'Brusque',
        colors: ['red', 'white'],
        state: 'SC',
        city: 'Brusque',
        stadium: 'Augusto Bauer',
        foundationYear: 1987,
        idol: 'Careca'
    },
    {
        id: 46,
        name: 'Tombense',
        colors: ['green', 'white'],
        state: 'MG',
        city: 'Tombos',
        stadium: 'Almeidão',
        foundationYear: 1914,
        idol: 'Edmar'
    },
    {
        id: 47,
        name: 'Mirassol',
        colors: ['yellow', 'black'],
        state: 'SP',
        city: 'Mirassol',
        stadium: 'José Maria de Campos Maia',
        foundationYear: 1925,
        idol: 'Fábio'
    },
    {
        id: 48,
        name: 'Volta Redonda',
        colors: ['yellow', 'black'],
        state: 'RJ',
        city: 'Volta Redonda',
        stadium: 'Raulino de Oliveira',
        foundationYear: 1976,
        idol: 'Ademir'
    },
    {
        id: 49,
        name: 'Criciúma',
        colors: ['yellow', 'black'],
        state: 'SC',
        city: 'Criciúma',
        stadium: 'Heriberto Hulse',
        foundationYear: 1947,
        idol: 'Zé Carlos'
    },
    {
        id: 50,
        name: 'Marília',
        colors: ['green', 'white'],
        state: 'SP',
        city: 'Marília',
        stadium: 'Bento de Abreu',
        foundationYear: 1942,
        idol: 'Birigui'
    },
];
