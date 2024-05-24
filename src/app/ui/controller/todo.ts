import { todoRepository } from '@ui/repository/todo'
import { Todo } from '@ui/schema/todo'

interface TodoControllerGetParams {
  page?: number
  limit?: number
}

async function get({ page }: TodoControllerGetParams) {
  return todoRepository.get({
    page,
    limit: 3,
  })
}

function filterTodosByContent<Todo>(
  todos: Array<Todo & { content: string }>,
  search: string,
): Todo[] {
  const homeTodos = todos.filter((todo) => {
    const normalizedSearch = search.toLowerCase()
    const contentNormalized = todo.content.toLowerCase()
    return contentNormalized.includes(normalizedSearch)
  })

  return homeTodos
}

interface todoControllerCreateParams {
  content: string
  onError: () => void
  onSuccess: (todo: Todo) => void
}

function create({ content, onError, onSuccess }: todoControllerCreateParams) {
  // fail fast
  if (!content) {
    onError()
    return
  }

  const todo = {
    id: '12131',
    content,
    date: new Date().toISOString(),
    done: false,
  }

  onSuccess(todo)
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
}
