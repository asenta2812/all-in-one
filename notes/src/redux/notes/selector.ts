import { Note, NoteInitialValues } from '@/models/note';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectOpenModal = createSelector(
  (state: RootState) => state.notes.openModal,
  (openModal: boolean) => openModal
)

export const selectNoteId = createSelector(
  (state: RootState) => state.notes.noteId,
  (id: number) => id
)

export const selectNote = createSelector(
  (state: RootState) => state.notes.note,
  (note: Note) => {
    if(!note){
      return NoteInitialValues
    }
    return note
  }
)