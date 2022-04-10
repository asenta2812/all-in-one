import UserDropDown from '@components/user-dropdown'
import Container from '@containers'
import ChatScreen from '@containers/chat-screen'
import SideBar from '@containers/sidebar'
import { ChatProvider } from '@contexts/chat'
import useSocketIO from '@hooks/use-socket-io'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/auth'
function ChatPage() {
  const {
    sendMessageToServer,
    receiveMessageFromServer,
    socketOffEvent,
    sendOnSeenMessageToServer,
    listenOnScreenMessageFromServer,
  } = useSocketIO()
  const [newMessage, setNewMessage] = useState()

  const [roomSeenMessage, setRoomSeenMessage] = useState()

  const currentUserId = useSelector(selectCurrentUser)?._id

  useEffect(() => {
    receiveMessageFromServer((newMess) => {
      console.log('🚀 -> receiveMessageFromServer -> newMess', newMess)
      if (newMess.sender === currentUserId) {
        newMess.isMe = true
      }
      setNewMessage(newMess)
    })

    listenOnScreenMessageFromServer((res) => {
      console.log('🚀 -> listenOnScreenMessageFromServer -> res', res)
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
      </Container>
    </ChatProvider>
  )
}

export default ChatPage
