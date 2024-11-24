import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { title, slug, description, logoUrl } = await req.json()
        const newMarket = { title, slug, description, logoUrl }
        console.log(newMarket)
        return NextResponse.json(newMarket)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to create market", error }, { status: 500 })

    }
}