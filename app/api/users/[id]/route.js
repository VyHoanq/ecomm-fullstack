export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params
  try {
    const user = await db.user.findUnique({
      where: { id, role: "FARMER" }
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        error,
      },
      { status: 500 }
    );
  }

}