export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')!)
  return (
    <main className="w-full mt-16 lg:mt-40 flex justify-center items-center flex-col gap-8">
      <h1>Hello {user.firstName}, what are you learning today</h1>
    </main>
  )
}
