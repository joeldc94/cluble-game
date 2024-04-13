import { updateCurrentClub } from '@/utils/update-current-club';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await updateCurrentClub();
    revalidatePath('/');
    return NextResponse.json(result)
}