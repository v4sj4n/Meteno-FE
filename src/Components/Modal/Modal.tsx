import { ReactNode } from 'react'

export const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <dialog id="my_modal" className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-not-allowed">close</button>
      </form>
    </dialog>
  )
}
