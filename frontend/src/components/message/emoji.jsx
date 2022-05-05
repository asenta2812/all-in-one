import { convertToEmoji } from '@ultils'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import TimeSeenStatus from './time-seen-status'
function MessageEmoji(props) {
  const { isMe, keyMessage, ...args } = props
  return (
    <div
      className={classnames(
        'max-w-[60%] w-auto mb-4 cursor-pointer bg-transparent animate-fadein',
        {
          'self-end text-right me': isMe,
          'self-start text-left': !isMe,
        }
      )}
    >
      <p
        className="m-0 p-0 mb-1 text-8xl"
        dangerouslySetInnerHTML={{ __html: convertToEmoji(keyMessage) }}
      ></p>
      <TimeSeenStatus isMe={isMe} {...args} />
    </div>
  )
}

MessageEmoji.propTypes = {
  isMe: PropTypes.bool,
  isSeen: PropTypes.bool,
  keyMessage: PropTypes.string,
}

export default MessageEmoji
