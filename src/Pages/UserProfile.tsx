import { TokenAxios } from '@/utils/AxiosInstances'
import { FileImage, UserList } from '@phosphor-icons/react'
import { FormEvent, useEffect, useRef, useState } from 'react'
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
    console.log('hello')
  }

  if (user === null) return <h1>Loading...</h1>
  return (
    <main className="w-full mt-8 lg:mt-36 flex justify-center items-center flex-col gap-8">
      <UserList size={48} className="fill-zinc-200" />

      {openImageChanger && (
        <UploadImageModal handleClose={handleImageChangerClick} />
      )}
      <h1 className="text-5xl font-bold text-zinc-200">Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-4 md:w-3/5 lg:w-2/5 bg-slate-200 p-4 rounded-lg space-y-3"
      >
        <div>
          <img
            src={user.imageUrl}
            alt={`${user.firstName}' profile image`}
            className="size-24 rounded-md"
          />
          <button type="button" onClick={handleImageChangerClick}>
            Change picture
          </button>
        </div>
        <input
          type="text"
          className="w-full p-2 rounded-md md:text-lg"
          placeholder=""
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          className="w-full p-2 rounded-md md:text-lg"
          placeholder=""
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="text"
          className="w-full p-2 rounded-md md:text-lg"
          placeholder=""
          value={user.bio}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
        />

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

function UploadImageModal({ handleClose }: { handleClose(): void }) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleClick = () => {
    fileInput.current?.click()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await TokenAxios.post(`/user/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if(res.status !== 201){
        return
      } else {
        handleClose()
      }
      console.log(res)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setPreviewImage(URL.createObjectURL(selectedFile))
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Please upload an image</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name=""
            onChange={onImageChange}
            id=""
            className="hidden"
            ref={fileInput}
          />
          <div
            className=" flex justify-center items-center hover:bg-gray-300 bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
            onClick={handleClick}
          >
            <FileImage size={32} className="inline-block" />
            <p className="inline-block">Upload image</p>
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="preview image"
              className="hover:border-2 border-red-300 mt-2"
            />
          )}

          <button className="bg-green-300 px-4 py-2 rounded-md">Save</button>

          <button
            type="button"
            className="text-red-500 px-4 py-2 rounded-md ml-2"
            onClick={handleClose}
          >Close</button>
        </form>
      </div>
    </div>
  )
}
