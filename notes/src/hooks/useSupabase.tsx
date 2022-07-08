import { Note } from '@/models/note'
import supabase from '@/supabase'
import { UploadFile } from 'antd/es/upload/interface'
import { v1 as uuid } from 'uuid'
export interface IUploadFileResponse {
  Key: string
}

function useSupabase() {
  const getNotes = async () =>
    new Promise<Note[]>(async (resolve, reject) => {
      const { data, error } = await supabase
        .from<Note>('notes')
        .select()
        .order('id', { ascending: false })
      if (error) {
        return reject(error)
      }
      return resolve(data)
    })

  const uploadFile = async (hash: string, file: UploadFile) => {
    const newFileName =
      uuid().substring(0, 8) + '.' + file.name.split('.').pop()
    return new Promise<IUploadFileResponse>(async (resolve, reject) => {
      const { data, error } = await supabase.storage
        .from('notes-images')
        .upload(`${hash}/${newFileName}`, file.originFileObj as File, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        })
      if (error) {
        return reject(error)
      }
      if (data) {
        return resolve(data)
      }
    })
  }

  const createNote = async (note: Note) =>
    new Promise<Note[]>(async (resolve, reject) => {
      const { data, error } = await supabase
        .from<Note>('notes')
        .insert({ ...note, id: undefined })
      if (error) {
        return reject(error)
      }
      if (data) {
        return resolve(data)
      }
    })

  return {
    getNotes,
    uploadFile,
    createNote,
  }
}

export default useSupabase
