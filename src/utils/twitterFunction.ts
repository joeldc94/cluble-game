"use server"
import "server-only";
import { twitterBearer, twitterClient } from "./twitterClient";

export const postTweet = async ({ text, mediaId }: { text?: string, mediaId?: string }) => {
    //console.log(process.env.API_KEY)
    if (!text) throw new Error("Uma mensagem precisa ser passada");
    try {
        //const tweets = await twitterBearer.v2.userTimeline('1872770307850670080'); // Substitua por um ID de usuário válido
        //console.log({ tweets })
        //return tweets
        let response;
        if (!!mediaId) {
            response = await twitterClient.v2.tweet({
                text,
                media: { media_ids: [mediaId] }
            });
        }
        else {
            response = await twitterClient.v2.tweet({ text });
        }
        //console.log({ response })
        return response
    } catch (error) {
        console.error({ error })
        return { error }
    }
};

export const uploadMedia = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao baixar a imagem');

        // Converte a resposta em um buffer
        const buffer = await response.arrayBuffer();

        // Faz o upload da mídia para o Twitter
        const mediaId = await twitterClient.v1.uploadMedia(Buffer.from(buffer), { type: 'png' }); // Altere 'png' conforme necessário
        return mediaId;
    } catch (error) {
        console.error({ error })
        return null
    }
};