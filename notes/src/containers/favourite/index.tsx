import React from 'react'
import MainLayout from '@containers/layout'
import useGetNotes from '@/hooks/useGetNotes'
import EmptyNote from '@/components/empty-notes'

interface FavouriteProps {}

const Favourite: React.FC<FavouriteProps> = ({}) => {
  const { data, isValidating } = useGetNotes()

  return <MainLayout>{data && data.length !== 0 && <EmptyNote />}</MainLayout>
}

export default Favourite
