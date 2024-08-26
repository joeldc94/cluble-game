import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Container, CssBaseline } from "@mui/material";

export const metadata: Metadata = {
    title: "CLUBLE",
    description: "Um jogo de palpites diários sobre clubes de futebol",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body>
                <Analytics />
                <SpeedInsights />
                <CssBaseline />
                <AppRouterCacheProvider>
                    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
                        {children}
                    </Container>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}