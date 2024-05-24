// interface Todo {
//   id: string
//   content: string
//   date: Date
//   done: boolean
// }

import { Todo } from '@ui/schema/todo'

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

export const todoRepository = {
  get,
}
