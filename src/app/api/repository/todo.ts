import { supabase } from '@api/infra/db/supabase'
import { HttpNotFoundError } from '@api/infra/errors'

import { Todo, TodoSchema } from '@api/schema/todo'

interface TodoRepositoryGetParams {
  page?: number
  limit?: number
}

// interface Todo {
//   id: string
//   content: string
//   date: string
//   done: boolean
// }
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

  const currentPage = page || 1
  const currentLimit = limit || 5

  const startIndex = (currentPage - 1) * currentLimit
  const endIndex = currentPage * currentLimit - 1

  const { data, error, count } = await supabase()
    .from('todos')
    .select('*', {
      count: 'exact',
    })
    .order('date', { ascending: false })
    .range(startIndex, endIndex)
  if (error) throw new Error('failed to fetch data from supabase')
  console.log('data', data)

  const parsedData = TodoSchema.array().safeParse(data)
  if (!parsedData.success) {
    throw parsedData.error
  }

  const todos = parsedData.data
  const total = count || todos.length

  const totalPages = Math.ceil(total / currentLimit)
  return {
    todos,
    total,
    pages: totalPages,
  }

  //   const ALL_TODOS = read().reverse()

  //   const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex)

  //   return {
  //     todos: paginatedTodos,
  //     total: ALL_TODOS.length,
  //     pages: totalPages,
  //   }
}

async function CreatedByContent(content: string): Promise<Todo> {
  const { data, error } = await supabase()
    .from('todos')
    .insert([
      {
        content,
      },
    ])
    .select()
    .single()
  //   const newTodo = create(content)
  if (error) {
    throw new Error('failed to create TODO')
  }

  const parsedData = TodoSchema.parse(data)

  return parsedData
}

async function getTodoById(id: string): Promise<Todo> {
  const { data, error } = await supabase()
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error('Failed to get todo by id')

  const parsedData = TodoSchema.safeParse(data)
  if (!parsedData.success) throw new Error('Failed to parse TODO created')

  return parsedData.data
}

async function toggleDone(id: string): Promise<Todo> {
  const todo = await getTodoById(id)
  const { data, error } = await supabase()
    .from('todos')
    .update({
      done: !todo.done,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error('Failed to get todo by id')

  const parsedData = TodoSchema.safeParse(data)
  if (!parsedData.success) {
    throw new Error('Failed to return updated todo')
  }

  return parsedData.data
}

async function deleteById(id: string) {
  const { error } = await supabase().from('todos').delete().match({
    id,
  })

  if (error) {
    throw new HttpNotFoundError(`TODO with ID ${id} not found.`)
  }
}

export const todoRepository = {
  get,
  CreatedByContent,
  toggleDone,
  deleteById,
}
