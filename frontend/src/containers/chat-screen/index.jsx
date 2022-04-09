import HeaderChatScreen from '@components/header-chat-screen'
import ViewMessages from '@components/view-messages'
import React, { memo } from 'react'
import InputMessage from '@components/input-message'
import { useSelector } from 'react-redux'
import { selectCurrentRoom, selectChatLoading } from '@redux/chat'
import { Button, Result, Row } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
function ChatScreen() {
  const currentRoom = useSelector(selectCurrentRoom)
  // const roomLoading = useSelector(selectChatLoading)
  if (!currentRoom) {
    return (
      <Row className="my-row-center">
        <Result
          icon={<SmileOutlined />}
          title="Select a user to start a chat"
          extra={<Button type="primary">Next</Button>}
        />
      </Row>
    )
  }
  return (
    <div className="grid grid-rows-[60px_calc(100vh-120px)_60px]">
      <HeaderChatScreen room={currentRoom} />
      <ViewMessages room={currentRoom} />
      <InputMessage room={currentRoom} />
    </div>
  )
}

export default memo(ChatScreen)
