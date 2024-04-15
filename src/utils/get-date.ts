export function getCurrentDateFormatted() {
    const currentDate = new Date();
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const day = String(currentDate.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const dayOfWeekNumber = currentDate.getDay();

    return `${daysOfWeek[dayOfWeekNumber]} - ${day}/${month}/${year}`;
}