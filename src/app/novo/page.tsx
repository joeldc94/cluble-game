import { getClubsNamesList, getCurrentGameData } from "@/utils/get-club";
import NovoTipsComponent from "./comp/novo-client-component";


export default async function PageNovo() {
    const { game } = await getCurrentGameData();
    const clubsList = await getClubsNamesList();


    if (!game) {
        return (
            <>
                Jogo não disponível
            </>
        )
    }

    return (
        <>
            <p>{game.gameId}</p>

            <NovoTipsComponent game={game} clubsNamesList={clubsList} gameEdition={game.id} />
        </>
    )
}