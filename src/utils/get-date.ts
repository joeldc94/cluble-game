export function getCurrentDateFormatted() {
    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Nome completo do dia da semana
        day: '2-digit', // Dia do mês com dois dígitos
        month: '2-digit', // Mês com dois dígitos
        year: 'numeric', // Ano com quatro dígitos
    };

    const formattedDate = currentDate.toLocaleString('pt-BR', options); // Formata a data de acordo com o fuso horário e as opções definidas

    return formattedDate;
}