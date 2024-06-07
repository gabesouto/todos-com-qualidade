import { HttpNotFoundError } from '@api/infra/errors'
import { create, read, update, deleteById as dbDeleteById } from '@core/crud'

// ========
// TODO separar em outro arquivo
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SECRET_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)
// =====

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

async function get({
  page,
  limit,
}: TodoRepositoryGetParams = {}): Promise<TodoRepositoryGetOutput> {
  console.log(page, limit)

  const { data, error, count } = await supabase.from('todos').select('*', {
    count: 'exact',
  })
  if (error) throw new Error('failed to fetch data from supabase')
  console.log('data', data)

  //   const currentPage = page || 1
  //   const currentLimit = limit || 10

  //   const ALL_TODOS = read().reverse()

  //   const startIndex = (currentPage - 1) * currentLimit
  //   const endIndex = currentPage * currentLimit
  //   const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex)
  //   const totalPages = Math.ceil(ALL_TODOS.length / currentLimit)

  //   return {
  //     todos: paginatedTodos,
  //     total: ALL_TODOS.length,
  //     pages: totalPages,
  //   }

  const todos = data as Todo[]
  const total = count || todos.length
  return {
    todos,
    total,
    pages: 1,
  }
}

async function CreatedByContent(content: string): Promise<Todo> {
  const newTodo = create(content)

  return newTodo
}

async function toggleDone(id: string): Promise<Todo> {
  const ALL_TODOS = read()
  const todo = ALL_TODOS.find((todo) => todo.id === id)

  if (!todo) {
    throw new HttpNotFoundError(`TODO with id ${id} not found`)
  }

  const currentTudoStatus = todo.done

  const updatedTodo = update(todo.id, {
    done: !currentTudoStatus,
  })

  return updatedTodo
}

async function deleteById(id: string) {
  const ALL_TODOS = read()
  const todo = ALL_TODOS.find((todo) => todo.id === id)

  if (!todo) {
    throw new HttpNotFoundError(`TODO with id ${id} not found`)
  }
  dbDeleteById(id)
}

export const todoRepository = {
  get,
  CreatedByContent,
  toggleDone,
  deleteById,
}
