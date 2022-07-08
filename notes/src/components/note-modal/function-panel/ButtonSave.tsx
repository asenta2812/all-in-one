import { useAppSelector } from '@/redux'
import { selectNote } from '@/redux/notes'
import { Button } from 'antd'
import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import styles from '../modal.module.scss'
import ModalContext from '../ModalContext'

const ButtonSave = () => {
  const note = useAppSelector(selectNote)
  const [show, setShow] = useState<boolean>(false)
  const { handleSubmit } = useContext(ModalContext)
  useEffect(() => {
    if (note.title && note.description) {
      setShow(true)
    }
  }, [note])
  return (
    <>
      <Button
        title="Save"
        size="large"
        children="Save"
        type="text"
        className={clsx(styles.buttonSave, { active: show })}
        onClick={handleSubmit}
      />
    </>
  )
}

export default ButtonSave
