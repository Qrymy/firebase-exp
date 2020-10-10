import { useState } from 'react'
import {
  firestore,
  doc,
  collection,
  query,
  getDocs,
  setDoc,
  orderBy,
  limit,
} from '@lib/firebase'

export const useFirestore = <T>() => {
  const [items, setItems] = useState<T[]>([])

  const setDocument = (path: string, data: Partial<T>) => {
    const ref = doc(firestore, path)
    const paylaod = {
      ...data,
      id: ref.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    return setDoc(ref, paylaod)
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
