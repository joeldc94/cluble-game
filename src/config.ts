import path from "path";

export const CURRENT_CLUB_FILE_PATH = process.env.VERCEL_ENV ? 'tmp/currentClub.json' : path.join(process.cwd(), 'tmp/currentClub.json');
