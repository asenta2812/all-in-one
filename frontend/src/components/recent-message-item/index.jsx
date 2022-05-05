import {
  formatDateTimeRecent,
  getIsNewMessage,
  getNameAndAvatarRoom,
} from '@ultils'
import { Badge, Card, Col, Row, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import AvatarStatus from '../avatar-status'

const { Title, Paragraph, Text } = Typography
function RecentMessageItem({
  newestMessage,
  currentUserId,
  onClickItem,
  isActive,
  ...room
}) {
  const [isNew, setIsNew] = useState(false)
  const { name, avatar } = getNameAndAvatarRoom(room, currentUserId)

  const handleClick = () => {
    setIsNew(false)
    onClickItem(room._id)
  }
  const getMessage = () => {
    if (!newestMessage) {
      return null
    }
    const { type = 'text', content } = newestMessage
    if (type === 'text') {
      return content
    }
    const name = type.charAt(0).toUpperCase() + type.substring(1)
    return name
  }

  useEffect(() => {
    if (newestMessage) {
      setIsNew(getIsNewMessage(newestMessage, currentUserId))
    }
  }, [newestMessage])
  return (
    <Card
      bodyStyle={{
        padding: '10px',
        paddingRight: '30px',
        background: isActive ? 'rgba(125, 211, 252, .2)' : 'white',
        borderRadius: '20px',
        borderBottom: '1px solid rgb(229 229 229)',
      }}
      bordered={false}
      type="inner"
      hoverable
      className="w-full animate-fadein"
      style={{ background: 'transparent', borderRadius: '20px' }}
      onClick={handleClick}
    >
      <Row align="middle" gutter={[10]} justify="space-between" wrap={false}>
        <Col span={4} className="text-center">
          <AvatarStatus
            online
            alt={name}
            shape="circle"
            size="large"
            src={avatar}
          />
        </Col>
        <Col flex={1}>
          <Space direction="vertical">
            <Title level={5} style={{ margin: 0 }} ellipsis={{ rows: 1 }}>
              {name}
            </Title>
            <Paragraph
              style={{ margin: 0 }}
              strong={isNew}
              type={isNew ? 'default' : 'secondary'}
              ellipsis={{ rows: 2 }}
            >
              {getMessage()}
            </Paragraph>
          </Space>
        </Col>

        <Col span={5} className="px-2">
          <Space direction="vertical" align="center" style={{ float: 'right' }}>
            <Text>{formatDateTimeRecent(newestMessage?.createdAt)}</Text>
            {isNew && <Badge dot />}
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

RecentMessageItem.propTypes = {
  newestMessage: PropTypes.object,
  currentUserId: PropTypes.string,
  onClickItem: PropTypes.func,
  isActive: PropTypes.bool,
}
export default RecentMessageItem
