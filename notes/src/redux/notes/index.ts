import { Note, NoteInitialValues } from '@/models/note';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectNoteId, selectOpenModal, selectNote } from './selector';
const initialState = {
  openModal: false,
  noteId: 0,
  note: NoteInitialValues
}
export type TypeNoteState = typeof initialState;
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNoteId: (state, action: PayloadAction<number>) => ({...state, noteId: action.payload  }),
    setOpenModal: (state, action: PayloadAction<boolean>) => ({...state, openModal: action.payload}),
    setNote: (state, action: PayloadAction<Partial<Note>>) => ({...state, note: {...state.note, ...action.payload}}),
    resetNote: (state) => ({...state, note: NoteInitialValues})
  },
  
})

export { selectOpenModal, selectNoteId , selectNote};
export const { setOpenModal: setOpenModalAction, setNote, setNoteId, resetNote } = noteSlice.actions
export default noteSlice.reducer
