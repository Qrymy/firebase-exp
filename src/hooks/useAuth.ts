import { useEffect, useState } from 'react'
import { signInAnonymously } from '@firebase/auth'
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
      const { user: currentUser } = await signInAnonymously(auth)
      return currentUser
    }
    return user
  }

  return { user, signIn }
}
