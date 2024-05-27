import { todoRepository } from '@api/repository/todo'
import { NextResponse, NextRequest } from 'next/server'

export async function PUT(
  req: NextRequest,

  { params }: { params: { id: string } },
) {
  if (typeof params.id !== 'string' || !params.id) {
    return NextResponse.json(
      { error: { message: 'you must provide a string ID' } },
      { status: 400 },
    )
  }
  try {
    const todoUpdated = await todoRepository.toggleDone(params.id)
    return NextResponse.json({ todo: todoUpdated }, { status: 201 })
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: { message: err.message } },
        { status: 404 },
      )
    }
  }
}
