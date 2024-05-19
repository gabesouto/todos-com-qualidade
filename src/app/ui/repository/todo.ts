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
async function fetchTodos() {
  try {
    const response = await fetch('/api/todos')

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
  const todosFromServer = await fetchTodos()

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
