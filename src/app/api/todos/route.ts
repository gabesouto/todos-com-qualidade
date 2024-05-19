import { todoRepository } from '@api/repository/todo'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams

  const page = Number(query.get('page'))
  const limit = Number(query.get('limit'))
  console.log(page, limit)

  const output = todoRepository.get({
    page,
    limit,
  })
  return NextResponse.json(
    { todos: output.todos, pages: output.pages, total: output.total },
    { status: 200 },
  )
}
