// Função para remover acentos de uma string
export const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Função para filtrar os clubes com base no valor de entrada
export const filterClubs = (clubsNamesList: string[], inputValue: string) => {
    if (inputValue.length < 2) {
        return []; // Retorna uma lista vazia se o valor de entrada for menor que 2 caracteres
    }
    const inputValueWithoutAccents = removeAccents(inputValue.toLowerCase()); // Remover acentos e converter para minúsculas
    return clubsNamesList
        .filter(club => removeAccents(club.toLowerCase()).startsWith(inputValueWithoutAccents))
};