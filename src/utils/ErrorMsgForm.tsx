import { ReactNode } from 'react'

export const ErrorMsgForm: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <p className="text-error mt-1.5">{children}</p>
}
