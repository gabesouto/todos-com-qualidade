'use client'
import React, { useEffect, useRef, useState } from 'react'
import { GlobalStyles } from '@ui/theme/GlobalStyles'
import { todoController } from '@ui/controller/todo'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const bg = '/bg.jpeg' // inside public folder

interface HomeTodo {
  id: string
  content: string
  done: boolean
}

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<HomeTodo[]>([])
  const [newTodoContent, setNewTodoContent] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const initialLoadComplete = useRef(false)

  const homeTodos = todoController.filterTodosByContent<HomeTodo>(todos, search)
  const hasMorePages = totalPages > page
  const hasNoTodos = homeTodos.length === 0 && !isLoading

  useEffect(() => {
    if (!initialLoadComplete.current) {
      todoController
        .get({ page })
        .then(({ todos, pages }) => {
          setTodos(todos)
          setTotalPages(pages)
        })
        .finally(() => {
          setIsLoading(false)
          initialLoadComplete.current = true
        })
    }
  }, [initialLoadComplete, page])

  return (
    <main>
      <GlobalStyles themeName="indigo" />
      <SnackbarProvider />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            todoController.create({
              content: newTodoContent,
              onError() {
                enqueueSnackbar('Failed to create TODO', {
                  variant: 'error',
                })
              },
              onSuccess(todo: HomeTodo) {
                setTodos((oldTodos) => {
                  return [todo, ...oldTodos]
                })
                setNewTodoContent('')
                enqueueSnackbar('TODO succesfully created!', {
                  variant: 'success',
                })
              },
            })
          }}
        >
          <input
            type="text"
            name="add-todo"
            className="text-black"
            placeholder="Correr, Estudar..."
            value={newTodoContent}
            onChange={function newTodoHandler(event) {
              setNewTodoContent(event.target.value)
            }}
          />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form className="text-black">
          <input
            type="text"
            value={search}
            placeholder="Filtrar lista atual, ex: Dentista"
            onChange={(event) => {
              setSearch(event.target.value)
            }}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {homeTodos.map((todo) => {
              return (
                <tr key={todo.id} className="text-black">
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={todo.done}
                      onClick={function handleToggle() {
                        todoController.toggleDone({
                          id: todo.id,
                          onError() {
                            alert('Falha ao atualizar a TODO :(')
                          },
                          updateTodoOnScreen() {
                            setTodos((currentTodos) => {
                              return currentTodos.map((currentTodo) => {
                                if (currentTodo.id === todo.id) {
                                  return {
                                    ...currentTodo,
                                    done: !currentTodo.done,
                                  }
                                }
                                return currentTodo
                              })
                            })
                          },
                        })
                      }}
                    />
                  </td>
                  <td>{todo.id.substring(0, 4)}</td>
                  <td>
                    {!todo.done && todo.content}
                    {todo.done && <s>{todo.content}</s>}
                  </td>

                  <td align="right">
                    <button
                      data-type="delete"
                      onClick={function handleDelete() {
                        todoController
                          .deleteById(todo.id)
                          .then(() => {
                            setTodos((currentTodos) => {
                              return currentTodos.filter((currentTodo) => {
                                return currentTodo.id !== todo.id
                              })
                            })
                            enqueueSnackbar('TODO succesfully deleted.', {
                              variant: 'success',
                            })
                          })
                          .catch(() => {
                            enqueueSnackbar('Failed to delete TODO.', {
                              variant: 'error',
                            })
                          })
                      }}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              )
            })}

            {isLoading && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  Carregando...
                </td>
              </tr>
            )}

            {hasNoTodos && (
              <tr>
                <td colSpan={4} align="center" className="text-black">
                  Nenhum item encontrado
                </td>
              </tr>
            )}

            {hasMorePages && !hasNoTodos && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  <button
                    data-type="load-more"
                    onClick={() => {
                      const nextPage = page + 1
                      setIsLoading(true)
                      setPage(nextPage)

                      todoController
                        .get({ page: nextPage })
                        .then(({ todos, pages }) => {
                          setTodos((oldTodos) => {
                            return [...oldTodos, ...todos]
                          })
                          setTotalPages(pages)
                        })
                        .finally(() => {
                          setIsLoading(false)
                        })
                    }}
                  >
                    Página {page}, Carregar mais{' '}
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: '4px',
                        fontSize: '1.2em',
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Home
