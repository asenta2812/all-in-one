import { DeleteOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Layout, Row, Space } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import styles from './navbar.module.scss'

const NavBar: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <Layout.Sider theme="light" className={styles.sider} width="120px">
      <Row align="middle" justify="center" style={{ height: '100%' }}>
        <Space direction="vertical" size="large">
          <Button
            className={clsx(styles.button, {
              [styles.buttonActive]: pathname === '/',
            })}
            icon={<HomeOutlined className={styles.icon} />}
            type="text"
            size="large"
            shape="circle"
            onClick={() => navigate('/')}
            title="Home"
          />

          <Button
            className={clsx(styles.button, {
              [styles.buttonActive]: pathname === '/favourite',
            })}
            icon={<HeartOutlined className={styles.icon} />}
            type="text"
            size="large"
            shape="circle"
            onClick={() => navigate('/favourite')}
            title="Favourite"
          />

          <Button
            className={clsx(styles.button, {
              [styles.buttonActive]: pathname === '/trash',
            })}
            icon={<DeleteOutlined className={styles.icon} />}
            type="text"
            size="large"
            shape="circle"
            onClick={() => navigate('/trash')}
            title="Trash"
          />
        </Space>
      </Row>
    </Layout.Sider>
  )
}

export default NavBar
