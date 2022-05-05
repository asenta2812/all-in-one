import {
  EllipsisOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import AvatarStatus from '@components/avatar-status'
import { selectCurrentUser } from '@redux/auth'
import { callAction } from '@redux/chat'
import { getNameAndAvatarRoom } from '@ultils'
import { Button, Col, Row, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Title, Paragraph } = Typography

function HeaderChatScreen({ room }) {
  const [roomData, setRoomData] = useState({ avatar: '', roomName: '' })
  const currentUser = useSelector(selectCurrentUser)
  const currentUserId = currentUser?._id
  const dispatch = useDispatch()
  const handleClickVideo = () => {
    dispatch(
      callAction({
        to: getNameAndAvatarRoom(room, currentUserId),
        video: true,
        from: currentUser,
        in: room,
      })
    )
  }
  const handleClickAudio = () => {
    dispatch(
      callAction({
        to: getNameAndAvatarRoom(room, currentUserId),
        video: false,
        from: currentUser,
        in: room,
      })
    )
  }
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
      className="border-b-[1px] p-2 pl-4 animate-fadein"
    >
      <Col className="mr-4">
        <AvatarStatus
          alt={roomData.roomName}
          size="large"
          src={roomData.avatar}
          online
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
            onClick={handleClickAudio}
          />
          <Button
            shape="circle"
            type="text"
            size="large"
            icon={<VideoCameraOutlined />}
            onClick={handleClickVideo}
          />
          <Button
            shape="circle"
            type="text"
            size="large"
            icon={<EllipsisOutlined />}
          />
        </Space>
      </Col>
    </Row>
  )
}
HeaderChatScreen.propTypes = {
  room: PropTypes.object,
}
export default HeaderChatScreen
