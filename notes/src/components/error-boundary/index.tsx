import MainLayout from '@/containers/layout'
import { message, Result, Row } from 'antd'
import React from 'react'

interface IErrorBoundary {
  children: React.ReactNode
}
export default class ErrorBoundary extends React.Component<IErrorBoundary> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (error) {
      message.error({
        key: 'message_error',
        content: error.message,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <MainLayout>
          <Row align="middle" justify="center" style={{ height: '100%' }}>
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
            />
          </Row>
        </MainLayout>
      )
    }
    return this.props.children
  }
}
