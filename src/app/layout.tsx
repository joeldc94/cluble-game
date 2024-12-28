import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Container, CssBaseline } from "@mui/material";

export const metadata: Metadata = {
    title: "CLUBLE",
    description: "Um jogo de palpites diários sobre clubes de futebol",
    keywords: "palpite, clube, futebol, brasileirão, cluble, serie A, serie B, serie C, serie D",
    authors: [{ name: "Joel De Conto" }],
    openGraph: { 
        title: "CLUBLE", 
        description: "Um jogo de palpites diários sobre clubes de futebol",
        url: "https://cluble.today",
        siteName: "CLUBLE",
        images: [
            {
                url: "/logo/logo1.png",
                width: 800,
                height: 400,
                alt: "CLUBLE",
            },
        ],
        locale: "pt-BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CLUBLE",
        description: "Um jogo de palpites diários sobre clubes de futebol",
        images: [
            {
                url: "/logo/logo1.png",
                width: 800,
                height: 400,
                alt: "CLUBLE",
            },
        ],
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <head>
                <link rel="manifest" href="/manifest.json" />
            </head>
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