import { getGameInfos } from "@/utils/sql-games"
import { Box, Divider, Skeleton, Typography } from "@mui/material"
import { Suspense } from "react";

interface LeagueTitleProps {
    leagueId: number
}
const LeagueTitleContent = async (props: LeagueTitleProps) => {
    const gameInfos = await getGameInfos(props.leagueId);
    //const gameInfos = undefined;
    return (
        <Box mt={3} mb={2} sx={{
            display: 'flex',          // Define um layout flexível
            flexDirection: 'column',     // Alinha os itens em linha (horizontalmente)
            justifyContent: 'center',  // Centraliza os itens horizontalmente
            alignItems: 'center',      // Alinha os itens verticalmente no centro
        }}>
            <Typography variant="h2" fontSize="1.4rem" fontWeight="600" textAlign="center" >
                {(!gameInfos || !gameInfos.name) ? <Skeleton width='75%' /> : gameInfos.name}
            </Typography>
            <Typography variant="h3" fontSize="1.0rem" fontWeight="500" textAlign="center">
                {(!gameInfos) ? <Skeleton width='50%' /> : gameInfos.description}
            </Typography>
        </Box>
    )
}

const LeagueTileSkeleton = () => {
    return (
        <Box mt={3} mb={2} sx={{
            display: 'flex',          // Define um layout flexível
            flexDirection: 'column',     // Alinha os itens em linha (horizontalmente)
            justifyContent: 'center',  // Centraliza os itens horizontalmente
            alignItems: 'center',      // Alinha os itens verticalmente no centro
        }}>
            <Skeleton variant="text" width="75%" sx={{ fontSize: '1.4rem' }} />
            <Skeleton variant="text" width="50%" sx={{ fontSize: '1.0rem' }} />
        </Box>
    )
}

export const LeagueTitle = (props: LeagueTitleProps) => {
    return (
        <LeagueTitleContent {...props} />
    )
}
//⭐