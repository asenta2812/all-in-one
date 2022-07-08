import { Layout } from 'antd'
import styles from './layout.module.scss'
import React, { ReactNode } from 'react'
import clsx from 'clsx'

interface LayoutProps {
  children: ReactNode
  className?: string
}

const MainLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <Layout.Content className={clsx(styles.layout, className)}>
      {children}
    </Layout.Content>
  )
}

export default MainLayout
