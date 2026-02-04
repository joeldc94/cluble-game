"use client"

import { Alert, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Paper, Snackbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'next-share';

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
    } else {
        for (let i = 0; i < 5; i++) {
            if (i < tipsNeeded - 1) {
                icons.push("🟥");
            } else if (i === tipsNeeded - 1 && rightAnswer) {
                icons.push("✅");
            } else {
                icons.push("🟩");
            }
        }
    }
    return icons.join("");
};

export const ShareCard = ({ rightAnswer, tipsNeeded, gameEdition }: ShareCardProps) => {
    const [openAlert, setOpenAlert] = useState(false);

    const siteLink = "https://cluble.today";
    const shareText1 = `Veja o clube de hoje no CLUBLE! Edição #${gameEdition}!`;
    const shareText2 = rightAnswer ?
        `Eu acertei com ${tipsNeeded} ${tipsNeeded > 1 ? 'dicas' : 'dica'}!` :
        `Não consegui acertar... Você consegue?`;

    const shareIcons = generateIconsForAttempts(tipsNeeded, rightAnswer);

    const shareMessage = `${shareText1}\n\n${shareText2} ${getEmojiForTips(tipsNeeded, rightAnswer)}\n${shareIcons}\n\n`;

    // Função para copiar o texto para a área de transferência
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareMessage + siteLink);
        setOpenAlert(true);
    };

    return (
        <>
            <Card component={Paper} elevation={2}>
                <CardHeader title="Compartilhe!" sx={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
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
                    <Tooltip title="Copiar resultado" placement="top">
                        <IconButton onClick={copyToClipboard}>
                            <ContentCopyIcon sx={{ color: '#333' }} />
                        </IconButton>
                    </Tooltip>

                    {/* Botão de Compartilhamento no WhatsApp */}
                    <WhatsappShareButton
                        url={siteLink}
                        title={shareMessage}
                                              
                        blankTarget
                    >
                        <Tooltip title="Compartilhar no WhatsApp" placement="top">
                            <IconButton>
                                <WhatsappIcon size={32} round />
                            </IconButton>
                        </Tooltip>
                    </WhatsappShareButton>

                    {/* Botão de Compartilhamento no X */}
                    <TwitterShareButton
                        url={siteLink}
                        title={"@ClubleToday\n" + shareMessage}
                        hashtags={["Cluble", "clubletoday", "Brasileirão2025"]}
                        related={["@ClubleToday"]}                        
                        blankTarget
                    >
                        <Tooltip title="Compartilhar no X" placement="top">
                            <IconButton>
                                <TwitterIcon size={32} round />
                            </IconButton>
                        </Tooltip>
                    </TwitterShareButton>             

                </CardActions>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openAlert}
                autoHideDuration={3000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert severity="success" variant="outlined" icon={false} sx={{ backgroundColor: 'white' }}>
                    Texto copiado
                </Alert>
            </Snackbar>
        </>
    )
}