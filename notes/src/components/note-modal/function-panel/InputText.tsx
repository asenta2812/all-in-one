import useDebounce from '@/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/redux'
import { selectNote, setNote } from '@/redux/notes'
import { Input } from 'antd'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styles from '../modal.module.scss'

const InputText = (_: any, ref: any) => {
  const noteData = useAppSelector(selectNote)
  const dispatch = useAppDispatch()
  const firstLoading = useRef(true)

  const [dataInput, setDataInput] = useState({
    title: noteData.title,
    description: noteData.description,
  })

  useImperativeHandle(ref, () => ({
    resetValue: () => {
      setDataInput({ title: '', description: '' })
    },
  }))
  const debounceValues = useDebounce(dataInput, 500)

  useEffect(() => {
    if (!firstLoading.current) {
      dispatch(setNote(debounceValues))
    } else {
      firstLoading.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValues])

  return (
    <div>
      <Input
        type="text"
        size="large"
        allowClear
        placeholder="Title"
        bordered={false}
        autoComplete="off"
        className={styles.inputText}
        value={dataInput.title}
        onChange={(e) => setDataInput((o) => ({ ...o, title: e.target.value }))}
      />

      <Input.TextArea
        allowClear
        autoSize={{ minRows: 3, maxRows: 50 }}
        bordered={false}
        placeholder="Notes right here"
        size="large"
        value={dataInput.description}
        className={styles.textarea}
        onChange={(e) =>
          setDataInput((o) => ({ ...o, description: e.target.value }))
        }
      />
    </div>
  )
}
export interface InputTextElement extends HTMLElement {
  resetValue: () => void
}
export default forwardRef<InputTextElement>(InputText)
