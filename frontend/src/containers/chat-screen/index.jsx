import HeaderChatScreen from '@components/header-chat-screen'
import InputMessage from '@components/input-message'
import ViewMessages from '@components/view-messages'
import { selectCurrentRoom } from '@redux/chat'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

function ChatScreen() {
  const currentRoom = useSelector(selectCurrentRoom)
  // return (
  //   <>
  //     {currentRoom ? (

  //     ) : (
  //       <Row className="my-row-center">
  //         <Result
  //           icon={<SmileOutlined />}
  //           title="Select a user to start a chat"
  //           extra={<Button type="primary">Next</Button>}
  //         />
  //       </Row>
  //     )}
  //   </>
  // )
  return (
    <>
      {currentRoom && (
        <div className="grid grid-rows-[60px_calc(100vh-120px)_60px]">
          <HeaderChatScreen room={currentRoom} />
          <ViewMessages room={currentRoom} />
          <InputMessage room={currentRoom} />
        </div>
      )}
    </>
  )
}

export default memo(ChatScreen)
