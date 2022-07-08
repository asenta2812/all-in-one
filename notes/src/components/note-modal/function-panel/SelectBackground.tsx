import { useAppDispatch, useAppSelector } from '@/redux'
import { selectNote, setNote } from '@/redux/notes'
import { BgColorsOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import clsx from 'clsx'
import React from 'react'
import styles from '../modal.module.scss'
const SelectBackground = () => {
  const noteData = useAppSelector(selectNote)
  const dispatch = useAppDispatch()
  const themeColourList: string[] = [
    'white',
    'pink',
    'orange',
    'green',
    'purple',
    'brown',
    'gray',
  ]
  const themeGradientList: string[] = [
    'greenery',
    'sublime-vivid',
    'dimigo',
    'reef',
    'light-purple',
    'witching-hour',
    'titanium',
  ]
  const handleSelectBackground = (value: string) => {
    dispatch(setNote({ background: value }))
  }

  const getButtonColor = (color: string) => (
    <button
      key={color}
      className={clsx(color, { active: color === noteData.background })}
      onClick={() => handleSelectBackground(color)}
    />
  )
  const Colors = (
    <div>
      <div className={styles.selectColorRow}>
        <h5>Solid</h5>
        {themeColourList.map(getButtonColor)}
      </div>
      <div className={styles.selectColorRow}>
        <h5>Gradient</h5>
        {themeGradientList.map(getButtonColor)}
      </div>
    </div>
  )
  return (
    <>
      <Tooltip
        title={Colors}
        trigger={['click']}
        overlayInnerStyle={{
          padding: 10,
          borderRadius: 10,
          width: 'auto',
          maxWidth: 'auto',
        }}
        overlayStyle={{ width: 'auto', maxWidth: 500 }}
        arrowContent={false}
      >
        <Button
          size="large"
          shape="circle"
          type="text"
          icon={<BgColorsOutlined style={{ fontSize: '1.5rem' }} />}
        />
      </Tooltip>
    </>
  )
}

export default SelectBackground
