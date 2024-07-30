import { UserProfileSkeleton } from "@/Components/skeletons/UserProfileSkeleton";
import { TokenAxios } from "@/utils/AxiosInstances";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@/utils/types/User";
import { UpdateImageForm } from "./ModalForms/UpdateImageForm";
import { UpdateGeneralsForm } from "./ModalForms/UpdateGeneralsForm";

export default function UserProfile() {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const openModal = useCallback((id: string) => {
    const el = document.getElementById(id) as HTMLDialogElement;
    if (el) el.showModal();
  }, []);

  useEffect(() => {
    const fetchMyData = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1234);
      });
      const res = await TokenAxios.get("/user/my-profile");
      setUser(res.data);
      console.log(res.data);
    };
    fetchMyData();
  }, [openModal]);

  if (user === null) return <UserProfileSkeleton />;
  return (
    <main className="w-full mt-8 md:mt-20 lg:mt-32 flex justify-center items-center flex-col gap-4 md:gap-8 ">
      <h1 className="text-2xl md:text-4xl font-bold ">Your Profile</h1>
      <UpdateImageForm id="profile-update-image" />
      <UpdateGeneralsForm id="profile-generals" />

      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={user.imageUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex items-center gap-3">
            {user.firstName} {user.lastName}
            <p className="text-sm italic opacity-80"></p>
            <div className="badge badge-primary">{user.username}</div>
          </h2>
          <p>{user.bio}</p>
          <p>{user.email}</p>
          <h3 className="font-bold">What would you like to change?</h3>
          <div className="card-actions">
            <div
              onClick={() => openModal("profile-generals")}
              className="badge badge-outline p-3 hover:bg-white cursor-pointer hover:text-black"
            >
              Generals
            </div>
            <div
              onClick={() => openModal("profile-update-image")}
              className="badge badge-outline p-3 hover:bg-white cursor-pointer hover:text-black"
            >
              Profile image
            </div>
            <div className="badge badge-outline p-3 hover:bg-white cursor-pointer hover:text-black">
              Email
            </div>
            <Link
              to={"/change-password"}
              className="badge badge-outline p-3 hover:bg-white cursor-pointer hover:text-black"
            >
              Password
            </Link>
          </div>
        </div>
      </div>
      <UpdateImageForm id="profile-update-image" />
    </main>
  );
}
