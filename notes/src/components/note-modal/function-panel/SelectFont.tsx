import { useAppDispatch, useAppSelector } from '@/redux'
import { selectNote, setNote } from '@/redux/notes'
import { Select } from 'antd'
import React from 'react'
const { Option } = Select
const SelectFont = () => {
  const noteData = useAppSelector(selectNote)
  const dispatch = useAppDispatch()
  const handleChange = (value: string) => {
    dispatch(setNote({ font: value }))
  }
  return (
    <>
      <Select
        defaultValue={noteData.font}
        style={{ width: 150 }}
        onChange={handleChange}
        size="large"
      >
        <Option value="Noto Sans">Noto Sans</Option>
        <Option value="Work Sans">Work Sans</Option>
        <Option value="Oswald">Oswald</Option>
        <Option value="Josefin Sans">Josefin Sans</Option>
      </Select>
    </>
  )
}

export default SelectFont
