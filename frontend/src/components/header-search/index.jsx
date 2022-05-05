import feathers from '@client'
import useDebounce from '@hooks/use-debounce'
import { selectCurrentUser } from '@redux/auth'
import { Avatar, Col, Empty, Row, Select, Spin, Typography } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFullLinkImage } from '@ultils'
import { selectUserAction } from '@redux/chat'

function HeaderSearch() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('@')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const [loading, setLoading] = useState(false)

  const searchUsers = (key) => {
    let searchKey = ''
    if (key.startsWith('@')) {
      searchKey = key.substring(1)
    } else {
      return
    }
    if (loading) {
      return
    }
    setLoading(true)
    feathers
      .service('users')
      .find({
        query: {
          nickname: { $search: searchKey },
          _id: { $nin: [currentUser._id] },
          $select: ['_id', 'name', 'avatar', 'nickname'],
        },
      })
      .then(({ data }) => {
        setUsers(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderOption = useMemo(() => {
    return users.map(({ _id, avatar, name, nickname }) => {
      return (
        <Select.Option key={_id} value={nickname} name={name} avatar={avatar}>
          <Row align="middle">
            <Col span={3} className="text-center">
              <Avatar src={getFullLinkImage(avatar)} alt={name} />
            </Col>
            <Col className="flex-1">
              <div className="flex flex-col ml-2">
                <Typography.Paragraph strong style={{ margin: 0 }}>
                  {name}
                </Typography.Paragraph>
                <Typography.Text style={{ margin: 0 }}>
                  {nickname}
                </Typography.Text>
              </div>
            </Col>
          </Row>
        </Select.Option>
      )
    })
  }, [users])

  const handleSelect = (_, { key, name, avatar }) => {
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
  const validateInput = () => {
    const isError = searchTerm && !searchTerm.startsWith('@')
    if (isError) {
      return 'error'
    }
    return ''
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
      className="p-[10px] border-b-[1px]"
    >
      <Col span={24} className="relative">
        <Select
          style={{ width: '100%', borderRadius: '20px' }}
          className="my-select"
          showSearch
          autoClearSearchValue
          autoFocus
          allowClear
          placeholder="Search user..."
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={setSearchTerm}
          notFoundContent={
            loading ? (
              <Spin size="small" />
            ) : debouncedSearchTerm ? (
              <Empty description={`No data found by ${debouncedSearchTerm}`} />
            ) : null
          }
          status={validateInput()}
          onSelect={handleSelect}
          size="large"
          value="@"
        >
          {renderOption}
        </Select>
      </Col>
    </Row>
  )
}

export default HeaderSearch
