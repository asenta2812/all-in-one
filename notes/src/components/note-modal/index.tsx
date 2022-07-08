import useSupabase, { IUploadFileResponse } from '@/hooks/useSupabase'
import { Note } from '@/models/note'
import { useAppDispatch, useAppSelector } from '@/redux'
import {
  resetNote,
  selectNote,
  selectOpenModal,
  setOpenModalAction,
} from '@/redux/notes'
import { message, Modal } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import clsx from 'clsx'
import React, { createRef, useState } from 'react'
import { v1 as uuidV1 } from 'uuid'
import FunctionPanel from './function-panel'
import AddToFavourite from './function-panel/AddToFavourite'
import InputText, { InputTextElement } from './function-panel/InputText'
import UploadImages from './function-panel/UploadImages'
import styles from './modal.module.scss'
import { ModalProvider } from './ModalContext'

const NoteModal: React.FC = () => {
  const openModal = useAppSelector(selectOpenModal)
  const dispatch = useAppDispatch()
  const noteData = useAppSelector(selectNote)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { uploadFile, createNote } = useSupabase()
  const inputRef = createRef<InputTextElement>()

  const handleCancel = () => {
    dispatch(setOpenModalAction(false))
  }

  const uploadImagesToCloud = async (folder: string) => {
    const listAsync = fileList.map((file) => uploadFile(folder, file))

    return await Promise.all(listAsync)
  }

  const saveNote = (responseImages: IUploadFileResponse[], folder: string) => {
    const images = responseImages.map((i) => i.Key.split('/').pop() || '')
    const note: Note = { ...noteData, images, folderImage: folder }
    return createNote(note)
  }

  const handleSubmit = () => {
    // 1: Upload Images to Cloud
    const hashFolder = uuidV1()
    uploadImagesToCloud(hashFolder)
      .then((res) => saveNote(res, hashFolder))
      .then((result: Note[]) => {
        if (!result || result.length === 0) {
          return
        }

        // reset value in popup
        dispatch(resetNote())
        if (inputRef.current) {
          inputRef.current.resetValue()
        }
        setFileList([])
        // close popup
        handleCancel()
        // mutate value
      })
      .catch((err) => {
        message.error({ key: 'error_create', content: err.message })
      })
  }
  return (
    <ModalProvider value={{ handleSubmit }}>
      <Modal
        title={<AddToFavourite />}
        visible={openModal}
        onCancel={handleCancel}
        width="60%"
        footer={<FunctionPanel />}
        className={clsx(styles.modal, noteData.background)}
      >
        <InputText ref={inputRef} />
        <UploadImages fileList={fileList} setFileList={setFileList} />
      </Modal>
    </ModalProvider>
  )
}

export default NoteModal
