import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { selectToken, signOutUserAction } from '@redux/auth'
import { ErrorAlert } from '@components/alerts'
function useSocketIO() {
  const refSocket = useRef()
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  useEffect(() => {
    refSocket.current = io.connect(import.meta.env.VITE_SOCKET_ENDPOINT, {
      auth: {
        token,
      },
      path: '/chat/',
      transports: ['websocket'],
    })
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

  const sendOnSeenMessageToServer = (room, seenAt, callback) => {
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
  const listenOnScreenMessageFromServer = (callback) => {
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

  const socketOffEvent = (eventName = '') => {
    refSocket.current && refSocket.current.off(eventName)
  }
  return {
    sendMessageToServer,
    receiveMessageFromServer,
    socketOffEvent,
    sendOnSeenMessageToServer,
    listenOnScreenMessageFromServer,
  }
}

export default useSocketIO
