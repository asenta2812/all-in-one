import { Card, Typography } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
function Message(props) {
  const { content, type, isMe, isSeen } = props
  return (
    <div
      className={classnames(
        'flex max-w-[60%] w-auto mb-4 border-[1px] rounded-md py-[10px] px-[20px] my-bubble my-thought cursor-pointer',
        {
          'self-end bg-blue-500 border-blue-500 text-right me': isMe,
          'self-start bg-transparent text-left': !isMe,
        }
      )}
    >
      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'More' }}
        style={{
          margin: 0,
          color: isMe ? 'white' : 'black',
          fontSize: 16,
          lineHeight: '22px',
        }}
      >
        {content}
      </Typography.Paragraph>
      <div className="ml-2 self-end">
        {isMe &&
          (isSeen ? (
            <CheckCircleFilled
              style={{ color: 'white', verticalAlign: 'middle' }}
            />
          ) : (
            <CheckCircleOutlined
              style={{ color: 'white', verticalAlign: 'middle' }}
            />
          ))}
      </div>
    </div>
  )
}

Message.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  isMe: PropTypes.bool,
  isSeen: PropTypes.bool,
}

export default Message
