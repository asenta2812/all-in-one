import EmptyNote from '@/components/empty-notes'
import useGetNotes from '@/hooks/useGetNotes'
import MainLayout from '@containers/layout'
import React from 'react'

interface TrashProps {}

const Trash: React.FC<TrashProps> = ({}) => {
  const { data, isValidating } = useGetNotes()

  return <MainLayout>{data && data.length !== 0 && <EmptyNote />}</MainLayout>
}

export default Trash
