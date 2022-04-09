import { UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

function AuthenticateContainer(props) {
  const { onFinish, onFinishFailed, title } = props
  return (
    <Row className="my-row-center">
      <Col xl={8} lg={14} sm={14} xs={22}>
        <Card className="my-card-center my-text-center">
          <Typography.Title level={2}>{title}</Typography.Title>
          <Form
            name="form-signin"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Email is not a valid email' },
              ]}
            >
              <Input allowClear size="large" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                allowClear
                size="large"
                prefix={<UnlockOutlined />}
              />
            </Form.Item>

            <div style={{ marginBottom: '10px' }}>
              <Button type="primary" htmlType="submit" size="large">
                Sign In
              </Button>
            </div>
            <Typography.Text italic type="secondary">
              Don`t have an account? <Link to="/signup">Sign up here</Link>
            </Typography.Text>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

AuthenticateContainer.propTypes = {
  onFinish: PropTypes.func.isRequired,
  onFinishFailed: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
export default AuthenticateContainer
