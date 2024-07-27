import { TokenAxios } from '@/utils/AxiosInstances'
import { FileImage } from '@phosphor-icons/react'
import { FormEvent, useRef, useState } from 'react'
import { ModalTemplate } from './ModalTemplate'

export const UploadImageModal = ({ handleClose }: { handleClose(): void }) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setPreviewImage(URL.createObjectURL(selectedFile))
    }
  }
  const clearImage = () => {
    setFile(null)
    setPreviewImage(null)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
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
      if (res.status !== 201) {
        return
      } else {
        handleClose()
      }
      console.log(res)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <ModalTemplate>
      
        <h3 className="text-2xl font-bold mb-4">Please upload an image</h3>
        <form onSubmit={handleSubmit}
         className='flex flex-col gap-4'

        >
          <input
            type="file"
            name=""
            onChange={onImageChange}
            id=""
            className="hidden"
            ref={fileInput}
          />
          <div
            className=" flex justify-center items-center hover:bg-gray-300 bg-gray-200 px-4 py-2 rounded-md cursor-pointer "
            onClick={() => fileInput.current?.click()}
          >
            <FileImage size={32} className="inline-block" />
            <p className="inline-block">Upload image</p>
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="preview image"
              className="cursor-pointer hover:brightness-[.25] rounded-md "
              onClick={clearImage}
            />
          )}

<div className='flex justify-between'>
<button
            className="bg-green-300 px-4 py-2 rounded-md"
            disabled={file === null}
          >
            Save
          </button>

          <button
            type="button"
            className="decoration-wavy hover:underline  px-4 py-2 rounded-md ml-2"
            onClick={handleClose}
          >
            Close
          </button>
</div>
        </form>
      
    </ModalTemplate>
  )
}
