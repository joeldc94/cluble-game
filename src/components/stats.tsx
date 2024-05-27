"use client"
import { getUserGamesHistory } from "@/utils/localStorage"
import { Card, CardActions, CardContent, CardHeader, IconButton, Modal, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { getCurrentDay } from "@/utils/get-date";


interface StatsProps {
    open: boolean;
    handleClose: () => void;
}
export const Stats = ({ open, handleClose }: StatsProps) => {
    const [totalGames, setTotalGames] = useState(0)
    const [consecutiveDays, setConsecutiveDays] = useState(0)
    const [totalAccuracy, setTotalAccuracy] = useState(0)
    const [accuracyByAnswers, setAccuracyByAnswers] = useState<{ incorrectGamesPercentage: number; correctGamesPercentage: number[] }>({
        incorrectGamesPercentage: 0,
        correctGamesPercentage: [0, 0, 0, 0, 0, 0] // Inicialize com o número correto de elementos
    });


    useEffect(() => {

        const userHistory = getUserGamesHistory()
        setTotalGames(userHistory.length)
        setConsecutiveDays(/*countConsecutiveDaysPlayed*/ countConsecutiveDaysWithCorrectAnswers(userHistory));
        setTotalAccuracy(calculateAccuracyPercentage(userHistory));

        setAccuracyByAnswers(calculateAccuracyPercentageByAnswers(userHistory));

    }, [open])

    useEffect(() => {
        setTotalAccuracy(Number(accuracyByAnswers.correctGamesPercentage.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1)))

        //console.log({ history })
        //console.log({ consecutiveDays })
        //console.log({ totalAccuracy })
        //console.log({ accuracyByAnswers })
    }, [accuracyByAnswers])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="confirmation-modal"
            aria-describedby="confirmation-modal-description"
        >
            <Card
                sx={{ position: 'absolute', top: '50%', left: '50%', minWidth: 250, transform: 'translate(-50%, -50%)' }}
            >
                <CardHeader title="Estatísticas" />
                <CardContent>
                    <Typography variant="body2"><strong>Seus jogos: </strong>{totalGames}</Typography>
                    <Typography variant="body2"><strong>Acertos seguidos: </strong>{consecutiveDays}</Typography>
                    <Typography variant="body2"><strong>Acertos:</strong></Typography>
                    {
                        accuracyByAnswers.correctGamesPercentage.map((accuracy, index) => {
                            return (
                                <Typography key={index} variant="body2" sx={{ ml: 1 }}><strong>{index} dicas: </strong>{accuracy}%</Typography>
                            )
                        })
                    }
                    <Typography variant="body2"><strong>% de acertos: </strong>{totalAccuracy}%</Typography>
                    <Typography variant="body2"><strong>% de erros: </strong>{accuracyByAnswers.incorrectGamesPercentage}%</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </CardActions>
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
    const incorrectGamesPercentage = parseFloat((incorrectGamesCount / totalGamesCount * 100).toFixed(1));

    const correctGamesPercentage: number[] = []
    correctGamesCount.forEach((count) => {
        correctGamesPercentage.push(Number((count / totalGamesCount * 100).toFixed(1)))
    });

    //console.log({ correctGamesCount }, { correctGamesPercentage })

    return {
        incorrectGamesPercentage,
        correctGamesPercentage
    };
};



const _countConsecutiveDaysWithCorrectAnswers = (history: GameHistoryLocalStorage[]): number => {
    if (!history || history.length === 0) {
        return 0; // Se não houver histórico ou se estiver vazio, não houve dias jogados
    }

    let consecutiveDays = 0;

    // Verifica se a última resposta é correta
    if (history[history.length - 1].rightAnswer) {
        consecutiveDays++;
    } else if (history[history.length - 1].answers.length >= 5) {
        // Se a última resposta for incorreta e o número de respostas for menor que 5, ignore este dia
        return 0;
    }

    // Percorre o histórico de partidas da penúltima até a primeira
    for (let i = history.length - 2; i >= 0; i--) {
        // Verifica se a resposta do dia é correta
        if (!history[i].rightAnswer) {
            // Se a resposta não for correta, retorna o contador acumulado
            return consecutiveDays;
        }
        // Se a resposta for correta, incrementa o contador
        consecutiveDays++;
    }

    return consecutiveDays;
};


/** Função para contar quantos dias seguidos com resposta correta a pessoa está jogando
  Se um dia foi pulado o contador para 
*/
const countConsecutiveDaysWithCorrectAnswers = (history: GameHistoryLocalStorage[]): number => {
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

    //console.log({ history })

    let consecutiveDays = 0;
    const currentDay = getCurrentDay(); // Obtém a data atual no formato brasileiro

    // Verifica se a última resposta e do dia atual
    if (history[0].date === currentDay) {
        if (history[0].rightAnswer) { //se for correta incrementa o contador
            consecutiveDays++;
        }
        else {
            if (history[0].answers.length >= 5) { //se já tiver 5 respostas e não for correta, retorna resposta errada para o dia = 0
                return 0;
            }
            else {
                const currentDate = parseBrazilianDate(currentDay);
                const prevDate = parseBrazilianDate(history[1].date);

                // Calcula a diferença em milissegundos entre as datas
                const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
                // Calcula a diferença em dias
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // Se a diferença for maior do que 1 dia, teve dia perdido. retorna 0
                if (diffDays > 1) {
                    return 0
                }
            }
        }
    }

    // Percorre o histórico de partidas a partir do segundo elemento
    for (let i = 1; i < history.length; i++) {
        const currentDate = parseBrazilianDate(history[i].date);
        const prevDate = parseBrazilianDate(history[i - 1].date);

        // Calcula a diferença em milissegundos entre as datas
        const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
        // Calcula a diferença em dias
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //console.log({ currentDate }, { prevDate }, { diffDays })
        // Se a diferença for de um dia, incrementa o contador de dias seguidos
        if (diffDays === 1 && history[i].rightAnswer) {
            consecutiveDays++;
        } else {
            break; // Se a diferença for maior do que um dia, para a contagem
        }
    }

    return consecutiveDays;
};