import { Card, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaderboards } from '../../store/leaderboards/leaderboards.reducer'
import { BaseContainer } from '../../components/base-container/BaseContainer.component'

export function Leaderboards() {
  const { leaderboards, status, error } = useSelector(
    (state) => state.leaderboards,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLeaderboards())
  }, [])

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'name',
      render: (value, record) => record.user.name,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.score - b.score,
    },
  ]

  return (
    <BaseContainer>
      <Card className="posts-list">
        {status === 'failed' && <div>{error.toString()}</div>}
        <Table
          bordered
          loading={status === 'loading'}
          dataSource={leaderboards}
          columns={columns}
        />
      </Card>
    </BaseContainer>
  )
}
