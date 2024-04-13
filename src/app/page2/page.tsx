import { getLastClubId } from "@/utils/kv-club"

export default async function Page2() {
    const id = await getLastClubId();
    return(
        <>
        <h1>Last ID:</h1>{id}
        </>
    )
}