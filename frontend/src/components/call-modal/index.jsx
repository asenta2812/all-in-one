import { Avatar, Button, Modal, Space, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentCall, selectCurrentRoom } from '@redux/chat'
import Peer from 'simple-peer'
import PropTypes from 'prop-types'
import { ErrorAlert } from '@components/alerts'
import { selectCurrentUser } from '@redux/auth'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { getFullLinkImage } from '@/ultils'

function CallModal({ socket }) {
  const callState = useSelector(selectCurrentCall)
  const currentUserId = useSelector(selectCurrentUser)?._id
  const currentRoom = useSelector(selectCurrentRoom)

  const [dataReceiveCall, setDataReceiveCall] = useState()
  const [isUseVideo, setIsUseVideo] = useState(false)
  const [callerSignal, setCallerSignal] = useState()
  const [showPopup, setShowPopup] = useState({
    callTo: false,
    receiveCall: false,
    call: false,
  })
  const [stream, setStream] = useState()

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const getStream = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: callState ? callState.video : isUseVideo,
        audio: true,
      })
    } catch (err) {
      ErrorAlert(err.message)
    }
  }
  const showScreenCall = () => {
    setShowPopup({ call: true, callTo: false, receiveCall: false })
  }
  const callUser = async () => {
    if (callState.from._id !== currentUserId) {
      return
    }
    const streamObj = await getStream()
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: streamObj,
    })

    const toUserIds = currentRoom.participants
      .filter((p) => p.user !== currentUserId)
      .map((p) => p.user)

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        signalData: data,
        toIds: toUserIds,
        ...callState,
      })
    })
    peer.on('stream', (obj) => {
      userVideo.current.srcObject = obj
      myVideo.current.srcObject = streamObj
    })
    socket.on('callAccepted', (signal) => {
      showScreenCall()
      peer.signal(signal)
    })

    connectionRef.current = peer
    setStream(streamObj)
  }
  const stopStream = () => {
    stream &&
      stream.getTracks().forEach((track) => {
        track.stop()
      })
  }

  const handleCancel = () => {
    setStream(null)
    stopStream()
    setShowPopup({ call: false })
  }

  const handleCancelCallTo = () => {
    setShowPopup({ callTo: false })
    // socket.emit('cancelCall')
  }

  const anwserCall = async (isAccept = true) => {
    const streamObj = await getStream()
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: streamObj,
    })
    peer.on('signal', (data) => {
      socket.emit('answerCall', {
        signal: data,
        toInitiator: dataReceiveCall._id,
      })
    })
    peer.on('stream', (object) => {
      userVideo.current.srcObject = object
      myVideo.current.srcObject = streamObj
    })
    peer.signal(callerSignal)
    connectionRef.current = peer
    showScreenCall()
    setStream(streamObj)
  }
  useEffect(() => {
    // receive call user
    socket.on('callUser', (data) => {
      setShowPopup({ receiveCall: true, callTo: false, call: false })
      setDataReceiveCall(data.from)
      setCallerSignal(data.signal)
      setIsUseVideo(data.video)
    })
    return () => {
      stopStream()
      socket.off()
      if (connectionRef.current) {
        connectionRef.current.destroy()
      }
    }
  }, [])
  useEffect(() => {
    if (!callState) {
      return
    }
    setShowPopup({ callTo: true })
    callUser()
  }, [callState])

  return (
    <>
      {/* receive call */}
      <Modal
        title="You have an incoming call"
        visible={showPopup.receiveCall}
        footer={null}
        width={300}
        onCancel={() => setShowPopup({ receiveCall: false })}
      >
        <Space direction="vertical" className="text-center w-full">
          <Avatar
            size="large"
            src={getFullLinkImage(dataReceiveCall?.avatar)}
          />
          <Typography.Paragraph style={{ margin: 0 }}>
            {dataReceiveCall?.name}
          </Typography.Paragraph>
          <Typography.Title level={4}>is calling you</Typography.Title>
          <Space size="large">
            <Button
              icon={<CloseOutlined />}
              shape="circle"
              danger
              type="primary"
              size="large"
            />
            <Button
              icon={<CheckOutlined />}
              shape="circle"
              type="primary"
              size="large"
              onClick={() => anwserCall()}
            />
          </Space>
        </Space>
      </Modal>

      {/* call to */}
      <Modal
        title="Calling..."
        visible={showPopup.callTo}
        footer={null}
        width={300}
        onCancel={() => setShowPopup({ callTo: false })}
      >
        <div className="text-center">
          <Typography.Title level={3}>Calling to</Typography.Title>
          <Space direction="vertical">
            <Avatar size="large" src={callState?.to?.avatar} />
            <Typography.Paragraph>{callState?.to?.name}</Typography.Paragraph>

            <Button
              type="default"
              danger
              shape="round"
              onClick={handleCancelCallTo}
            >
              Cancel
            </Button>
          </Space>
        </div>
      </Modal>
      {/* call screen */}
      <Modal
        width="70%"
        title="Video call"
        visible={showPopup.call}
        onCancel={handleCancel}
      >
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: '300px', transform: 'rotateY(180deg)' }}
        />
        <video
          playsInline
          ref={userVideo}
          autoPlay
          style={{ width: '300px', transform: 'rotateY(180deg)' }}
        />
      </Modal>
    </>
  )
}

CallModal.propTypes = {
  socket: PropTypes.object,
}
export default CallModal
