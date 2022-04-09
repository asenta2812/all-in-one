import { Button, Result, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@containers'

function NotFound() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/', { replace: true })
  }
  return (
    <Container>
      <Row className="my-row-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={handleClick}>
              Back Home
            </Button>
          }
        />
      </Row>
    </Container>
  )
}

export default NotFound
