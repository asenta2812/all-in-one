import { formatDateTimeRecent, getNameAndAvatarRoom } from '@ultils'
import { Avatar, Badge, Card, Col, Row, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const { Title, Paragraph, Text } = Typography
function RecentMessageItem({
  newestMessage,
  currentUserId,
  onClickItem,
  ...room
}) {
  const isNew = false
  const { name, avatar } = getNameAndAvatarRoom(room, currentUserId)

  const handleClick = () => {
    onClickItem(room._id)
  }
  return (
    <Card
      bodyStyle={{
        padding: '10px',
        paddingRight: '30px',
      }}
      bordered={false}
      type="inner"
      hoverable
      className="w-full border-b-[1px]"
      onClick={handleClick}
    >
      <Row align="middle" gutter={[10]} justify="space-between" wrap={false}>
        <Col span={4} className="text-center">
          <Avatar alt={name} shape="circle" size="large" src={avatar} />
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
              {newestMessage.content}
            </Paragraph>
          </Space>
        </Col>

        <Col span={4}>
          <Space direction="vertical" align="center">
            <Text>{formatDateTimeRecent(newestMessage.createdAt)}</Text>
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
}
export default RecentMessageItem
