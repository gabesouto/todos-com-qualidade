import { NextResponse } from "next/server";

export async function GET(res: NextResponse){
  return NextResponse.json({message: "ola mundo"})
}