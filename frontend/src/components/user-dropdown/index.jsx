import {
  InfoCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { selectCurrentUser } from '@redux/auth'
import { Affix, Avatar, Button, Popover } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUserAction } from '../../redux/auth'
import { getFullLinkImage } from '../../ultils'

function UserDropDown({ position = 'bottom-right' }) {
  const dispatch = useDispatch()
  let styleObj = ''
  switch (position) {
    case 'bottom-right':
      styleObj = { bottom: 20, right: 20 }
      break
    case 'bottom-left':
      styleObj = { bottom: 20, left: 20 }
      break
    default:
      styleObj = { bottom: 20, right: 20 }
  }
  const user = useSelector(selectCurrentUser)
  const handleSignOut = () => {
    dispatch(signOutUserAction())
  }
  const renderContent = () => {
    return (
      <div className="flex flex-col items-start">
        <p>{user.name}</p>
        <Button
          icon={<InfoCircleOutlined />}
          className="mb-2"
          type="text"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          Edit Info
        </Button>
        <Button
          icon={<LogoutOutlined />}
          type="text"
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    )
  }
  return (
    <Affix style={{ position: 'absolute', zIndex: 9999, ...styleObj }}>
      <Popover placement="topLeft" content={renderContent} trigger="hover">
        <Avatar
          src={getFullLinkImage(user.avatar)}
          alt={user.name}
          size={60}
          icon={<UserOutlined />}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid white',
            boxShadow: '0px 0px 20px 4px rgba(0,0,0,0.7)',
          }}
        />
      </Popover>
    </Affix>
  )
}
UserDropDown.propTypes = {
  position: PropTypes.string,
}

export default UserDropDown
