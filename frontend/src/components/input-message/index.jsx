import {
  AudioOutlined,
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import ChatContext from '@contexts/chat'
import { selectCurrentUser } from '@redux/auth'
import { Button, Input, Popover } from 'antd'
import PropTypes from 'prop-types'
import React, { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import EmojiPicker from '@components/emoji-picker'

function InputMessage({ room }) {
  const [message, setMessage] = useState('')
  const [popoverInvisible, setPopoverInvisible] = useState(false)
  const { sendMessageToServer } = useContext(ChatContext)
  const inputRef = useRef()
  const currentUserId = useSelector(selectCurrentUser)?._id

  const handleSendMessageToServer = (data) => {
    const messObj = {
      sender: currentUserId,
      at_room: room._id,
      ...data,
    }
    const participantIds = room.participants.map((item) => item.user)
    // send message to socket
    sendMessageToServer(messObj, participantIds)
  }

  const handleSend = () => {
    handleSendMessageToServer({ type: 'text', content: message })
    // remove and focus input
    setMessage('')
    inputRef.current?.focus()
  }

  const handleClickAnotherTypeMessage = (data) => {
    handleSendMessageToServer(data)
    setPopoverInvisible(false)
  }

  return (
    <div className="flex flex-nowrap items-center justify-between border-t-[1px] animate-fadein">
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
      <Popover
        content={<EmojiPicker onClick={handleClickAnotherTypeMessage} />}
        trigger="click"
        overlayClassName="popover-emoji"
        visible={popoverInvisible}
        onVisibleChange={setPopoverInvisible}
      >
        <Button
          type="text"
          shape="circle"
          icon={<SmileOutlined />}
          size="large"
        />
      </Popover>
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
