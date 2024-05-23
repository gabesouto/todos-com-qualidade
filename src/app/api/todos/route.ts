import { todoRepository } from '@api/repository/todo'
import { NextResponse, NextRequest } from 'next/server'
import { z as schema } from 'zod'

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

const TodoCreateBodySchema = schema.object({
  content: schema.string(),
})
export async function POST(req: NextRequest) {
  try {
    const body = TodoCreateBodySchema.safeParse(await req.json())

    if (!body.success) {
      return NextResponse.json(
        { error: { message: body.error.errors } },
        { status: 400 },
      )
    }
    const createdTodo = await todoRepository.CreatedByContent(body.data.content)

    return NextResponse.json({ todo: createdTodo })
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: 'Something went wrong! Check the data and data format',
        },
      },
      { status: 500 },
    )
  }
}
