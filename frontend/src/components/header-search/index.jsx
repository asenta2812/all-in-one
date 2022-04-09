import { FileAddOutlined } from '@ant-design/icons'
import feathers from '@client'
import useDebounce from '@hooks/use-debounce'
import { selectCurrentUser } from '@redux/auth'
import { selectUserAction } from '@redux/chat'
import { Avatar, Button, Col, Mentions, Row, Typography } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFullLinkImage } from '../../ultils'
function HeaderSearch() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 800)
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const searchUsers = (key) => {
    feathers
      .service('users')
      .find({
        query: {
          nickname: { $search: key },
          _id: { $nin: [currentUser._id] },
          $select: ['_id', 'name', 'avatar', 'nickname'],
        },
      })
      .then(({ data }) => {
        setUsers(data)
      })
  }

  const renderOption = useMemo(() => {
    return users.map(({ _id, avatar, name, nickname }) => {
      return (
        <Mentions.Option key={_id} value={nickname} name={name} avatar={avatar}>
          <div className="flex flex-1 p-[5px] items-center justify-around w-[150px]">
            <Avatar src={getFullLinkImage(avatar)} alt={name} />
            <div className="flex flex-col ml-2">
              <Typography.Paragraph strong style={{ margin: 0 }}>
                {name}
              </Typography.Paragraph>
              <Typography.Text style={{ margin: 0 }}>
                {nickname}
              </Typography.Text>
            </div>
          </div>
        </Mentions.Option>
      )
    })
  }, [users])

  const handleSelect = ({ key, name, avatar }) => {
    const obj = {
      selectUser: {
        _id: key,
        name,
        avatar,
      },
      currentUser,
    }
    dispatch(selectUserAction(obj))
  }
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchUsers(debouncedSearchTerm)
    } else {
      setUsers([])
    }
  }, [debouncedSearchTerm])
  return (
    <Row
      wrap={false}
      justify="space-between"
      align="middle"
      className="p-[10px] pr-0 border-b-[1px]"
    >
      <Col span={18} className="relative">
        <Mentions
          style={{ width: '100%' }}
          onSearch={setSearchTerm}
          onSelect={handleSelect}
          placeholder="Search user ..."
          autoSize
        >
          {renderOption}
        </Mentions>
      </Col>
      <Col span={6} className="text-center">
        <Button
          size="large"
          shape="circle"
          type="primary"
          icon={<FileAddOutlined style={{ fontSize: '20px' }} />}
        ></Button>
      </Col>
    </Row>
  )
}

export default HeaderSearch
