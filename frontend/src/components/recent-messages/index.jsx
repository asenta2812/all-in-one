import feathersClient from '@client'
import RecentMessageItem from '@components/recent-message-item'
import ChatContext from '@contexts/chat'
import { selectCurrentUser } from '@redux/auth'
import { selectCurrentRoom, selectRoomAction } from '@redux/chat'
import { Space } from 'antd'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function RecentMessages() {
  const [recentMessages, setRecentMessages] = useState()
  const { newMessage, handleClearNewMessage } = useContext(ChatContext)
  const currentUserId = useSelector(selectCurrentUser)._id
  const currentRoomId = useSelector(selectCurrentRoom)?._id
  const dispatch = useDispatch()

  const handleClickItem = (roomId) => {
    if (roomId === newMessage?.at_room) {
      handleClearNewMessage()
    }
    if (roomId !== currentRoomId) {
      dispatch(selectRoomAction({ roomId }))
    }
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

  const renderRecentMessages = useMemo(() => {
    if (!recentMessages) {
      return null
    }
    return recentMessages.map((item) => (
      <RecentMessageItem
        key={item._id}
        {...item}
        currentUserId={currentUserId}
        onClickItem={handleClickItem}
        isActive={item._id === currentRoomId}
      />
    ))
  }, [recentMessages, currentRoomId])

  return (
    <Space direction="vertical" className="w-full p-2">
      {renderRecentMessages}
    </Space>
  )
}

export default RecentMessages
