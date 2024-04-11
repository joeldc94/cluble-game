import { ClubData, clubs } from '@/data/clubs';

export function getRandomClub(): ClubData {
    const randomIndex = Math.floor(Math.random() * clubs.length);
    return clubs[randomIndex];
}