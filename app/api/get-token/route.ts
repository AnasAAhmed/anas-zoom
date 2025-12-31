import { auth } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { NextRequest, NextResponse } from "next/server";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url') || '';
    try {
        const user = await auth();

        if (!user) throw new Error('User is not authenticated');
        if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
        if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

        const streamServerClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
        if (!user.userId) {
            return NextResponse.json("Unauthorized", {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60
        const issueAt = Math.floor(Date.now() / 1000) - 60
        const token = streamServerClient.createToken(
            user.userId,
            expirationTime,
            issueAt
        )
        return NextResponse.json({ token }, {
            status: 200,
        });
    } catch (error) {
        console.log((error as Error).message);

        return NextResponse.json({ error: "Failed to fetch stream token " + (error as Error).message }, { status: 500 });
    }
}
