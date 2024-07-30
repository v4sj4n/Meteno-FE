export const UserProfileSkeleton = () => {
  return (
    <main className="w-full mt-8 md:mt-20 lg:mt-32 flex justify-center items-center flex-col gap-4 md:gap-8 ">
      <h1 className=" skeleton h-10 w-60"></h1>
      <div className="skeleton card p-4 w-96 shadow-xl">
        <figure>
          <div className="size-80" />
        </figure>
        <div className="">
          <h2 className="skeleton h-11 w-72"></h2>
          <p></p>
          <p></p>
          <h2 className="skeleton my-4 h-5 w-72"></h2>
          <div className="p-2 flex justify-between">
            <div className="skeleton badge w-24  py-2.5 px-4.5 hover:bg-white cursor-pointer hover:text-black"></div>
            <div className="skeleton badge w-24  py-2.5 px-4.5 hover:bg-white cursor-pointer hover:text-black"></div>
            <div className="skeleton badge w-24  py-2.5 px-4.5 hover:bg-white cursor-pointer hover:text-black"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
