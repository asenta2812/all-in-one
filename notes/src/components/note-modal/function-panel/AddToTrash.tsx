import { useAppSelector } from '@/redux'
import { selectNoteId } from '@/redux/notes'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'

const AddToTrash = () => {
  const noteId = useAppSelector(selectNoteId)
  return (
    <>
      <Tooltip title="Add to trash">
        <Button
          size="large"
          shape="circle"
          type="text"
          icon={<DeleteOutlined style={{ fontSize: '1.5rem' }} />}
          disabled={!noteId}
        />
      </Tooltip>
    </>
  )
}

export default AddToTrash
