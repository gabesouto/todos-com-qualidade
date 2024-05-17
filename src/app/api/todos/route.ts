import { NextResponse } from 'next/server'
// import db from '@server/db.json'
import { read } from '@core/crud'

export async function GET() {
  const todos = read()
  return NextResponse.json(todos, { status: 200 })
}
