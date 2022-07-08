import feathersClient from '@client'
import Message from '@components/message'
import ChatContext from '@contexts/chat'
import { selectCurrentUser } from '@redux/auth'
import { Empty, Spin } from 'antd'
import PropTypes from 'prop-types'
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { getIsNewMessage } from '@ultils'
function ViewMessages({ room }) {
  const [messages, setMessages] = useState([])
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pageRef = useRef({
    currentPage: 0,
    maxPage: 1,
    scrollTop: 0,
  })
  const chatRef = useRef()
  const currentUserId = useSelector(selectCurrentUser)?._id
  const {
    newMessage,
    sendOnSeenMessageToServer,
    handleClearNewMessage,
    roomSeenMessage,
    setTestState,
  } = useContext(ChatContext)

  const checkIsMessageNotRead = (message) => {
    if (
      getIsNewMessage(message, currentUserId) &&
      pageRef.current.currentPage === 0
    ) {
      sendOnSeenMessageToServer(room)
    }
  }
  const getMessages = async () => {
    const limit = 30
    if (isLoadMore) {
      return
    }

    setIsLoading(true)
    const { data, total } = await feathersClient.service('messages').find({
      query: {
        at_room: room._id,
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
        $skip: pageRef.current.currentPage * limit,
      },
    })
    pageRef.current.maxPage = Math.ceil(total / limit)
    setIsLoading(false)
    if (data.length > 0) {
      const dataFormat = data.reverse().map((item) => {
        if (item.sender === currentUserId) {
          item.isMe = true
        }
        return item
      })
      checkIsMessageNotRead(data[data.length - 1])
      setMessages((old) => dataFormat.concat(old))
      setIsLoadMore(false)
    } else {
      setMessages([])
    }
  }

  const handleScroll = () => {
    if (
      chatRef.current.scrollTop < 20 &&
      !isLoadMore &&
      pageRef.current.currentPage < pageRef.current.maxPage - 1
    ) {
      pageRef.current.currentPage = pageRef.current.currentPage + 1
      setIsLoadMore(true)

      getMessages()
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.addEventListener('scroll', handleScroll)
    }

    return () => {
      chatRef.current &&
        chatRef.current.removeEventListener('scroll', handleScroll)
      // remove message when unmout
      setMessages([])
    }
  }, [])

  useEffect(() => {
    // check have new message, add to list
    if (newMessage && newMessage.at_room === room._id) {
      setMessages((oldMess) => [...oldMess, newMessage])
      if (getIsNewMessage(newMessage, currentUserId)) {
        sendOnSeenMessageToServer(room)
      }
      handleClearNewMessage()
    }
  }, [newMessage])

  useEffect(() => {
    getMessages()
  }, [room])

  useLayoutEffect(() => {
    if (chatRef.current && !isLoadMore) {
      requestAnimationFrame(() => {
        chatRef.current.scrollTop = chatRef.current?.scrollHeight
        pageRef.current.scrollTop = chatRef.current?.scrollHeight
      })
    }

    if (chatRef.current && isLoadMore) {
      requestAnimationFrame(() => {
        chatRef.current.scrollTop =
          chatRef.current?.scrollHeight - pageRef.current.scrollTop
      })
    }
  }, [messages])

  const renderMessages = useMemo(() => {
    if (messages.length === 0) return
    return messages.map((mess) => {
      // TODO : làm cho 1 list user seen như message FB

      let isSeen = false
      if (roomSeenMessage && roomSeenMessage.at_room === room._id) {
        isSeen = new Date(mess.createdAt) <= new Date(roomSeenMessage.seenAt)
      } else {
        isSeen = mess.seen_by && mess.seen_by.length > 0
      }
      return (
        <Message
          {...mess}
          key={mess._id}
          isSeen={isSeen}
          keyMessage={mess.key}
          on
        />
      )
    })
  }, [messages, roomSeenMessage])

  return (
    <div ref={chatRef} className="overflow-y-auto h-full animate-fadein">
      <div className="flex flex-col flex-1 justify-end p-4">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ) : messages && messages.length > 0 ? (
          renderMessages
        ) : (
          <div className="flex justify-center items-center">
            <Empty description="You don't have any messages" />
          </div>
        )}
      </div>
    </div>
  )
}
ViewMessages.propTypes = {
  room: PropTypes.object,
}

export default ViewMessages
