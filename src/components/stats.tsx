"use client"
import { getUserGamesHistory } from "@/utils/localStorage"
import { Card, Modal } from "@mui/material"
import { useEffect, useState } from "react"



export const Stats = () => {

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [consecutiveDays, setConsecutiveDays] = useState(0)
    const [totalAccuracy, setTotalAccuracy] = useState(0)
    const [accuracyByAnswers, setAccuracyByAnswers] = useState({
        incorrectGamesPercentage: 0,
        correctGamesPercentage: []
    })

    useEffect(() => {

        const userHistory = getUserGamesHistory()
        setConsecutiveDays(countConsecutiveDaysPlayed(userHistory));
        setTotalAccuracy(calculateAccuracyPercentage(userHistory));

        setAccuracyByAnswers(calculateAccuracyPercentageByAnswers(userHistory));

    }, [])

    useEffect(() => {
        setTotalAccuracy(Number(accuracyByAnswers.correctGamesPercentage.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1)))

        console.log({ history })
        console.log({ consecutiveDays })
        console.log({ totalAccuracy })
        console.log({ accuracyByAnswers })
    }, [accuracyByAnswers])

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Card>
                <p><strong>Dias seguidos: </strong>{consecutiveDays}</p>
                <p><strong>Acertos:</strong></p>
                {
                    accuracyByAnswers.correctGamesPercentage.map((accuracy, index) => {
                        return (
                            <p><strong>{index} dicas: </strong>{accuracy}%</p>
                        )
                    })
                }
                <p><strong>% Total de acertos: </strong>{totalAccuracy}%</p>
                <p><strong>% de erros: </strong>{accuracyByAnswers.incorrectGamesPercentage}%</p>
            </Card>
        </Modal>
    )
}



// Função para contar quantos dias seguidos a pessoa está jogando
const countConsecutiveDaysPlayed = (history: GameHistoryLocalStorage[]): number => {
    //const history = getUserGamesHistory();

    if (!history || history.length === 0) {
        return 0; // Se não houver histórico ou se estiver vazio, não houve dias jogados
    }

    // Ordena o histórico de partidas por data, do mais recente para o mais antigo
    history.sort((a, b) => {
        const dateA = parseBrazilianDate(a.date);
        const dateB = parseBrazilianDate(b.date);
        return dateB.getTime() - dateA.getTime();
    });

    let consecutiveDays = 1;

    // Percorre o histórico de partidas a partir do segundo elemento
    for (let i = 1; i < history.length; i++) {
        const currentDate = parseBrazilianDate(history[i].date);
        const prevDate = parseBrazilianDate(history[i - 1].date);

        // Calcula a diferença em milissegundos entre as datas
        const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
        // Calcula a diferença em dias
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Se a diferença for de um dia, incrementa o contador de dias seguidos
        if (diffDays === 1) {
            consecutiveDays++;
        } else {
            break; // Se a diferença for maior do que um dia, para a contagem
        }
    }

    return consecutiveDays;
};
// Função auxiliar para converter uma data no formato brasileiro para um objeto Date
const parseBrazilianDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/');
    // O mês é indexado em 0 no construtor Date, por isso subtraímos 1 do mês
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};


// Função para calcular a porcentagem de acertos
const calculateAccuracyPercentage = (history: GameHistoryLocalStorage[]): number => {

    if (!history || history.length === 0) {
        return 0; // Se não houver histórico ou se estiver vazio, a precisão é 0%
    }

    // Contador para armazenar a quantidade de jogos com respostas corretas
    let correctGamesCount = 0;

    // Percorre o histórico de partidas
    history.forEach((game) => {
        if (game.rightAnswer) {
            correctGamesCount++; // Incrementa o contador se a resposta estiver correta
        }
    });

    // Calcula a porcentagem de acertos
    const accuracyPercentage = (correctGamesCount / history.length) * 100;

    return Number(accuracyPercentage.toFixed(1));
};


// Função para calcular a porcentagem de acertos de acordo com a quantidade de respostas
const calculateAccuracyPercentageByAnswers = (history: GameHistoryLocalStorage[]): { incorrectGamesPercentage: number, correctGamesPercentage: number[] } => {

    if (!history || history.length === 0) {
        return {
            incorrectGamesPercentage: 0,
            correctGamesPercentage: [0, 0, 0, 0, 0, 0]
        }; // Retorna um objeto vazio se não houver histórico ou se estiver vazio
    }

    // Objeto para armazenar a porcentagem de acertos de acordo com a quantidade de respostas
    const accuracyPercentageByAnswers: { [key: number]: number } = {};

    // Contador para armazenar a quantidade de jogos com respostas corretas
    // de 0 até 5 respostas
    let correctGamesCount = [0, 0, 0, 0, 0, 0];

    // Contador para armazenar a quantidade de jogos com respostas incorretas
    let incorrectGamesCount = 0;

    // Percorre o histórico de partidas
    history.forEach((game) => {
        const tipsUsed = game.answers.length;
        if (game.rightAnswer) {
            correctGamesCount[tipsUsed]++; // Incrementa o contador se a resposta estiver correta
        } else {
            incorrectGamesCount++; // Incrementa o contador se a resposta estiver incorreta
        }
    });

    // Calcula a porcentagem de jogos não acertados
    const totalGamesCount = history.length;
    const incorrectGamesPercentage = Number((incorrectGamesCount / totalGamesCount) * 100).toFixed(1);

    const correctGamesPercentage: number[] = []
    correctGamesCount.forEach((count) => {
        correctGamesPercentage.push(Number((count / totalGamesCount * 100).toFixed(1)))
    });

    console.log({ correctGamesCount }, { correctGamesPercentage })

    return {
        incorrectGamesPercentage,
        correctGamesPercentage
    };
};

