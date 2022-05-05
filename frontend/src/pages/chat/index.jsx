import CallModal from '@components/call-modal'
import UserDropDown from '@components/user-dropdown'
import Container from '@containers'
import ChatScreen from '@containers/chat-screen'
import SideBar from '@containers/sidebar'
import { ChatProvider } from '@contexts/chat'
import useSocketIO from '@hooks/use-socket-io'
import { selectCurrentUser } from '@redux/auth'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ChatPage() {
  const {
    sendMessageToServer,
    receiveMessageFromServer,
    socketOffEvent,
    sendOnSeenMessageToServer,
    listenOnSeenMessageFromServer,
    socket,
  } = useSocketIO()
  const [newMessage, setNewMessage] = useState()

  const [roomSeenMessage, setRoomSeenMessage] = useState()

  const currentUserId = useSelector(selectCurrentUser)?._id

  useEffect(() => {
    receiveMessageFromServer((newMess) => {
      if (newMess.sender === currentUserId) {
        newMess.isMe = true
      }
      setNewMessage(newMess)
    })

    listenOnSeenMessageFromServer((res) => {
      setRoomSeenMessage(res)
    })
    return () => {
      socketOffEvent()
    }
  }, [])

  const handleClearNewMessage = () => {
    setNewMessage(null)
  }
  return (
    <ChatProvider
      value={{
        sendMessageToServer,
        newMessage,
        sendOnSeenMessageToServer,
        handleClearNewMessage,
        roomSeenMessage,
      }}
    >
      <Container>
        <Row className="h-full overflow-hidden">
          {/* sidebar */}
          <Col xl={6} lg={10} md={10} sm={0} className="h-full">
            <SideBar />
          </Col>
          {/* end sidebar */}

          {/* main chat*/}
          <Col xl={18} lg={14} md={14} sm={24}>
            <ChatScreen />
          </Col>
          {/* end main chat */}

          {/* infot*/}
          {/* <Col xl={6} lg={0} md={0} sm={0}>
          <p>info chat</p>
        </Col> */}
          {/* end info */}
        </Row>
        <UserDropDown position="bottom-left" />
        {socket && <CallModal socket={socket} />}
      </Container>
    </ChatProvider>
  )
}

export default ChatPage
