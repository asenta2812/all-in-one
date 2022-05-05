import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { selectToken, signOutUserAction } from '@redux/auth'
import { ErrorAlert } from '@components/alerts'
function useSocketIO() {
  const refSocket = useRef()
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const [socket, setSocket] = useState()

  useEffect(() => {
    refSocket.current = io.connect(process.env.REACT_APP_SOCKET_ENDPOINT, {
      auth: {
        token,
      },
      path: '/chat/',
      transports: ['websocket'],
    })
    setSocket(refSocket.current)
    refSocket.current.on('connect_error', (err) => {
      if (err.message === 'jwt expired') {
        dispatch(signOutUserAction())
      }
    })

    return () => {
      console.log('Disconnecting socket...')
      if (refSocket.current) {
        refSocket.current.disconnect()
      }
    }
  }, [])

  const sendMessageToServer = (message, participantIds, callback) => {
    refSocket.current &&
      refSocket.current.emit(
        'messageToServer',
        message,
        participantIds,
        ({ error }) => {
          if (error) {
            ErrorAlert(error.message)
          }
          if (typeof callback === 'function') {
            callback()
          }
        }
      )
  }

  const sendOnSeenMessageToServer = (room, seenAt = new Date(), callback) => {
    const participantIds = room.participants.map((i) => i.user)
    refSocket.current &&
      refSocket.current.emit(
        'sendSeenMessage',
        room?._id,
        participantIds,
        seenAt,
        ({ error }) => {
          if (error) {
            ErrorAlert(error.message)
          }
          if (typeof callback === 'function') {
            callback()
          }
        }
      )
  }
  const listenOnSeenMessageFromServer = (callback) => {
    refSocket.current &&
      refSocket.current.on('listenSeenMessage', (obj) => {
        if (typeof callback === 'function') {
          callback(obj)
        }
      })
  }
  const receiveMessageFromServer = (callback) => {
    refSocket.current &&
      refSocket.current.on('messageToClient', ({ message }) => {
        if (typeof callback === 'function') {
          callback(message)
        }
      })
  }

  const startCallUser = (data) => {
    refSocket.current && refSocket.current.emit('startCallUser', data)
  }

  const listenCallUser = (callback) => {
    console.log('123123', refSocket.current)
    refSocket.current &&
      refSocket.current.on('callUser', (data) => {
        if (typeof callback === 'function') {
          callback(data)
        }
      })
  }
  const socketOffEvent = (eventName = '') => {
    refSocket.current && refSocket.current.off(eventName)
  }
  return {
    sendMessageToServer,
    receiveMessageFromServer,
    socketOffEvent,
    sendOnSeenMessageToServer,
    listenOnSeenMessageFromServer,
    startCallUser,
    listenCallUser,
    socket,
  }
}

export default useSocketIO
