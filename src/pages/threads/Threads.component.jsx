import { Alert, Flex, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BaseContainer } from '../../components/base-container/BaseContainer.component'
import { getThreads } from '../../store/threads/threads.reducer'
import './Threads.styles.scss'
import { CreateThread } from '../../module/threads/create-thread/CreateThread.component'
import { ThreadsCard } from '../../module/threads/threads-card/ThreadsCard'

export function Threads() {
  const { threads, status, error } = useSelector((state) => state.threads)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getThreads())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // START HANDLE GET CATEGORY FROM DATA THREAD
  const [threadsFilter, setThreadsFilter] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (threads.length > 0) {
      const getCategories = [
        ...new Set(threads.map((thread) => thread.category)),
      ]
      const transformData = getCategories.map((item) => ({
        value: item,
        label: item,
      }))
      setCategories(transformData)
    }
  }, [threads])

  useEffect(() => {
    if (selectedCategory) {
      const filterWithCategory = threads.filter(
        (item) => item.category === selectedCategory,
      )
      setThreadsFilter(filterWithCategory)
    } else {
      setThreadsFilter(threads)
    }
  }, [threads, selectedCategory])
  // END HANDLE GET CATEGORY FROM DATA THREAD

  return (
    <BaseContainer>
      <div className="threads">
        {status === 'failed' && <Alert type="error">{error.toString()}</Alert>}
        <Flex align="center" justify="space-between" gap={10}>
          <Select
            style={{ width: 120 }}
            onChange={(value) => setSelectedCategory(value)}
            options={categories}
            value={selectedCategory}
            placeholder="Select Category"
            allowClear
            size="large"
          />
          <CreateThread />
        </Flex>
        {threadsFilter.map((thread) => (
          <ThreadsCard thread={thread} key={thread.id} />
        ))}
      </div>
    </BaseContainer>
  )
}
