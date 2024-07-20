import { UploadImageModal } from '@/Components/Modal/UploadImageModal'
import { TokenAxios } from '@/utils/AxiosInstances'
import { UserList } from '@phosphor-icons/react'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  bio: string
  username: string
  imageUrl: string
}
export default function UserProfile() {
  const [user, setUser] = useState<Partial<User> | null>(null)

  const [error, setError] = useState<string | null>(null)

  const [openImageChanger, setOpenImageChanger] = useState(false)

  const handleImageChangerClick = () => {
    setOpenImageChanger((prev) => !prev)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyData = async () => {
      const res = await TokenAxios.get('/user/my-profile')
      setUser(res.data)
      console.log(res.data)
    }
    fetchMyData()
  }, [openImageChanger])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await TokenAxios.patch(`/user/${user?.id}`, {
        firstName: user?.firstName,
        lastName: user?.lastName,
        bio: user?.bio,
      })
      console.log(res)
      if (res.status !== 200) {
        if (
          res.data.message.includes('username') ||
          res.data.message.includes('email')
        ) {
          setError('Username or Email is already taken')
        } else {
          setError(res.data.message)
        }
      } else {
        navigate('/dashboard')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setError('Username or email is already taken')
      } else {
        setError('An error occurred while trying to sign up')
      }
      console.log(err)
    }
  }

  if (user === null) return <h1>Loading...</h1>
  return (
    <main className="w-full mt-8 lg:mt-36 flex justify-center items-center flex-col gap-8">
            {openImageChanger && (
        <UploadImageModal handleClose={handleImageChangerClick} />
      )}

<div className='flex gap-4 md:flex-col items-center justify-center'>
<UserList size={48} className="fill-zinc-200" />
<h1 className="text-2xl md:text-5xl  font-bold text-zinc-200">Your Profile</h1>
</div>


      <form
        onSubmit={handleSubmit}
        className="mx-4 md:w-3/5 lg:w-2/5 bg-slate-200 pt-8 pb-4 px-4 rounded-lg space-y-3"
      >
        <div className='flex flex-col justify-center items-center'>
          <img
            src={user.imageUrl}
            alt={`${user.firstName}' profile image`}
            className="size-24 rounded-full object-cover"
          />
          <button className='hover:text-zinc-500' type="button" onClick={handleImageChangerClick}>
            Change picture
          </button>
        </div>
        <div className='grid grid-cols-2 gap-2'>
        <label>
          First Name:
          <input
            type="text"
            className="w-full p-2 rounded-md md:text-lg"
            placeholder=""
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            className="w-full p-2 rounded-md md:text-lg"
            placeholder=""
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </label>
        </div>

        <label>
          Bio:
          <input
            type="text"
            className="w-full p-2 rounded-md md:text-lg"
            placeholder=""
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </label>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between items-center">
          <button className="bg-green-300 px-4 py-2 rounded-md">Save</button>
          <p>
            <Link to="/dashboard" className="hover:underline">
              Go to dashboard
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}
