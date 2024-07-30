import { FullInput } from "@/Components/Inputs/FormInputs";
import {
  updateGenerals,
  updateGeneralsSchema,
} from "@/Schemas/ProfileGenerals.schema";
import { TokenAxios } from "@/utils/AxiosInstances";
import { ErrorMsgForm } from "@/utils/ErrorMsgForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { Article, IdentificationBadge } from "@phosphor-icons/react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

export const UpdateGeneralsForm = ({ id }: { id: string }) => {
  const generalInfo = JSON.parse(localStorage.getItem("user") || "{}");

  const handleClose = () => {
    const el = document.getElementById(id) as HTMLDialogElement;
    if (el) {
      el.close();
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateGeneralsSchema),
  });

  const onSubmitHandler = async (data: updateGenerals) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 456);
    });
    try {
      console.log({ data });
      const res = await TokenAxios.patch(`user/${generalInfo.id}`, data);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        handleClose();
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        setError("root", {
          message: err.response?.data?.message,
        });
      } else {
        setError("root", {
          message: "An error occurred while trying to sign in",
        });
      }
    }
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box ">
        <h2 className="text-2xl font-bold mb-4">Upload a profile picture</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <FullInput
            icon={IdentificationBadge}
            type="text"
            placeholder={
              generalInfo?.firstName ? generalInfo.firstName : "First Name"
            }
            register={register}
            errors={errors}
            name="firstName"
            value={
              generalInfo?.firstName ? generalInfo.firstName : "First Name"
            }
          />
          <FullInput
            icon={IdentificationBadge}
            type="text"
            placeholder={
              generalInfo?.lastName ? generalInfo.lastName : "Last Name"
            }
            register={register}
            errors={errors}
            name="lastName"
            value={generalInfo?.lastName ? generalInfo.lastName : "Last Name"}
          />
          <FullInput
            icon={Article}
            type="text"
            placeholder={generalInfo?.bio ? generalInfo.bio : "Bio"}
            register={register}
            errors={errors}
            name="bio"
          />
          {errors.root && <ErrorMsgForm>{errors.root.message}</ErrorMsgForm>}
          <div className="flex justify-between">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-accent px-12"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <button type="button" className="modal-backdrop" onClick={handleClose} />
    </dialog>
  );
};
