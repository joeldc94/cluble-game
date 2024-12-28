"use server"
import "server-only";
import { twitterBearer, twitterClient } from "./twitterClient";

export const postTweet = async (text?: string) => {
    //console.log(process.env.API_KEY)
    if(!text) text = "Buenas, Clublistas!"
    try {
        //const tweets = await twitterBearer.v2.userTimeline('1872770307850670080'); // Substitua por um ID de usuário válido
        //console.log({ tweets })
        //return tweets
        const response = await twitterClient.v2.tweet(text);
        console.log({ response })
        return response
    } catch (error) {
        console.error({ error })
        return {error}
    }
};