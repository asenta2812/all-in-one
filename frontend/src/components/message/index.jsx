import { Card, Typography } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
function Message(props) {
  const { content, type, isMe } = props
  return (
    <div
      className={classnames(
        'max-w-[60%] w-auto mb-4 border-[1px] rounded-md py-[10px] px-[20px] my-bubble my-thought cursor-pointer',
        {
          'self-end bg-blue-500 border-blue-500 text-right me': isMe,
          'self-start bg-transparent text-left': !isMe,
        }
      )}
    >
      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'More' }}
        style={{ margin: 0, color: isMe ? 'white' : 'black', fontSize: 16 }}
      >
        {content}
      </Typography.Paragraph>
    </div>
  )
}

Message.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  isMe: PropTypes.bool,
}

export default Message
