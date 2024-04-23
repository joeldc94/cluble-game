import "server-only"

export type CurrentClub = {
    id: number[];
}

export const clubs = [
    {
        id: 1,
        name: 'Flamengo',
        colors: ['#C52613', '#000000'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'Maracanã',
        foundationYear: 1895,
        idol: 'Zico'
    },
    {
        id: 2,
        name: 'São Paulo',
        colors: ['#C40008', '#FFFFFF', '#000000'],
        state: 'SP',
        city: 'São Paulo',
        stadium: 'Morumbi',
        foundationYear: 1930,
        idol: 'Rogério Ceni'
    },
    {
        id: 3,
        name: 'Corinthians',
        colors: ['#231f20', '#FFFFFF'],
        state: 'SP',
        city: 'São Paulo',
        stadium: 'Arena Corinthians',
        foundationYear: 1910,
        idol: 'Sócrates'
    },
    {
        id: 4,
        name: 'Cruzeiro',
        colors: ['#2F529E', '#FFFFFF'],
        state: 'MG',
        city: 'Belo Horizonte',
        stadium: 'Mineirão',
        foundationYear: 1921,
        idol: 'Tostão'
    },
    {
        id: 5,
        name: 'Grêmio',
        colors: ['#0D80BF', '#000000', '#FFFFFF'],
        state: 'RS',
        city: 'Porto Alegre',
        stadium: 'Arena do Grêmio',
        foundationYear: 1903,
        idol: 'Renato Portaluppi'
    },
    {
        id: 6,
        name: 'Palmeiras',
        colors: ['#006437', '#FFFFFF'],
        state: 'SP',
        city: 'São Paulo',
        stadium: 'Allianz Parque',
        foundationYear: 1914,
        idol: 'Ademir da Guia'
    },
    {
        id: 7,
        name: 'Internacional',
        colors: ['#E2231A', '#FFFFFF'],
        state: 'RS',
        city: 'Porto Alegre',
        stadium: 'Beira-Rio',
        foundationYear: 1909,
        idol: 'Falcão'
    },
    {
        id: 8,
        name: 'Vasco da Gama',
        colors: ['#E2231A', '#000000', '#FFFFFF'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'São Januário',
        foundationYear: 1898,
        idol: 'Romário'
    },
    {
        id: 9,
        name: 'Athletico Paranaense',
        colors: ['#B0000B', '#000000', '#FFFFFF'],
        state: 'PR',
        city: 'Curitiba',
        stadium: 'Arena da Baixada',
        foundationYear: 1924,
        idol: 'Petraglia'
    },
    {
        id: 10,
        name: 'Fluminense',
        colors: ['#00613C', '#870A28', '#FFFFFF'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'Maracanã',
        foundationYear: 1902,
        idol: 'Fernando Diniz'
    },
    {
        id: 11,
        name: 'Botafogo',
        colors: ['#000000', '#FFFFFF'],
        state: 'RJ',
        city: 'Rio de Janeiro',
        stadium: 'Nilton Santos',
        foundationYear: 1904,
        idol: 'Nilton Santos'
    },
    {
        id: 12,
        name: 'Santos',
        colors: ['#FFFFFF', '#000000'],
        state: 'SP',
        city: 'Santos',
        stadium: 'Vila Belmiro',
        foundationYear: 1912,
        idol: 'Pelé'
    },
    {
        id: 13,
        name: 'Fortaleza',
        colors: ['#0000FF', '#FF0000'],
        state: 'CE',
        city: 'Fortaleza',
        stadium: 'Castelão',
        foundationYear: 1918,
        idol: 'Clodoaldo'
    },
    {
        id: 14,
        name: 'Bahia',
        colors: ['#0000FF', '#FF0000', '#FFFFFF'],
        state: 'BA',
        city: 'Salvador',
        stadium: 'Fonte Nova',
        foundationYear: 1931,
        idol: 'Bobô'
    },
    {
        id: 15,
        name: 'Goiás',
        colors: ['#008000', '#FFFFFF'],
        state: 'GO',
        city: 'Goiânia',
        stadium: 'Serra Dourada',
        foundationYear: 1943,
        idol: 'Túlio Maravilha'
    },
    {
        id: 16,
        name: 'Atlético Mineiro',
        colors: ['#000000', '#FFFFFF'],
        state: 'MG',
        city: 'Belo Horizonte',
        stadium: 'Mineirão',
        foundationYear: 1908,
        idol: 'Reinaldo'
    },
    {
        id: 17,
        name: 'Ceará',
        colors: ['#000000', '#FFFFFF'],
        state: 'CE',
        city: 'Fortaleza',
        stadium: 'Castelão',
        foundationYear: 1914,
        idol: 'César Sampaio'
    },
    {
        id: 18,
        name: 'Sport Recife',
        colors: ['#CC001A', '#000000'],
        state: 'PE',
        city: 'Recife',
        stadium: 'Ilha do Retiro',
        foundationYear: 1905,
        idol: 'Juninho Pernambucano'
    },
    {
        id: 19,
        name: 'Vitória',
        colors: ['#FF0000', '#000000'],
        state: 'BA',
        city: 'Salvador',
        stadium: 'Barradão',
        foundationYear: 1899,
        idol: 'Bebeto'
    },
    {
        id: 20,
        name: 'Atlético Goianiense',
        colors: ['#000000', '#ED3237'],
        state: 'GO',
        city: 'Goiânia',
        stadium: 'Antônio Accioly',
        foundationYear: 1937,
        idol: 'Zé Carlos'
    },
    {
        id: 21,
        name: 'Coritiba',
        colors: ['#00544D', '#FFFFFF'],
        state: 'PR',
        city: 'Curitiba',
        stadium: 'Couto Pereira',
        foundationYear: 1909,
        idol: 'Dirceu Krüger'
    },
    {
        id: 22,
        name: 'Santa Cruz',
        colors: ['#000000', '#FFFFFF'],
        state: 'PE',
        city: 'Recife',
        stadium: 'Arruda',
        foundationYear: 1914,
        idol: 'Bebeto'
    },
    {
        id: 23,
        name: 'Paraná',
        colors: ['#FF1035', '#00428E', '#FFFFFF'],
        state: 'PR',
        city: 'Curitiba',
        stadium: 'Durival Britto',
        foundationYear: 1989,
        idol: 'Balotelli'
    },
    {
        id: 24,
        name: 'Paysandu',
        colors: ['#000000', '#FFFFFF'],
        state: 'PA',
        city: 'Belém',
        stadium: 'Curuzu',
        foundationYear: 1914,
        idol: 'Messias'
    },
    {
        id: 25,
        name: 'Remo',
        colors: ['#0000FF', '#FFFFFF'],
        state: 'PA',
        city: 'Belém',
        stadium: 'Baenão',
        foundationYear: 1905,
        idol: 'Quarentinha'
    },
    {
        id: 26,
        name: 'Joinville',
        colors: ['#FFFFFF', '#000000'],
        state: 'SC',
        city: 'Joinville',
        stadium: 'Arena Joinville',
        foundationYear: 1976,
        idol: 'Sorato'
    },
    {
        id: 27,
        name: 'CRB',
        colors: ['#FF0000', '#FFFFFF'],
        state: 'AL',
        city: 'Maceió',
        stadium: 'Rei Pelé',
        foundationYear: 1912,
        idol: 'Zinho'
    },
    {
        id: 28,
        name: 'CSA',
        colors: ['#0000FF', '#FFFFFF'],
        state: 'AL',
        city: 'Maceió',
        stadium: 'Rei Pelé',
        foundationYear: 1913,
        idol: 'Mazinho'
    },
    {
        id: 29,
        name: 'Sampaio Corrêa',
        colors: ['#FFFF00', '#008000'],
        state: 'MA',
        city: 'São Luís',
        stadium: 'Castelão',
        foundationYear: 1923,
        idol: 'Jorge Pinheiro'
    },
    {
        id: 30,
        name: 'América Mineiro',
        colors: ['#008000', '#FFFFFF'],
        state: 'MG',
        city: 'Belo Horizonte',
        stadium: 'Independência',
        foundationYear: 1912,
        idol: 'Toninho Cerezo'
    },
    {
        id: 31,
        name: 'Figueirense',
        colors: ['#000000', '#FFFFFF'],
        state: 'SC',
        city: 'Florianópolis',
        stadium: 'Orlando Scarpelli',
        foundationYear: 1921,
        idol: 'Marquinhos'
    },
    {
        id: 32,
        name: 'Brasil de Pelotas',
        colors: ['#FFFF00', '#000000'],
        state: 'RS',
        city: 'Pelotas',
        stadium: 'Bento Freitas',
        foundationYear: 1911,
        idol: 'Itamar'
    },
    {
        "id": 33,
        "name": "Chapecoense",
        "colors": ["#1B552A", "#FFFFFF"],
        "state": "SC",
        "city": "Chapecó",
        "stadium": "Arena Condá",
        "foundationYear": 1973,
        "idol": "Cleber Santana"
    },
    {
        "id": 34,
        "name": "Avaí",
        "colors": ["#006EB6", "#FFFFFF"],
        "state": "SC",
        "city": "Florianópolis",
        "stadium": "Ressacada",
        "foundationYear": 1923,
        "idol": "Milton Cruz"
    },
    {
        "id": 35,
        "name": "Guarani",
        "colors": ["#006C51", "#FFFFFF"],
        "state": "SP",
        "city": "Campinas",
        "stadium": "Brinco de Ouro",
        "foundationYear": 1911,
        "idol": "Careca"
    },
    {
        "id": 36,
        "name": "Ponte Preta",
        "colors": ["#000000", "#FFFFFF"],
        "state": "SP",
        "city": "Campinas",
        "stadium": "Moisés Lucarelli",
        "foundationYear": 1900,
        "idol": "Dicá"
    },
    {
        "id": 37,
        "name": "CRAC",
        "colors": ["#FFFF00", "#0000FF"],
        "state": "GO",
        "city": "Catalão",
        "stadium": "Genervino da Fonseca",
        "foundationYear": 1954,
        "idol": "Tulio"
    },
    {
        "id": 38,
        "name": "Londrina",
        "colors": ["#0000FF", "#FFFFFF"],
        "state": "PR",
        "city": "Londrina",
        "stadium": "Estádio do Café",
        "foundationYear": 1956,
        "idol": "Paulinho"
    },
    {
        "id": 39,
        "name": "Náutico",
        "colors": ["#ED1C24", "#FFFFFF"],
        "state": "PE",
        "city": "Recife",
        "stadium": "Aflitos",
        "foundationYear": 1901,
        "idol": "Kuki"
    },
    {
        "id": 40,
        "name": "ABC",
        "colors": ["#000000", "#FFFFFF"],
        "state": "RN",
        "city": "Natal",
        "stadium": "Frasqueirão",
        "foundationYear": 1915,
        "idol": "Marinho Chagas"
    },
    {
        "id": 41,
        "name": "Luverdense",
        "colors": ["#008000", "#FFFFFF"],
        "state": "MT",
        "city": "Lucas do Rio Verde",
        "stadium": "Passo das Emas",
        "foundationYear": 2004,
        "idol": "Maurílio"
    },
    {
        "id": 42,
        "name": "Juventude",
        "colors": ["#008000", "#FFFFFF"],
        "state": "RS",
        "city": "Caxias do Sul",
        "stadium": "Alfredo Jaconi",
        "foundationYear": 1913,
        "idol": "Valdomiro"
    },
    {
        id: 43,
        name: 'Red Bull Bragantino',
        colors: ['#EF1B33', '#FFFFFF'],
        state: 'SP',
        city: 'Bragança Paulista',
        stadium: 'Nabi Abi Chedid',
        foundationYear: 1928,
        idol: 'Mauro Silva'
    },
    {
        "id": 44,
        "name": "Operário Ferroviário",
        "colors": ["#000000", "#FFFFFF"],
        "state": "PR",
        "city": "Ponta Grossa",
        "stadium": "Germano Krüger",
        "foundationYear": 1912,
        "idol": "Fernandes"
    },
    {
        "id": 45,
        "name": "Brusque",
        "colors": ["#FF0000", "#FFFFFF"],
        "state": "SC",
        "city": "Brusque",
        "stadium": "Augusto Bauer",
        "foundationYear": 1987,
        "idol": "Careca"
    },
    {
        "id": 46,
        "name": "Tombense",
        "colors": ["#008000", "#FFFFFF"],
        "state": "MG",
        "city": "Tombos",
        "stadium": "Almeidão",
        "foundationYear": 1914,
        "idol": "Edmar"
    },
    {
        "id": 47,
        "name": "Mirassol",
        "colors": ["#FFFF00", "#000000"],
        "state": "SP",
        "city": "Mirassol",
        "stadium": "José Maria de Campos Maia",
        "foundationYear": 1925,
        "idol": "Fábio"
    },
    {
        "id": 48,
        "name": "Volta Redonda",
        "colors": ["#FFFF00", "#000000"],
        "state": "RJ",
        "city": "Volta Redonda",
        "stadium": "Raulino de Oliveira",
        "foundationYear": 1976,
        "idol": "Ademir"
    },
    {
        "id": 49,
        "name": "Criciúma",
        "colors": ["#FFFF00", "#000000"],
        "state": "SC",
        "city": "Criciúma",
        "stadium": "Heriberto Hulse",
        "foundationYear": 1947,
        "idol": "Zé Carlos"
    },
    {
        "id": 50,
        "name": "Marília",
        "colors": ["#006C51", "#FFFFFF"], // As cores oficiais do Marília são verde e branco[^1^][2].
        "state": "SP",
        "city": "Marília",
        "stadium": "Bento de Abreu",
        "foundationYear": 1942,
        "idol": "Birigui"
    }
];
