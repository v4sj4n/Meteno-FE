export const ModalTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="m-8 md:m-0 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  )
}