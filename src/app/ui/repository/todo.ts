interface Todo {
  id: string
  content: string
  date: Date
  done: boolean
}

interface TodoRepositoryGetParams {
  page: number
  limit: number
}

interface TodoRepositoryGetOutput {
  todos: Todo[]
  total: number
  pages: number
}

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  const response = await fetch('/api/todos')
  const todosFromServer = await response.json()

  console.log('page', page)
  console.log('limit', limit)
  const ALL_TODOS = todosFromServer
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex)
  const totalPages = Math.ceil(ALL_TODOS.length / limit)

  return {
    todos: paginatedTodos,
    total: ALL_TODOS.length,
    pages: totalPages,
  }
}

export const todoRepository = {
  get,
}
