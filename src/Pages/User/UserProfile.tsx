import { Modal } from '@/Components/Modal/Modal'
import { UploadImageModal } from '@/Components/Modal/UploadImageModal'
import { TokenAxios } from '@/utils/AxiosInstances'
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
    <main className="w-full mt-8 md:mt-20 lg:mt-32 flex justify-center items-center flex-col gap-4 md:gap-8 ">
      <h1 className="text-2xl md:text-4xl font-bold ">
        Your Profile
      </h1>
      {openImageChanger && (
        <UploadImageModal handleClose={handleImageChangerClick} />
      )}
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={user.imageUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex items-center gap-3">
            {user.firstName} {user.lastName}
            <p className="text-sm italic opacity-80">{user.username}</p>
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p>{user.bio}</p>
          <p>{user.email}</p>
          <h3 className="font-bold">What would you like to change?</h3>
          <div className="card-actions justify-between">
            <Link to={"/change-password"} className="badge badge-outline p-2.5 hover:bg-white cursor-pointer hover:text-black">
              Password
            </Link>
            <div className="badge badge-outline p-2.5 hover:bg-white cursor-pointer hover:text-black">
              Profile image
            </div>
            <div className="badge badge-outline p-2.5 hover:bg-white cursor-pointer hover:text-black">
              Bio
            </div>
            <div className="badge badge-outline p-2.5 hover:bg-white cursor-pointer hover:text-black">
              Email
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn"
        onClick={() => {
          const modal = document.getElementById(
            'my_modal'
          ) as HTMLDialogElement
          if (modal) {
            modal.showModal()
          }
        }}
      >
        open modal
      </button>
      <Modal>
        <h3>Hello from the modal!</h3>
        <p>This is a modal</p>
      </Modal>


      <form
        onSubmit={handleSubmit}
        className="mx-4 md:w-3/5 lg:w-2/5 bg-white pt-8 pb-4 px-4 rounded-lg space-y-3"
      >
        <div className="flex flex-col  justify-center items-center">
          <img
            src={user.imageUrl}
            alt={`${user.firstName}' profile image`}
            className="size-24 rounded-full object-cover"
          />
          <button
            className="hover:text-zinc-500"
            type="button"
            onClick={handleImageChangerClick}
          >
            Change picture
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <label>
            First Name:
            <input
              type="text"
              className="w-full p-2 rounded-md md:text-lg bg-slate-200"
              placeholder=""
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              className="w-full p-2 rounded-md md:text-lg bg-slate-200"
              placeholder=""
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </label>

          <label className="col-span-2">
            Bio:
            <input
              type="text"
              className="w-full p-2 rounded-md md:text-lg bg-slate-200"
              placeholder=""
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </label>
        </div>

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
