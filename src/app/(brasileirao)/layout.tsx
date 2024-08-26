import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Container, CssBaseline } from "@mui/material";
import { MainTitle } from "@/components/main-title";

export const metadata: Metadata = {
    title: "CLUBLE | Brasileirão 2024",
    description: "Cluble: Um jogo de palpites diários sobre clubes de futebol",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MainTitle/>
            {children}
        </>
    );
}