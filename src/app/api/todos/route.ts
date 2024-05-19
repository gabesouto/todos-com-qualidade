import { todoRepository } from '@api/repository/todo'
import { NextResponse } from 'next/server'

export async function GET() {
  const output = todoRepository.get()
  return NextResponse.json(output.todos, { status: 200 })
}
