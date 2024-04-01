import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

const Home = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full p-10 grid place-content-center'>
      <CircularProgress />
    </div>
  )
}

export default Home
