import { useRouter } from 'next/router'

const rooms = () => {
  const router = useRouter()

  const { title, check_in, check_out, noOfGuests } = -router.query

  return <div>{title}</div>
}

export default rooms
