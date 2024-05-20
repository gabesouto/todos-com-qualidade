'use client'
import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '@ui/theme/GlobalStyles'
import { todoController } from '@ui/controller/todo'

const bg = '/bg.jpeg' // inside public folder

interface HomeTodo {
  id: string
  content: string
}

function Home() {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<HomeTodo[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const homeTodos = todoController.filterTodosByContent<HomeTodo>(todos, search)
  const hasMorePages = totalPages > page
  const hasNoTodos = homeTodos.length === 0 && !isLoading

  useEffect(() => {
    if (!initialLoadComplete) {
      todoController
        .get({ page })
        .then(({ todos, pages }) => {
          setTodos(todos)
          setTotalPages(pages)
          setInitialLoadComplete(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [initialLoadComplete, page])

  return (
    <main>
      <GlobalStyles themeName="coolGrey" />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
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
              console.log(hasNoTodos)
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
                    <input type="checkbox" />
                  </td>
                  <td>{todo.id.substring(0, 4)}</td>
                  <td>{todo.content}</td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
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

            {hasMorePages && (
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
