// interface Todo {
//   id: string
//   content: string
//   date: Date
//   done: boolean
// }

import { Todo, TodoSchema } from '@ui/schema/todo'
import { z as schema } from 'zod'

interface TodoRepositoryGetParams {
  page?: number
  limit?: number
}

interface TodoRepositoryGetOutput {
  todos: Todo[]
  total: number
  pages: number
}
async function fetchTodos({ page, limit }: TodoRepositoryGetParams) {
  try {
    const response = await fetch(`/api/todos?page=${page}&limit=${limit}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const todosFromServer = await response.json()

    return todosFromServer
  } catch (error) {
    console.error('Failed to fetch todos:', error)
    return []
  }
}

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  const response = await fetchTodos({ page, limit })

  return {
    todos: response.todos,
    total: response.total,
    pages: response.pages,
  }
}

async function createByContent(content: string): Promise<Todo> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (response.ok) {
    const ServerResponseSchema = schema.object({
      todo: TodoSchema,
    })
    const serverResponse = await response.json()
    const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse)
    if (!serverResponseParsed.success) {
      throw new Error('failed to create TODO')
    }
    console.log(serverResponseParsed)
    const todo = serverResponseParsed.data.todo
    return todo
  }

  throw new Error('failed to create todo')
}

export const todoRepository = {
  get,
  createByContent,
}
