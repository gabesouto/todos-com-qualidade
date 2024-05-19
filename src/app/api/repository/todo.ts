import { read } from '@core/crud'

function get() {
  const ALL_TODOS = read()
  return { todos: ALL_TODOS }
}

export const todoRepository = {
  get,
}
