import { ErrorMsgForm } from '@/utils/ErrorMsgForm'
import { IconProps } from '@phosphor-icons/react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface FullInputProps {
  icon?: React.ComponentType<IconProps>
  type: string
  placeholder: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  errors: FieldErrors
  name: string
}

export const FullInput: React.FC<FullInputProps> = ({
  icon: Icon,
  type,
  placeholder,
  register,
  errors,
  name,
}) => {
  return (
    <span className="block w-full">
      <label className="input input-bordered flex items-center gap-4">
        {Icon ? <Icon/> : null}
        <input
          type={type}
          {...register(name)}
          className="grow"
          placeholder={placeholder}
        />
      </label>
      {errors[name] && (
        <ErrorMsgForm>{errors[name]?.message as string}</ErrorMsgForm>
      )}
    </span>
  )
}
