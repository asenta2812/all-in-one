import ChatContext from '@/contexts/chat'
import React, { useContext, useEffect } from 'react'

function Test() {
  const { testState } = useContext(ChatContext)
  useEffect(() => {
    console.log('test', testState)
  }, [testState])
  return <div>Test</div>
}

export default Test
