import { PlusOutlined } from '@ant-design/icons'
import featherClient from '@client'
import { ErrorAlert, SuccessAlert } from '@components/alerts'
import Container from '@containers'
import { signInUserAction, signUpUserAction } from '@redux/auth'
import { Button, Card, Col, Form, Input, Row, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function SignUpPage() {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    if (!isJpgOrPng) {
      ErrorAlert('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      ErrorAlert('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const handleUpload = ({ file, onSuccess, onError }) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', async () => {
      await featherClient
        .service('uploads')
        .create({ uri: reader.result })
        .then((res) => {
          onSuccess(res)
        })
        .catch((err) => {
          onError(err)
        })
    })
  }

  const handleFileChange = (info) => {
    if (info.file) {
      setImageUrl(URL.createObjectURL(info.file.originFileObj))
    }
  }
  const handleSubmit = async (credentials) => {
    const { email, password } = credentials
    const { error } = await dispatch(signUpUserAction(credentials))
    if (!error) {
      dispatch(signInUserAction({ email, password })).then(
        SuccessAlert('Successfully created a new account.', 5)
      )
    }
  }
  const onFinish = (credentials) => {
    handleUpload({
      file: credentials.avatar.file.originFileObj,
      onSuccess: ({ id }) => {
        credentials.avatar = id
        handleSubmit(credentials)
      },
      onError: (err) => {
        ErrorAlert(`Failed when uploading image. ${err.message}`)
      },
    })
  }

  const uploadButton = (
    <div key="123">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const onFinishFailed = ({ errorFields }) => {
    if (errorFields && errorFields.length > 0) {
      ErrorAlert('Failed : ' + errorFields[0]?.errors[0])
    }
  }

  return (
    <Container contentstyle={{ marginTop: '4%' }} background="dark">
      <Row className="my-row-center">
        <Col xl={8} lg={14} sm={14} xs={22}>
          <Card className="my-card-center my-text-center">
            <Typography.Title level={2}>Sign Up</Typography.Title>
            <Form
              name="form-signin"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input allowClear size="large" />
              </Form.Item>
              <Form.Item
                label="Nickname"
                name="nickname"
                rules={[
                  { required: true, message: 'Please input your nickname!' },
                ]}
              >
                <Input allowClear size="large" addonBefore="@" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Email is not a valid email' },
                ]}
              >
                <Input allowClear size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password allowClear size="large" />
              </Form.Item>

              <Form.Item
                label="Avatar"
                name="avatar"
                valuePropName="file"
                rules={[
                  { required: true, message: 'Please select your avatar!' },
                ]}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={() => null}
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                  accept=".png,.jpg,.gif,.jpeg"
                  maxCount={1}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <div style={{ marginBottom: '10px' }}>
                <Button type="primary" htmlType="submit" size="large">
                  Sign Up
                </Button>
              </div>
              <Typography.Text italic type="secondary">
                Already have an account? <Link to="/signin">Sign in here</Link>
              </Typography.Text>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
