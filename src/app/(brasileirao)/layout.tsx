import type { Metadata } from "next";
import { MainTitle } from "@/components/main-title";

export const metadata: Metadata = {
    title: "CLUBLE | Brasileirão 2025",
    description: "Cluble: Um jogo de palpites diários sobre clubes de futebol",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <MainTitle />
            {children}
        </>
    );
}