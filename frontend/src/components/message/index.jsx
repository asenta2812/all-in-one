import PropTypes from 'prop-types'
import React from 'react'
import MessageEmoji from './emoji'
import MessageGif from './gif'
import MessageText from './text'
function Message(props) {
  const { type = 'text', ...args } = props
  return type === 'gif' || type === 'sticker' ? (
    <MessageGif {...args} />
  ) : type === 'emoji' ? (
    <MessageEmoji {...args} />
  ) : (
    <MessageText {...args} />
  )
}

Message.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  isMe: PropTypes.bool,
  isSeen: PropTypes.bool,
  keyMessage: PropTypes.string,
}

export default Message
