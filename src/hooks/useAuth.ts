import { useEffect, useState } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged } from '@firebase/auth'
import { app } from '@/lib/firebase'

export const useAuth = () => {
  const auth = getAuth(app)

  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)

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
