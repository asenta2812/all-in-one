import feathersClient from '@client'
import RecentMessageItem from '@components/recent-message-item'
import { Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import ChatContext from '@contexts/chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '@redux/auth'
import { selectRoomAction } from '@redux/chat'
function RecentMessages() {
  const [recentMessages, setRecentMessages] = useState()
  const { newMessage } = useContext(ChatContext)
  const currentUserId = useSelector(selectCurrentUser)._id
  const dispatch = useDispatch()

  const handleClickItem = (roomId) => {
    dispatch(selectRoomAction({ roomId }))
  }
  const getRecentMessages = async () => {
    const messages = await feathersClient.service('rooms').find({
      query: {
        is_get_recent_messages: true,
        'participants.user': currentUserId,
      },
    })
    setRecentMessages(messages)
  }
  useEffect(() => {
    getRecentMessages()
  }, [])

  useEffect(() => {
    if (newMessage) {
      const index = recentMessages.findIndex(
        (f) => f._id === newMessage.at_room
      )
      if (index > -1) {
        const updateMessage = recentMessages[index]
        updateMessage.newestMessage = newMessage
        recentMessages.splice(index, 1)
        setRecentMessages((old) => [updateMessage, ...old])
      } else {
        getRecentMessages()
      }
    }
  }, [newMessage])
  const renderContacts = () => {
    if (!recentMessages) {
      return null
    }
    return recentMessages.map((item) => (
      <RecentMessageItem
        key={item._id}
        {...item}
        currentUserId={currentUserId}
        onClickItem={handleClickItem}
      />
    ))
  }

  return (
    <Space direction="vertical" className="w-full">
      {renderContacts()}
    </Space>
  )
}

export default RecentMessages
