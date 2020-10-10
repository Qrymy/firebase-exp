import { useEffect, useCallback } from 'react'
import { NextPage } from 'next'
import { useAuth } from '@hooks/use-auth'
import { useFirestore } from '@hooks/use-firestore'
import { TodoInput } from '@components/todo-input'
import { Todo } from '@models/todo'

const collectionName = 'todos'

const HomePage: NextPage = () => {
  const { user, signIn } = useAuth()

  const { items, getItems, setDocument } = useFirestore<Todo>()

  useEffect(() => {
    signIn()
  }, [])

  useEffect(() => {
    if (user) {
      getItems(collectionName)
    }
  }, [user])

  const handleSubmit = useCallback(
    async (content) => {
      if (user) {
        await setDocument(collectionName, { content })
        await getItems(collectionName)
      }
    },
    [user]
  )

  return (
    <div>
      <TodoInput onSubmit={handleSubmit} />
      {items.map(({ id, content }) => (
        <div key={id}>{content}</div>
      ))}
    </div>
  )
}

export default HomePage
