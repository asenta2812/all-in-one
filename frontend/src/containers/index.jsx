import React from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

const { Content } = Layout

function Container({ background, contentstyle, children }) {
  const layoutStyle = {
    background: background === 'dark' ? '#EFEFEF' : '#FFF',
  }

  return (
    <Layout className="my-layout" style={layoutStyle}>
      <Content style={contentstyle}>{children}</Content>
    </Layout>
  )
}

Container.propTypes = {
  background: PropTypes.string,
  contentstyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
}

export default Container
