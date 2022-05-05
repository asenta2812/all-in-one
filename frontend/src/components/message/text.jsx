import { Typography } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import TimeSeenStatus from './time-seen-status'

function MessageText({ content, isMe, ...args }) {
  return (
    <div
      className={classnames(
        'max-w-[60%] w-auto mb-4 border-[1px] rounded-lg py-[10px] px-[20px] cursor-pointer text-left animate-fadein',
        {
          'self-end bg-blue-500 border-blue-500  me text-white': isMe,
          'self-start bg-transparent text-black': !isMe,
        }
      )}
    >
      <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: true,
          symbol: <span className="text-sky-300">More</span>,
        }}
        style={{
          margin: 0,
          color: 'inherit',
          fontSize: 16,
          lineHeight: '25px',
          textAlign: 'inherit',
        }}
      >
        {content}
        <TimeSeenStatus isMe={isMe} {...args} />
      </Typography.Paragraph>
    </div>
  )
}
MessageText.propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.string,
  isMe: PropTypes.bool,
  isSeen: PropTypes.bool,
}

export default MessageText
