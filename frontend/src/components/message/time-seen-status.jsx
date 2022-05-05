import { Typography } from 'antd'
import moment from 'moment'
import React from 'react'
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

function TimeSeenStatus({ createdAt, isMe, isSeen }) {
  if (!isMe) {
    return null
  }
  return (
    <>
      <Typography.Text
        italic
        className="ml-2 float-right"
        style={{ color: 'inherit', fontSize: 14 }}
      >
        {moment(createdAt).format('HH:mm')}
        {isSeen ? (
          <CheckCircleFilled
            style={{
              color: 'inherit',
              verticalAlign: 'middle',
              marginLeft: '8px',
            }}
          />
        ) : (
          <CheckCircleOutlined
            style={{
              color: 'inherit',
              verticalAlign: 'middle',
              marginLeft: '8px',
            }}
          />
        )}
      </Typography.Text>
    </>
  )
}
TimeSeenStatus.propTypes = {
  createdAt: PropTypes.string,
  isMe: PropTypes.bool,
  isSeen: PropTypes.bool,
}
export default TimeSeenStatus
