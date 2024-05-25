import { create, read } from '@core/crud'
interface TodoRepositoryGetParams {
  page?: number
  limit?: number
}

interface Todo {
  id: string
  content: string
  date: string
  done: boolean
}
interface TodoRepositoryGetOutput {
  todos: Todo[]
  total: number
  pages: number
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutput {
  const currentPage = page || 1
  const currentLimit = limit || 10

  const ALL_TODOS = read().reverse()

  const startIndex = (currentPage - 1) * currentLimit
  const endIndex = currentPage * currentLimit
  const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex)
  const totalPages = Math.ceil(ALL_TODOS.length / currentLimit)

  return {
    todos: paginatedTodos,
    total: ALL_TODOS.length,
    pages: totalPages,
  }
}

async function CreatedByContent(content: string): Promise<Todo> {
  const newTodo = create(content)

  return newTodo
}

export const todoRepository = {
  get,
  CreatedByContent,
}
