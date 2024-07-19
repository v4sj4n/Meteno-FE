import { SmileyXEyes } from '@phosphor-icons/react'

export default function NotFound() {
  return (
    <main className="w-full mt-16 lg:mt-40 flex justify-center items-center flex-col gap-8">
      <h3 className="text-2xl md:text-5xl font-bold text-zinc-200">
        Page Not Found
      </h3>
      <hr className="w-8" />
      <SmileyXEyes size={64} className="fill-zinc-200" />
    </main>
  )
}
