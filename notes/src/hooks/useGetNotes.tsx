import { Note } from '@/models/note'
import { useLocation } from 'react-router'
import useSWR from 'swr'
import useSupabase from './useSupabase'

function useGetNotes() {
  const { pathname } = useLocation()
  const { getNotes } = useSupabase()
  const type =
    pathname === '/'
      ? 'default'
      : pathname === 'favourite'
      ? 'favourite'
      : 'trash'

  const { data, error, isValidating, mutate } = useSWR<Note[]>(
    'getNotes',
    getNotes,
    { suspense: true }
  )
  return { data, error, isValidating, mutate }
}

export default useGetNotes
