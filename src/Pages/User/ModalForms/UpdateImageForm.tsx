import { TokenAxios } from "@/utils/AxiosInstances";
import { FormEvent, useRef, useState } from "react";

export const UpdateImageForm = ({ id }: { id: string }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };
  const clearImage = () => {
    setFile(null);
    setPreviewImage(null);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleClose = () => {
    const el = document.getElementById(id) as HTMLDialogElement;
    if (el) {
      el.close();
      clearImage();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await TokenAxios.post(`/user/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        handleClose();
      }
      console.log(res);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box ">
        <h2 className="text-2xl font-bold mb-4">Upload a profile picture</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            onChange={onImageChange}
            ref={fileInput}
            className="file-input file-input-bordered w-full"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="preview image"
              className="cursor-pointer hover:brightness-[.25] rounded-md  mx-auto"
              onClick={clearImage}
            />
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="btn btn-accent px-12"
              disabled={file === null}
            >
              Save
            </button>
            <button type="button" className="btn btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <button type="button" className="modal-backdrop" onClick={handleClose} />
    </dialog>
  );
};
