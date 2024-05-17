async function get() {
  const response = await fetch('/api/todos')
  const todos = await response.json()
  console.log(todos)
  return todos
}

export const todoController = {
  get,
}
