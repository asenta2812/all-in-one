import { Tooltip } from 'antd'
import React from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/redux'
import { selectNote, setNote } from '@/redux/notes'
import styles from '../modal.module.scss'

const AddToFavourite = () => {
  const noteData = useAppSelector(selectNote)
  const dispatch = useAppDispatch()
  const handleAddToFavourite = () => {
    dispatch(setNote({ isFavourite: !noteData.isFavourite }))
  }
  return (
    <>
      <Tooltip
        title={
          noteData.isFavourite ? 'Remove from favourites' : 'Add to favourites'
        }
      >
        {noteData?.isFavourite ? (
          <HeartFilled className={styles.icon} onClick={handleAddToFavourite} />
        ) : (
          <HeartOutlined
            className={styles.icon}
            onClick={handleAddToFavourite}
          />
        )}
      </Tooltip>
    </>
  )
}

export default AddToFavourite
