import Container from '@containers'
import { Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <Container>
      <Row className="my-row-center">
        <Col span={6}>
          <Card>
            <h1>Welcome to my home</h1>
            <Link to="/chat">Link to chat</Link>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPage
