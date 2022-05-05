import {
  AliwangwangOutlined,
  GifOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { Tabs } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { convertToEmoji } from '@ultils'
import emojiCodes from './emoji-code'
import Gifs from './gifs'

function EmojiPicker({ onClick }) {
  const renderEmoji = () => {
    const genLists = () => {
      return emojiCodes.map((i) => {
        return (
          <span
            onClick={() => onClick({ type: 'emoji', key: i })}
            key={i}
            dangerouslySetInnerHTML={{ __html: convertToEmoji(i) }}
            style={{ fontSize: 20, cursor: 'pointer' }}
            className="flex items-center justify-center"
          />
        )
      })
    }
    return (
      <div className="grid grid-cols-8 gap-2 h-full pr-[10px] overflow-y-auto">
        {genLists()}
      </div>
    )
  }

  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="bottom"
      centered
      style={{ width: 300, height: 400 }}
      className="tabs-emoji"
    >
      <Tabs.TabPane
        tab={<AliwangwangOutlined style={{ fontSize: 20, marginRight: 0 }} />}
        key="1"
      >
        {renderEmoji()}
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<RobotOutlined style={{ fontSize: 20, marginRight: 0 }} />}
        key="2"
      >
        <Gifs onClickGif={onClick} sticker />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<GifOutlined style={{ fontSize: 20, marginRight: 0 }} />}
        key="3"
      >
        <Gifs onClickGif={onClick} />
      </Tabs.TabPane>
    </Tabs>
  )
}

EmojiPicker.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default EmojiPicker
