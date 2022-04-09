import {
  EllipsisOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { selectCurrentUser } from '@redux/auth'
import { getNameAndAvatarRoom } from '@ultils'
import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const { Title, Paragraph } = Typography

function HeaderChatScreen({ room }) {
  const [roomData, setRoomData] = useState({ avatar: '', roomName: '' })
  const currentUserId = useSelector(selectCurrentUser)?._id
  // TODO: last online
  useEffect(() => {
    if (room.name && room.avatar) {
      setRoomData({ avatar: room.avatar, roomName: room.name })
      return
    }

    if (currentUserId) {
      const { name, avatar } = getNameAndAvatarRoom(room, currentUserId)
      setRoomData({ avatar, roomName: name })
    }
  }, [room, currentUserId])
  return (
    <Row
      align="middle"
      justify="space-between"
      wrap={false}
      className="border-b-[1px] p-2 pl-4"
    >
      <Col className="mr-4">
        <Avatar
          alt={roomData.roomName}
          shape="circle"
          size="large"
          src={roomData.avatar}
        />
      </Col>
      <Col flex={1}>
        <Space direction="vertical" size={[2]}>
          <Title level={5} style={{ margin: 0 }} ellipsis={{ rows: 1 }}>
            {roomData.roomName}
          </Title>
          <Paragraph style={{ margin: 0 }} italic type="success">
            Online
          </Paragraph>
        </Space>
      </Col>
      <Col>
        <Space direction="horizontal" size="large">
          <Button
            shape="circle"
            type="text"
            size="large"
            icon={<PhoneOutlined />}
          ></Button>
          <Button
            shape="circle"
            type="text"
            size="large"
            icon={<VideoCameraOutlined />}
          ></Button>
          <Button
            shape="circle"
            type="text"
            size="large"
            icon={<EllipsisOutlined />}
          ></Button>
        </Space>
      </Col>
    </Row>
  )
}
HeaderChatScreen.propTypes = {
  room: PropTypes.object,
}
export default HeaderChatScreen
