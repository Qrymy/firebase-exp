import { useEffect, useState } from 'react'
import { auth } from '@lib/firebase'

export const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)

    return () => {
      unsubscribe()
    }
  }, [])

  const signIn = async () => {
    if (!user) {
      const { user: currentUser } = await auth.signInAnonymously()
      return currentUser
    }
    return user
  }

  return { user, signIn }
}
