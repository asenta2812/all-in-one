import GetGif from '@components/emoji-picker/get-gif'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import TimeSeenStatus from './time-seen-status'
function MessageGif({ isMe, keyMessage, ...args }) {
  return (
    <div
      className={classnames(
        'max-w-[60%] w-auto mb-4 cursor-pointer bg-transparent relative animate-fadein',
        {
          'self-end text-right me': isMe,
          'self-start text-left': !isMe,
        }
      )}
    >
      <div className="min-h-[200px] min-w-[200px]">
        <GetGif idGif={keyMessage} width="100%" />
      </div>

      <div className="absolute bg-slate-500/50 rounded-full pr-2 py-[2px] bottom-1 right-1 text-white">
        <TimeSeenStatus isMe={isMe} {...args} />
      </div>
    </div>
  )
}
MessageGif.propTypes = {
  isMe: PropTypes.bool,
  isSeen: PropTypes.bool,
  keyMessage: PropTypes.string,
}

export default MessageGif
