import { todoRepository } from '@ui/repository/todo'

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

export const todoController = {
  get,
  filterTodosByContent,
}
