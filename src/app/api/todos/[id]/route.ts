import { HttpNotFoundError } from '@api/infra/errors'
import { todoRepository } from '@api/repository/todo'
import { NextResponse, NextRequest } from 'next/server'
import { z as schema } from 'zod'

export async function DELETE(
  req: NextRequest,

  { params }: { params: { id: string } },
) {
  const QuerySchema = schema.object({
    id: schema.string().uuid().min(1),
  })
  const parsedQuery = QuerySchema.safeParse(params)
  if (!parsedQuery.success) {
    return NextResponse.json(
      { error: 'You must provide a valid ID' },
      { status: 400 },
    )
  }
  try {
    const deletedTodo = await todoRepository.deleteById(parsedQuery.data.id)
    return NextResponse.json({ todo: deletedTodo }, { status: 204 })
  } catch (err) {
    if (err instanceof HttpNotFoundError) {
      return NextResponse.json(
        { error: { message: err.message } },
        { status: err.status },
      )
    }
  }

  return NextResponse.json(
    { error: { message: 'Internal Server Erro' } },
    { status: 500 },
  )
}
