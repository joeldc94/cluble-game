const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
    bearer: process.env.TWITTER_BEARER_TOKEN
    
});

const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
/** To write to the platform */
const twitterClient = client.readWrite;
/** To Read Tweets */
const twitterBearer = bearer.readOnly;

export { twitterClient, twitterBearer };