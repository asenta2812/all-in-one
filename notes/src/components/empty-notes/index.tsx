import { Image, Row, Space, Typography } from 'antd'
import React from 'react'
import notes from '@/assets/images/notes.png'
import favouriteNote from '@/assets/images/favourite-note.png'
import trash from '@/assets/images/trash.png'
import { useLocation } from 'react-router'

const EmptyNote = () => {
  const { pathname } = useLocation()
  return (
    <>
      <Row align="middle" justify="center" style={{ height: '100%' }}>
        {pathname === '/' && (
          <Space direction="vertical" align="center" size="large">
            <Image alt="empty note" src={notes} preview={false} />
            <Typography.Title level={3}>Anything to add?</Typography.Title>
          </Space>
        )}

        {pathname === '/favourite' && (
          <Space align="center">
            <Typography.Title level={3}>No favourite notes</Typography.Title>
            <Image alt="favourite note" src={favouriteNote} preview={false} />
          </Space>
        )}

        {pathname === '/trash' && (
          <Space direction="vertical" align="center" size="large">
            <Image alt="trash note" src={trash} preview={false} />
            <Typography.Title level={3}>Trash is empty</Typography.Title>
          </Space>
        )}
      </Row>
    </>
  )
}

export default EmptyNote
