import { AlertOutlined, SettingOutlined } from '@ant-design/icons'
import { Badge, Space } from 'antd'
import React from 'react'
import './music.css'

function MusicApp() {
  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <h2 className="title">Music</h2>
          <Space className="setting" size="large">
            <SettingOutlined className="icon" />
            <Badge dot>
              <AlertOutlined className="icon" />
            </Badge>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default MusicApp
