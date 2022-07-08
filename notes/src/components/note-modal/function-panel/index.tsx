import { Row, Space } from 'antd'
import React, { memo } from 'react'
import AddToTrash from './AddToTrash'
import ButtonSave from './ButtonSave'
import SelectBackground from './SelectBackground'
import SelectFont from './SelectFont'

const FunctionPanel = () => {
  return (
    <Row align="middle" justify="space-between">
      <Space align="center" size="large">
        <SelectFont />
        <SelectBackground />
        <AddToTrash />
      </Space>
      <ButtonSave />
    </Row>
  )
}

export default memo(FunctionPanel)
