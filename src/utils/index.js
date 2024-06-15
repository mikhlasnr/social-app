import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const showTime = (createdAt) => {
  const now = dayjs()
  const createdAtDate = dayjs(createdAt)
  const diffInMinutes = now.diff(createdAtDate, 'minute')
  const diffInHours = now.diff(createdAtDate, 'hour')
  const diffInDays = now.diff(createdAtDate, 'day')

  if (diffInMinutes < 1) {
    return 'just now'
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  }

  if (diffInHours < 24) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hours ago`
  }

  return `${diffInDays} days ago`
}
