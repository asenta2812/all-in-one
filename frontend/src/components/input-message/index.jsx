import {
  AudioOutlined,
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import ChatContext from '@contexts/chat'
import { selectCurrentUser } from '@redux/auth'
import { Button, Input } from 'antd'
import PropTypes from 'prop-types'
import React, { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function InputMessage({ room }) {
  const [message, setMessage] = useState('')
  const { sendMessageToServer } = useContext(ChatContext)
  const inputRef = useRef()
  const currentUserId = useSelector(selectCurrentUser)?._id
  const handleSend = () => {
    const messObj = {
      sender: currentUserId,
      content: message,
      at_room: room._id,
    }
    const participantIds = room.participants.map((item) => item.user)
    // send message to socket
    sendMessageToServer(messObj, participantIds)
    // remove and focus input
    setMessage('')
    inputRef.current?.focus()
  }
  return (
    <div className="flex flex-nowrap items-center justify-between border-t-[1px]">
      <Button
        type="text"
        shape="round"
        icon={<PaperClipOutlined />}
        size="large"
      />
      <Input
        placeholder="Write a message ..."
        bordered={false}
        size="large"
        style={{ padding: 0 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        ref={inputRef}
      />
      <Button
        type="text"
        shape="circle"
        icon={<SmileOutlined />}
        size="large"
      />
      <Button
        type="text"
        shape="circle"
        onClick={handleSend}
        icon={
          message ? (
            <SendOutlined style={{ color: 'blue' }} />
          ) : (
            <AudioOutlined />
          )
        }
        size="large"
      />
    </div>
  )
}
InputMessage.propTypes = {
  room: PropTypes.object,
}

export default InputMessage
