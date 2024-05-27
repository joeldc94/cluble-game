"use client"

import { Alert, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, IconButton, Snackbar, Tooltip, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

/* emojis
😎😃😉😁🙂🤪🤫🤐🤓🤯😌🙄😓
⚽🏆🏅🥇🥈🥉
⭕❌⛔🔴🟥❓✅🟢🟩
🌟⭐
1️⃣2️⃣3️⃣4️⃣5️⃣
*/

interface ShareCardProps {
    rightAnswer: boolean;
    tipsNeeded: number;
    gameEdition: number;
}

const getEmojiForTips = (tipsNeeded: number, rightAnswer: boolean) => {
    if (!rightAnswer) return "😓";
    switch (tipsNeeded) {
        case 1: return "😎";
        case 2: return "😁";
        case 3: return "😉";
        case 4: return "🙂";
        case 5: return "😌";
        default: return "😓";
    }
};

const generateIconsForAttempts = (tipsNeeded: number, rightAnswer: boolean) => {
    const icons = [];
    if (!rightAnswer) {
        icons.push("❌❌❌❌❌");
    }
    else
        for (let i = 0; i < 5; i++) {
            if (i < tipsNeeded - 1) {
                icons.push("🟥");
            } else if (i === tipsNeeded - 1 && rightAnswer) {
                icons.push("✅");
            } else {
                icons.push("🟩");
            }
        }
    return icons.join("");
};


export const ShareCard = ({ rightAnswer, tipsNeeded, gameEdition }: ShareCardProps) => {
    const [openAlert, setOpenAlert] = useState(false);

    /* rightAnswer = false
    tipsNeeded = 5 */
    const siteLink = "https://cluble-game.vercel.app";
    const shareText1 = `Veja o clube de hoje no CLUBLE! Edição #${gameEdition}!`;
    const shareText2 = rightAnswer ?
        `Eu acertei com ${tipsNeeded} ${tipsNeeded > 1 ? 'dicas' : 'dica'}!` :
        `Não consegui acertar... Você consegue?`;

    const shareIcons = generateIconsForAttempts(tipsNeeded, rightAnswer);

    const shareMessage = `${shareText1}\n\n${shareText2} ${getEmojiForTips(tipsNeeded, rightAnswer)}\n${shareIcons}\n\n${siteLink}`;

    //console.log(shareMessage)
    //const isMobileDevice = typeof navigator !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Função para gerar o link de compartilhamento no whatsapp
    const handleCompartilharWhatsApp = () => {
        //if (!isMobileDevice) return;
        const mensagemCodificada = encodeURIComponent(shareMessage);
        const linkWhatsApp = `whatsapp://send?text=${mensagemCodificada}`;
        //const siteLink = "https://cluble-game.vercel.app";
        const linkWithBreak = `${mensagemCodificada}%0A${siteLink}`;
        const linkWhatsAppWithBreak = `whatsapp://send?text=${linkWithBreak}`;
        window.location.href = linkWhatsApp;
    };

    //const shareRef = useRef<HTMLDivElement>(null); // Referência para o componente List

    // Função para copiar o texto para a área de transferência
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareMessage);
        setOpenAlert(true);
        /*
        if (shareRef.current) {
            const textToCopy = shareRef.current.innerText; // Obtém o texto dentro do componente List
            navigator.clipboard.writeText(shareMessage); // Copia o texto para a área de transferência
            alert("Texto copiado");
        }
        */
    };

    //console.log(shareText2)

    return (
        <>
            <Card>
                <CardHeader title="Compartilhe!" sx={{ textAlign: 'center' }} />
                <Divider />
                <CardContent /* ref={shareRef} */>
                    <Typography variant="subtitle1" textAlign='center' fontSize='1.8rem'>
                        {getEmojiForTips(tipsNeeded, rightAnswer)}
                    </Typography>
                    <Typography variant="subtitle1" textAlign='center'>
                        {shareText1}
                    </Typography>
                    <Typography variant="body1" textAlign='center'>
                        {shareText2}
                    </Typography>
                    <Typography variant="subtitle1" textAlign='center' fontSize='1.8rem'>
                        {shareIcons}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Tooltip
                        title="Copiar resultado"
                        placement="top"
                        enterDelay={500}
                        leaveDelay={50}
                    >
                        <IconButton onClick={copyToClipboard} >
                            <ShareIcon sx={{ color: '#333' }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip
                        title="Compartilhar no WhatsApp"
                        placement="top"
                        enterDelay={500}
                        leaveDelay={50}
                    >
                        <IconButton onClick={handleCompartilharWhatsApp} >
                            <WhatsAppIcon sx={{ color: '#1A9B50' }} />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openAlert}
                autoHideDuration={3000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert
                    severity="success"
                    variant="outlined"
                    icon={false}
                    sx={{ backgroundColor: 'white' }}                    
                >
                    Texto copiado
                </Alert>
            </Snackbar>
        </>
    )
}