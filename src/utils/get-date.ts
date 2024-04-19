export function getCurrentDateFormatted() {
    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Nome completo do dia da semana
        day: '2-digit', // Dia do mês com dois dígitos
        month: '2-digit', // Mês com dois dígitos
        year: 'numeric', // Ano com quatro dígitos
        timeZone: 'America/Sao_Paulo' // Definindo o fuso horário do Brasil
    };

    const formattedDate = currentDate.toLocaleString('pt-BR', options); // Formata a data de acordo com o fuso horário e as opções definidas

    return formattedDate;
}

export function getCurrentDay() {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', // Dia do mês com dois dígitos
        month: '2-digit', // Mês com dois dígitos
        year: 'numeric', // Ano com quatro dígitos
        timeZone: 'America/Sao_Paulo' // Definindo o fuso horário do Brasil
    };
    const formattedDate = currentDate.toLocaleString('pt-BR', options); // Formata a data de acordo com o fuso horário e as opções definidas
    return formattedDate;
}