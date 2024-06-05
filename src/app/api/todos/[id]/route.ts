import { HttpNotFoundError } from '@api/infra/errors'
import { todoRepository } from '@api/repository/todo'
import { NextResponse, NextRequest } from 'next/server'
import { z as schema } from 'zod'

// Defina o schema usando zod
const QuerySchema = schema.object({
  id: schema.string().uuid(),
})

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // Valide os parâmetros
  const parsedQuery = QuerySchema.safeParse(params)
  if (!parsedQuery.success) {
    return NextResponse.json(
      { error: 'You must provide a valid ID' },
      { status: 400 },
    )
  }

  try {
    // Tente deletar pelo ID
    await todoRepository.deleteById(parsedQuery.data.id)
    console.log('bateu')

    return new Response(null, {
      status: 204,
    })
  } catch (err) {
    if (err instanceof HttpNotFoundError) {
      return NextResponse.json(
        { error: { message: err.message } },
        { status: err.status },
      )
    }
  }

  // Retorne um erro interno do servidor se ocorrer uma exceção não esperada
  return NextResponse.json(
    { error: { message: 'Internal Server Error' } },
    { status: 500 },
  )
}
