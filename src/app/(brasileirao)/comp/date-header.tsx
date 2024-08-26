import { ShowStats } from "@/components/show-stats"
import { getCurrentDateFormatted } from "@/utils/get-date"
import { Divider, Grid, Typography } from "@mui/material"

type DateHeaderProps = {
    gameEdition: number;
}
export const DateHeader = ({ gameEdition }: DateHeaderProps) => {
    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={1} pl={0}>
                <Typography variant="subtitle1" textAlign="left">
                    #{String(gameEdition).padStart(3, '0')}
                </Typography>
            </Grid>
            <Grid item xs>
                <Typography variant="subtitle1" textAlign="center">
                    {getCurrentDateFormatted()}
                </Typography>
            </Grid>
            <Grid item xs={1} textAlign="center">
                <ShowStats />
            </Grid>
        </Grid>
    )
}