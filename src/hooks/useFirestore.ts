import { useState } from 'react'
import {
  limit,
  query,
  addDoc,
  getDocs,
  orderBy,
  collection,
  getFirestore,
} from '@firebase/firestore/lite'
import { app } from '@lib/firebase'

export const useFirestore = <T>() => {
  const firestore = getFirestore(app)

  const [items, setItems] = useState<T[]>([])

  const setDocument = (path: string, data: Partial<T>) => {
    const ref = collection(firestore, path)
    const paylaod = {
      ...data,
      id: ref.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    return addDoc(ref, paylaod)
  }

  const getItems = async (path: string): Promise<T[]> => {
    const ref = collection(firestore, path)
    const queries = query(ref, orderBy('createdAt', 'desc'), limit(10))
    const result = await getDocs(queries)
    const data = result.docs.map((doc) => doc.data() as T)
    setItems(data)
    return data
  }

  return { items, setDocument, getItems }
}
