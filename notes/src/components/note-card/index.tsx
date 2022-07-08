import { Note } from '@/models/note'
import { getFullImageUrl } from '@/ultils'
import { Card, Image, Typography } from 'antd'
import React from 'react'
import { HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './card.module.scss'

interface NoteCardProps extends Note {}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  folderImage,
  images,
  description,
}) => {
  return (
    <>
      <Card
        cover={
          <Image.PreviewGroup>
            {images &&
              images.map((img) => (
                <Image
                  alt={title + img}
                  src={getFullImageUrl(folderImage, img)}
                  className={styles.images}
                />
              ))}
          </Image.PreviewGroup>
        }
        actions={[
          <HeartOutlined key="heart" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" />,
        ]}
        hoverable
        className={styles.card}
      >
        <Typography.Title level={5} ellipsis={{ rows: 2, expandable: false }}>
          {title}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
          similique vel omnis error a quidem voluptatem. Assumenda tempora
          corrupti enim quis expedita explicabo molestiae accusantium sit nam?
          Provident, optio architecto!
        </Typography.Title>

        <Typography.Text ellipsis>
          {description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          iste magni eius porro nobis quos repudiandae nostrum rerum debitis
          aliquid in repellat praesentium culpa neque, eum velit placeat, enim
          illum dignissimos? Deleniti similique odit harum ullam non, facilis ab
          nisi quod nam quos totam quae, odio est, reiciendis repellat!
        </Typography.Text>
      </Card>
    </>
  )
}

export default NoteCard
