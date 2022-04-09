import Message from '@components/message'
import ChatContext from '@contexts/chat'
import feathersClient from '@client'
import { selectCurrentUser } from '@redux/auth'
import { Empty } from 'antd'
import PropTypes from 'prop-types'
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

function ViewMessages({ room }) {
  const [messages, setMessages] = useState([])
  const [isLoadMore, setIsLoadMore] = useState(false)
  const pageRef = useRef({ currentPage: 0, maxPage: 1, scrollTop: 0 })
  const chatRef = useRef()
  const currentUserId = useSelector(selectCurrentUser)?._id
  const { newMessage } = useContext(ChatContext)

  const getMessages = async () => {
    const limit = 30
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
    if (data.length > 0) {
      const dataFormat = data.reverse().map((item) => {
        if (item.sender === currentUserId) {
          item.isMe = true
        }
        return item
      })
      setMessages((old) => dataFormat.concat(old))
      setIsLoadMore(false)
    } else {
      setMessages([])
    }
  }

  const handleScroll = (e) => {
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
    }
  }, [])

  useEffect(() => {
    // check have new message, add to list
    if (newMessage && newMessage.at_room === room._id) {
      setMessages((oldMess) => [...oldMess, newMessage])
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

  if (!messages) {
    return (
      <div className="flex justify-center items-center">
        <Empty description="You don't have any messages" />
      </div>
    )
  }

  const renderMessages = () => {
    return messages.map((mess, index) => <Message key={index} {...mess} />)
  }

  return (
    <div ref={chatRef} className="overflow-y-auto h-full">
      <div className="flex flex-col flex-1 justify-end p-4">
        {renderMessages()}
      </div>
    </div>
  )
}
ViewMessages.propTypes = {
  room: PropTypes.object,
}

export default ViewMessages
