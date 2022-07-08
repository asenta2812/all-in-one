import logo from '@/assets/images/logo.png'
import newNote from '@/assets/images/sticky-notes.png'
import { useAppDispatch } from '@/redux'
import { setOpenModalAction } from '@/redux/notes'
import { Button, Image, Layout, Row } from 'antd'
import React from 'react'
import styles from './header.module.scss'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setOpenModalAction(true))
  }
  return (
    <Layout.Header className={styles.header}>
      <Row align="middle" justify="space-between">
        <Image src={logo} alt="notes" preview={false} />
        <Button
          size="large"
          icon={<Image preview={false} alt="new notes" src={newNote} />}
          onClick={handleClick}
        >
          New Note
        </Button>
      </Row>
    </Layout.Header>
  )
}

export default Header
