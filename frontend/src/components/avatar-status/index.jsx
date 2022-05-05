import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Badge } from 'antd'

function AvatarStatus({ online, ...propsAvatar }) {
  return online ? (
    <Badge
      dot
      status="success"
      style={{
        transform: 'translate(0)',
        width: 14,
        height: 14,
        bottom: -2,
        right: -2,
        top: 'unset',
        border: '2px solid white',
      }}
    >
      <Avatar shape="circle" {...propsAvatar} />
    </Badge>
  ) : (
    <Avatar shape="circle" {...propsAvatar} />
  )
}
AvatarStatus.propTypes = {
  online: PropTypes.bool,
}
export default AvatarStatus
