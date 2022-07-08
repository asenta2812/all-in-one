import EmptyNote from '@/components/empty-notes'
import NoteCard from '@/components/note-card'
import useGetNotes from '@/hooks/useGetNotes'
import MainLayout from '@containers/layout'
import React from 'react'

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { data, isValidating } = useGetNotes()

  const renderNotes = () => {
    return data && data.map((note) => <NoteCard {...note} key={note.id} />)
  }
  return (
    <MainLayout>
      {data && data.length === 0 && <EmptyNote />}
      {data && data.length > 0 && renderNotes()}
      {/* {data && data.length > 0 && renderNotes()}
      {data && data.length > 0 && renderNotes()}
      {data && data.length > 0 && renderNotes()}
      {data && data.length > 0 && renderNotes()} */}
    </MainLayout>
  )
}

export default Home
