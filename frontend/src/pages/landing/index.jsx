import Container from '@containers'
import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <Container>
      <Row className="my-row-center" gutter={[10, 10]}>
        <Col span={6}>
          <Card>
            <h1>Welcome to my home</h1>
            <Link to="/chat">
              <Button>Link to chat</Button>
            </Link>
            <Link to="/music">
              <Button>Link to music</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPage
